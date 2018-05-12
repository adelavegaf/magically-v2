// Import the Firebase modules that you need in your app.
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

// Initalize and export Firebase.
const config = {
  apiKey: 'AIzaSyAskO3QYe979opV4QmRW3-tk6AwCrFRNmI',
  authDomain: 'magically-188518.firebaseapp.com',
  databaseURL: 'https://magically-188518.firebaseio.com',
  projectId: 'magically-188518',
  storageBucket: '',
  messagingSenderId: '714997527027'
};
export default firebase.initializeApp(config);