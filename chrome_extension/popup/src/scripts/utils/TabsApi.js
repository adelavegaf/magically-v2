export default class TabsApi {
  static getCurrentTab() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({active: true, currentWindow: true}, (arrayOfTabs) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        resolve(arrayOfTabs[0]);
      });
    });
  }

  static getCurrentTabId() {
    return TabsApi.getCurrentTab().then(tabInformation => {
      return tabInformation.id;
    });
  };

  static getCurrentTabUrl() {
    return TabsApi.getCurrentTab().then(tabInformation => {
      return tabInformation.url;
    });
  }
}