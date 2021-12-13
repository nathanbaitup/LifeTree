/* eslint-disable no-undef */

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBsDQ62FMwu9rA0UrWispR3q08MVlYPtMw',
    authDomain: 'lifetree-c1ed8.firebaseapp.com',
    projectId: 'lifetree-c1ed8',
    storageBucket: 'lifetree-c1ed8.appspot.com',
    messagingSenderId: '533082351504',
    appId: '1:533082351504:web:6d45ffc1bf0076c72b7515',
    measurementId: 'G-ZM90VXQGBN'
};


// Initialize Firebase
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

export { firebase };
