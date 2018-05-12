import {createStore} from 'redux';
import rootReducer from './reducers';
import {wrapStore} from 'react-chrome-redux';
import Fix from './Fix';

// TODO(adelavega): consider race condition between storage get, and firebase set.

const store = createStore(rootReducer, {});

wrapStore(store, {
  portName: 'magically'
});

const initFirebase = () => {
  const config = {
    apiKey: 'AIzaSyAskO3QYe979opV4QmRW3-tk6AwCrFRNmI',
    authDomain: 'magically-188518.firebaseapp.com',
    databaseURL: 'https://magically-188518.firebaseio.com',
    projectId: 'magically-188518',
    storageBucket: '',
    messagingSenderId: '714997527027'
  };
  firebase.initializeApp(config);
};

chrome.tabs.onUpdated.addListener((tabId, {status}, tab) => {
  if (status === 'complete') {

    if (!firebase.apps.length) {
      initFirebase();
    }

    firebase
      .firestore()
      .collection('projects')
      .where('websiteUrl', '==', tab.url)
      .where('isLoading', '==', false)
      .get()
      .then(projectsSnapshot => {
        const tabObject = {};
        const curState = store.getState();
        if (!projectsSnapshot.docs.length) {
          tabObject[tabId] = {projects: [], selectedProject: null};
          const updateObject = {...curState.tabs, ...tabObject};
          store.dispatch({type: 'SET_TABS', tabs: updateObject});
          chrome.storage.local.set(updateObject, () => console.info('set to local', updateObject));
          return;
        }
        const projects = projectsSnapshot.docs.map(project => project.data());
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
  }
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