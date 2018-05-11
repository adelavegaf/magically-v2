import {createStore} from 'redux';
import rootReducer from './reducers';
import {wrapStore} from 'react-chrome-redux';

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
      .then(projects => {
        if (!projects.docs.length) {
          return;
        }
        // TODO(adelavega): Analyze which project should be loaded.
        const selectedProject = projects.docs[0].data();
        const fix = getFixFromProject(selectedProject);
        console.log(fix);
        chrome.tabs.executeScript({
          code: fix
        });
      });
  }
});