const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse');
const lighthouseConfig = require('./lighthouse-config');
const PubSub = require(`@google-cloud/pubsub`);
const {URL} = require('url');

const pubsub = new PubSub();
const subscriptionName = 'audit-sub';
const subscription = pubsub.subscription(subscriptionName);

/**
 * TODO(adelavega): IMPORTANT: HANDLE ERRORS WITH REGEX
 * add ['document-title']
 * add ['html-lang-valid']
 * add ["link-name"]
 */

const publishAuditResultToQueue = (auditResult) => {
  const data = JSON.stringify(auditResult);
  const dataBuffer = Buffer.from(data);

  return pubsub
    .topic('audit-result')
    .publisher()
    .publish(dataBuffer)
    .then(messageId => {
      console.log(`Message ${messageId} published to audit-result topic.`);
      return messageId;
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
};

const getImageErrors = (lhr, url) => {
  const errors = lhr.audits['image-alt'].details.items;
  return errors
    .filter(error => {
      const regexMatch = error.snippet.match(/src="(.*?)"/);
      return regexMatch && regexMatch.length > 1;
    })
    .map(error => {
      const extractedURL = error.snippet.match(/src="(.*?)"/)[1];
      const imgURL = new URL(extractedURL, url);
      const domSelector = error.selector;
      return {
        imgURL: imgURL,
        domSelector: domSelector
      };
    })
};

const getLangErrors = (lhr) => {
  const errors = lhr.audits['html-has-lang'].details.items;
  return errors.map(error => {
    return {
      domSelector: error.selector
    }
  });
};

const getContrastErrors = (lhr) => {
  const errors = lhr.audits['color-contrast'].extendedInfo.value.nodes;
  return errors.map(error => {
    const textRegex = /<.*>([\s\S]*)<\/.*>/;
    const failureRegex = /.*foreground color: (.*), background color: (.*), font size: (.*), font weight: (.*)\)\. Expected contrast ratio of (.*)/;
    const htmlRegexMatch = error.html.match(textRegex);
    const failureRegexMatch = error.failureSummary.match(failureRegex);
    let [, text] = htmlRegexMatch ? htmlRegexMatch : [];
    const [, foregroundColor, backgroundColor, fontSize, fontWeight, expectedContrastRatio] =
      failureRegexMatch ? failureRegexMatch : [];
    if (!htmlRegexMatch) {
      console.error('Failed to do html regex match setting example test', error.html);
      text = 'Example text';
    }
    if (!failureRegexMatch) {
      console.error('Failed to do failure summary regex match', error.failureSummary);
    }
    return {
      domSelector: error.target[0].replace(/["\t\b\f\n\r\\]/g, '\\$&'),
      foregroundColor: foregroundColor,
      backgroundColor: backgroundColor,
      fontSize: fontSize,
      fontWeight: fontWeight,
      expectedContrastRatio: expectedContrastRatio,
      text: text.replace(/(\r\n\t|\n|\r\t)/gm, ' ')
    }
  });
};

(async () => {
  const opts = {
    chromeFlags: ['--headless', '--disable-gpu'],
    logLevel: 'info',
    output: 'json'
  };

  const chrome = await chromeLauncher.launch(opts);
  opts.port = chrome.port;

  subscription.on('message', (async (message) => {
    message.ack();

    const payload = JSON.parse(message.data);
    const {projectId, websiteUrl} = payload;
    console.log(`Received Message ${message.id} with URL: ${websiteUrl}`);

    const lhr = await lighthouse(websiteUrl, opts, lighthouseConfig);
    console.log(`Lighthouse score: ${lhr.score}`);

    const imageErrors = getImageErrors(lhr, websiteUrl);
    const langErrors = getLangErrors(lhr);
    const contrastErrors = getContrastErrors(lhr);

    const auditResult = {
      projectId: projectId,
      websiteUrl: websiteUrl,
      imageErrors: imageErrors,
      langErrors: langErrors,
      contrastErrors: contrastErrors
    };

    publishAuditResultToQueue(auditResult);
  }));

})();