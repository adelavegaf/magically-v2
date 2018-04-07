const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse');
const lighthouseConfig = require('./lighthouse-config');
const PubSub = require(`@google-cloud/pubsub`);
const pubsub = new PubSub();

const subscriptionName = 'audit-sub';
const subscription = pubsub.subscription(subscriptionName);

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
    console.log('URL', payload.websiteUrl);

    const lhr = await lighthouse(payload.websiteUrl, opts, lighthouseConfig);
    console.log(`Lighthouse score: ${lhr.score}`);
  }));

})();