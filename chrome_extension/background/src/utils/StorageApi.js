export default class StorageApi {
  static getTabInformation(tabId) {
    return new Promise((resolve, reject) => {
      const projectsKey = `projectsFor${tabId}`;
      const currentProjectIdKey = `currentProjectIdFor${tabId}`;
      const lookupDict = {};
      lookupDict[projectsKey] = [];
      lookupDict[currentProjectIdKey] = -1;
      chrome.storage.local.get(lookupDict, lookupResult => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        const projects = lookupResult[projectsKey];
        const currentProjectId = lookupResult[currentProjectIdKey];
        resolve({projects: projects, currentProjectId: currentProjectId});
      });
    });
  }

  static setTabCurrentProjectId(tabId, projectId) {
    return new Promise((resolve, reject) => {
      const currentProjectIdKey = `currentProjectIdFor${tabId}`;
      const storageObject = {};
      storageObject[currentProjectIdKey] = projectId;
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