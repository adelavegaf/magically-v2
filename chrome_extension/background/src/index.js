import {createStore} from 'redux';
import rootReducer from './reducers';
import {wrapStore} from 'react-chrome-redux';

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

const sanitizeInput = (input) => {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};

const wrapFixBodyInCommonComponent = (domSelector, body) => {
  return `{
    const domElement = document.querySelector('${domSelector}');
    if (domElement) {
      ${body}
    }
  }`;
};

const applyContrastErrorsFix = (contrastErrors) => {
  return Object
    .entries(contrastErrors)
    .filter(([, error]) => error.isFixed)
    .map(([, error]) => {
      const body = `
      domElement.style.background = "${sanitizeInput(error.backgroundColor)}";
      domElement.style.color = "${sanitizeInput(error.foregroundColor)}";
      `;
      return wrapFixBodyInCommonComponent(error.domSelector, body);
    });
};

const applyImageErrorsFix = (imageErrors) => {
  return Object
    .entries(imageErrors)
    .filter(([, error]) => error.isFixed)
    .map(([, error]) => {
      const body = `
      domElement.alt = "${sanitizeInput(error.description)}";
      `;
      return wrapFixBodyInCommonComponent(error.domSelector, body);
    });
};

const applyLangErrorsFix = (langErrors) => {
  return Object
    .entries(langErrors)
    .filter(([, error]) => error.isFixed)
    .map(([, error]) => {
      const body = `
      domElement.lang = "${sanitizeInput(error.lang)}";
      `;
      return wrapFixBodyInCommonComponent(error.domSelector, body);
    });
};

const getFixFromProject = (project) => {
  const {contrastErrors, imageErrors, langErrors} = project.errors;
  const contrastFix = applyContrastErrorsFix(contrastErrors);
  const imageFix = applyImageErrorsFix(imageErrors);
  const langFix = applyLangErrorsFix(langErrors);
  const generalFix = [...contrastFix, ...imageFix, ...langFix];
  return generalFix.join('');
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
        const currentProjectId = 0;
        // TODO(adelavega): Analyze which project should be loaded.
        const selectedProject = projects[currentProjectId];
        console.log('selected project', selectedProject);
        // When the extension is opened, the store is loaded with the data from storage.
        tabObject[tabId] = {projects: projects, currentProjectId: currentProjectId};
        const updateObject = {...curState.tabs, ...tabObject};
        store.dispatch({type: 'SET_TABS', tabs: updateObject});
        chrome.storage.local.set(updateObject, () => console.info('set to local', updateObject));

        const fix = getFixFromProject(selectedProject);
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