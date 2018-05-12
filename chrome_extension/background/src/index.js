import {createStore} from 'redux';
import rootReducer from './reducers';
import {wrapStore} from 'react-chrome-redux';
import Fix from './Fix';
import Api from './Api';

// TODO(adelavega): consider race condition between storage get, and firebase set.

const store = createStore(rootReducer, {});

wrapStore(store, {
  portName: 'magically'
});

chrome.tabs.onUpdated.addListener((tabId, {status}, tab) => {
  if (status !== 'complete') {
    return;
  }
  Api.getProjectsWithUrl(tab.url).then(projects => {
    const curState = store.getState();
    const tabObject = {};
    tabObject[tabId] = {projects: [], currentProjectId: -1};
    if (projects.length === 0) {
      const updateObject = {...curState.tabs, ...tabObject};
      store.dispatch({type: 'SET_TABS', tabs: updateObject});
      chrome.storage.local.set(updateObject, () => console.info('set to local', updateObject));
      return;
    }

    const currentProjectId = 1;
    // TODO(adelavega): Analyze which project should be loaded.
    const selectedProject = projects[currentProjectId];
    console.log('selected project', selectedProject);
    // When the extension is opened, the store is loaded with the data from storage.
    tabObject[tabId] = {projects: projects, currentProjectId: currentProjectId};
    const updateObject = {...curState.tabs, ...tabObject};
    store.dispatch({type: 'SET_TABS', tabs: updateObject});
    chrome.storage.local.set(updateObject, () => console.info('set to local', updateObject));

    const fix = Fix.generateFrom(selectedProject);
    console.info(fix);
    chrome.tabs.executeScript({
      code: fix
    });
  });
});

chrome.storage.local.get(['state'], ({state}) => {

  store.dispatch({type: 'SET_TABS', tabs: state});

  const saveState = () => {
    console.info('Saving state to chrome.storage.local');
    const state = store.getState();
    chrome.storage.local.set(state);
  };

  store.subscribe(saveState);
});