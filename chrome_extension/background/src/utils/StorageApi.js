const getProjectsKey = (tabId) => {
  return `projectsFor${tabId}`;
};

const getCurrentProjectIdKey = (tabId) => {
  return `currentProjectIdFor${tabId}`;
};

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

export default class StorageApi {
  static getIsAutomaticFixEnabled() {
    const lookupDict = {isAutomaticFixEnabled: true};
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(lookupDict, lookupResult => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        resolve(lookupResult);
      });
    });
  }

  static setIsAutomaticFixEnabled(isAutomaticFixEnabled) {
    const storageObject = {isAutomaticFixEnabled: isAutomaticFixEnabled};
    return new Promise((resolve, reject) => {
      chrome.storage.local.set(storageObject, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        resolve({isAutomaticFixEnabled: isAutomaticFixEnabled});
      })
    });
  }

  static setTabInformation(tabId, projects, currentProjectId) {
    const storageObject = {};
    storageObject[getProjectsKey(tabId)] = JSON.stringify(projects);
    storageObject[getCurrentProjectIdKey(tabId)] = currentProjectId;
    return new Promise((resolve, reject) => {
      chrome.storage.local.set(storageObject, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        resolve(true);
      })
    });
  }

  static getTabInformation(tabId) {
    const projectsKey = getProjectsKey(tabId);
    const currentProjectIdKey = getCurrentProjectIdKey(tabId);
    const lookupDict = {};
    lookupDict[projectsKey] = [];
    lookupDict[currentProjectIdKey] = -1;
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(lookupDict, lookupResult => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        const currentProjectId = lookupResult[currentProjectIdKey];
        const projects = currentProjectId >= 0 ? JSON.parse(lookupResult[projectsKey]) : [];
        resolve({projects: projects, currentProjectId: currentProjectId});
      });
    });
  }

  static setTabCurrentProjectId(tabId, projectId) {
    const currentProjectIdKey = getCurrentProjectIdKey(tabId);
    const storageObject = {};
    storageObject[currentProjectIdKey] = projectId;
    return new Promise((resolve, reject) => {
      chrome.storage.local.set(storageObject, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        resolve({currentProjectId: projectId});
      });
    });
  }

  static getCurrentTabInformation() {
    return getCurrentTabId().then(tabId => this.getTabInformation(tabId));
  }
}