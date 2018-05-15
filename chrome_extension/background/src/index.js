import Fix from './Fix';
import Api from './utils/Api';
import StorageApi from './utils/StorageApi';


chrome.runtime.onMessage.addListener((request, sender, response) => {
  switch (request.type) {
    case 'GET_CURRENT_TAB_INFORMATION': {
      const {tabId} = request;
      StorageApi.getTabInformation(tabId).then(tabInformation => {
        response(tabInformation);
      });
      return true;
    }
    case 'SET_CURRENT_PROJECT_ID': {
      const {tabId, projectId} = request;
      StorageApi
        .setTabCurrentProjectId(tabId, projectId)
        .then(projectIdUpdate => {
          response(projectIdUpdate);
          return StorageApi.getTabInformation(tabId);
        })
        .then(({projects, currentProjectId}) => {
          return Fix.generateFrom(projects[currentProjectId]);
        });
      return true;
    }
    case 'GET_IS_AUTOMATIC_FIX_ENABLED':
      StorageApi
        .getIsAutomaticFixEnabled()
        .then(isAutomaticFixEnabled => {
          response(isAutomaticFixEnabled);
        });
      return true;
    case 'SET_IS_AUTOMATIC_FIX_ENABLED':
      const {isAutomaticFixEnabled} = request;
      StorageApi
        .setIsAutomaticFixEnabled(isAutomaticFixEnabled)
        .then(isAutomaticFixEnabled => {
          response(isAutomaticFixEnabled);
        });
      return true;
    default:
      console.error('unknown message', request);
  }
});

chrome.tabs.onUpdated.addListener((tabId, {status}, tab) => {
  if (status !== 'complete') {
    return;
  }
  return Api.getProjectsWithUrl(tab.url).then(projects => {
    if (projects.length === 0) {
      return;
    }
    // TODO(adelavega): Analyze which project should be loaded.
    const currentProjectId = 0;

    // Store the results
    StorageApi.setTabInformation(tabId, projects, currentProjectId);

    // Fix the website
    const selectedProject = projects[currentProjectId];
    return Fix.generateFrom(selectedProject);
  });
});