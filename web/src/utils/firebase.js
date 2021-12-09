import firebase from 'firebase/app';
import 'firebase/auth';

const prodConfig = {
    apiKey: "AIzaSyCfjwBigO6X99f_p_ByUA3jWLjTdSqmY0g",
    authDomain: "app-ambulance.firebaseapp.com",
    projectId: "app-ambulance",
    storageBucket: "app-ambulance.appspot.com",
    messagingSenderId: "615764768591",
    appId: "1:615764768591:web:41cc31a61b553f727f373a",
    measurementId: "G-11J0YCY0R5"
};

const devConfig = {

    apiKey: "AIzaSyCfjwBigO6X99f_p_ByUA3jWLjTdSqmY0g",
    authDomain: "app-ambulance.firebaseapp.com",
    projectId: "app-ambulance",
    storageBucket: "app-ambulance.appspot.com",
    messagingSenderId: "615764768591",
    appId: "1:615764768591:web:41cc31a61b553f727f373a",
    measurementId: "G-11J0YCY0R5"
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const firebaseAuth = firebase.auth();

export {
    firebaseAuth, firebase
};

