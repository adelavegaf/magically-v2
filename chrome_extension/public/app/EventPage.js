chrome.tabs.onUpdated.addListener((tabId, {status}, tab) => {
  if (status === 'complete') {
    console.log('complete:', tab.url);
  }
});