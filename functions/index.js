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
    const auditResult = message.json;
    return admin.firestore().collection('audits').add(auditResult);
  });