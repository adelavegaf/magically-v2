import Fix from './Fix';
import Api from './Api';
import MessagingApi from './messaging/MessagingApi';


chrome.runtime.onMessage.addListener((request, sender, response) => {
  switch (request.type) {
    case 'GET_CURRENT_TAB_INFORMATION': {
      const {tabId} = request;
      MessagingApi.getCurrentTabInformation(tabId).then(tabInformation => {
        response(tabInformation);
      });
      return true;
    }
    case 'SET_CURRENT_PROJECT_ID': {
      const {tabId, projectId} = request;
      MessagingApi.setCurrentProjectId(tabId, projectId).then(projectIdUpdate => {
        response(projectIdUpdate);
      });
      return true;
    }
    default:
      console.error('unknown message', request);
  }
});

chrome.tabs.onUpdated.addListener((tabId, {status}, tab) => {
  if (status !== 'complete') {
    return;
  }
  Api.getProjectsWithUrl(tab.url).then(projects => {
    if (projects.length === 0) {
      return;
    }
    // TODO(adelavega): Analyze which project should be loaded.
    const currentProjectId = 0;

    // Store the results
    const storageObject = {};
    storageObject[`projectsFor${tabId}`] = projects;
    storageObject[`currentProjectIdFor${tabId}`] = currentProjectId;
    chrome.storage.local.set(storageObject, () => console.info('set to local', storageObject));

    // Fix the website
    const selectedProject = projects[currentProjectId];
    const fix = Fix.generateFrom(selectedProject);
    console.info('selected project', selectedProject);
    console.info(fix);
    chrome.tabs.executeScript({
      code: fix
    });
  });
});