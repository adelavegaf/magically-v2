const getProjectsKey = (tabId) => {
  return `projectsFor${tabId}`;
};

const getCurrentProjectIdKey = (tabId) => {
  return `currentProjectIdFor${tabId}`;
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
        const projects = JSON.parse(lookupResult[projectsKey]);
        const currentProjectId = lookupResult[currentProjectIdKey];
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
}