import {
  getCurrentTabInformationRequest,
  getIsAutomaticFixEnabledRequest,
  setCurrentProjectIdRequest,
  setIsAutomaticFixEnabledRequest
} from './Requests';
import TabsApi from '../utils/TabsApi';

export default class MessagingApi {
  static getIsAutomaticFixEnabled() {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(getIsAutomaticFixEnabledRequest(), (response) => {
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
        if (response.error) {
          reject(response.error);
          return;
        }
        resolve(response);
      });
    });
  }

  static getCurrentTabInformation() {
    return TabsApi.getCurrentTabId().then(tabId => {
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
    return TabsApi.getCurrentTabId().then(tabId => {
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