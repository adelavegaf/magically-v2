const functions = require('firebase-functions');
const admin = require('firebase-admin');
const PubSub = require(`@google-cloud/pubsub`);
const pubsub = new PubSub();

admin.initializeApp();

exports.addProjectToAuditQueue = functions
  .firestore
  .document('projects/{projectId}')
  .onCreate((snapshot, context) => {
    const project = snapshot.data();
    const websiteUrl = project.websiteUrl;
    const projectId = context.params.projectId;
    const data = JSON.stringify({projectId: projectId, websiteUrl: websiteUrl});
    const dataBuffer = Buffer.from(data);
    return pubsub
      .topic('audit')
      .publisher()
      .publish(dataBuffer)
      .then(messageId => {
        console.log(`Message ${messageId} published.`);
        return messageId;
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  });

exports.addAuditResultToFirestore = functions
  .pubsub
  .topic('audit-result')
  .onPublish(message => {

    const auditPayload = message.json;
    const websiteUrl = auditPayload.websiteUrl;
    const projectId = auditPayload.projectId;

    const arrayToObject = (array) => {
      return array.reduce((acc, cur, i) => {
        acc[i] = cur;
        return acc;
      }, {});
    };

    const auditResult = {
      websiteUrl: websiteUrl,
      imageErrors: arrayToObject(auditPayload.imageErrors),
      imageErrorsCount: auditPayload.imageErrors.length,
      imageErrorsFixCount: 0,
      contrastErrors: arrayToObject(auditPayload.contrastErrors),
      contrastErrorsCount: auditPayload.contrastErrors.length,
      contrastErrorsFixCount: 0,
      langErrors: arrayToObject(auditPayload.langErrors),
      langErrorsCount: auditPayload.langErrors.length,
      langErrorsFixCount: 0,
      totalFixCount: 0,
      totalErrorsCount: auditPayload.imageErrors.length +
                        auditPayload.contrastErrors.length +
                        auditPayload.langErrors.length,
      auditRunDate: new Date()
    };

    const updateExistingAuditResult = (auditId) => {
      return admin
        .firestore()
        .collection('audits')
        .doc(auditId)
        .set(auditResult);
    };

    const addNewAuditResult = () => {
      return admin
        .firestore()
        .collection('audits')
        .add(auditResult);
    };

    const addAuditResultToProject = () => {
      return admin
        .firestore()
        .collection('projects')
        .doc(projectId)
        .set({
          isLoading: false,
          errors: auditResult
        }, {merge: true})
    };

    return admin
      .firestore()
      .collection('audits')
      .where('websiteUrl', '==', websiteUrl)
      .get()
      .then((auditsRef) => {
        const docs = auditsRef.docs;
        return docs.length === 0 ? addNewAuditResult() : updateExistingAuditResult(docs[0].id);
      })
      .then(addAuditResultToProject());
  });