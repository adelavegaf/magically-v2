import {
  getCurrentTabInformationRequest,
  getIsAutomaticFixEnabledRequest,
  setCurrentProjectIdRequest,
  setIsAutomaticFixEnabledRequest
} from './Requests';

const getCurrentTabId = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({active: true, currentWindow: true}, (arrayOfTabs) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      const tabId = arrayOfTabs[0].id;
      resolve(tabId);
    });
  });
};

export default class MessagingApi {
  static getIsAutomaticFixEnabled() {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(getIsAutomaticFixEnabledRequest(), (response) => {
        console.log(response);
        if (response.error) {
          reject(response.error);
          return;
        }
        resolve(response);
      });
    });
  }

  static setIsAutomaticFixEnabled(isAutomaticFixEnabled) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(setIsAutomaticFixEnabledRequest(isAutomaticFixEnabled), (response) => {
        console.log(response);
        if (response.error) {
          reject(response.error);
          return;
        }
        resolve(response);
      });
    });
  }

  static getCurrentTabInformation() {
    return getCurrentTabId().then(tabId => {
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(getCurrentTabInformationRequest(tabId), (response) => {
          if (response.error) {
            reject(response.error);
            return;
          }
          resolve(response);
        });
      })
    });
  }

  static setCurrentProjectId(projectId) {
    return getCurrentTabId().then(tabId => {
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(setCurrentProjectIdRequest(tabId, projectId), (response) => {
          if (response.error) {
            reject(response.error);
            return;
          }
          resolve(response);
        });
      });
    });
  }
}