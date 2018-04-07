const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse');
const lighthouseConfig = require('./lighthouse-config');
const PubSub = require(`@google-cloud/pubsub`);
const {URL} = require('url');

const pubsub = new PubSub();
const subscriptionName = 'audit-sub';
const subscription = pubsub.subscription(subscriptionName);

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
    const {websiteUrl} = payload;
    console.log(`Received Message ${message.id} with URL: ${websiteUrl}`);

    const lhr = await lighthouse(websiteUrl, opts, lighthouseConfig);
    console.log(`Lighthouse score: ${lhr.score}`);

    const imageErrors = getImageErrors(lhr, websiteUrl);
    console.log('image errors');
    console.log(JSON.stringify(imageErrors));
  }));

})();