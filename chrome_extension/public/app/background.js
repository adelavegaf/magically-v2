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
      .get()
      .then(projects => {
        console.log(projects);
      });
  }
});