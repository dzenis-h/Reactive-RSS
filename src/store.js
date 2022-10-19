import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Custom Reducers
import notifyReducer from "./reducers/notifyReducer";
import feedsReducer from "./reducers/feedsReducer";

import { config } from "./config/config_dev";

let firebaseConfig;

if (process.env.NODE_ENV === "development") {
  //  YOUR FIREBASE CONFIGS GO HERE ...  ---> src\config\config_dev.js
  firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
  };
} else {
  firebaseConfig = {
    apiKey: process.env.API_KEY.toString(),
    authDomain: process.env.AUTH_DOMAIN.toString(),
    databaseURL: process.env.DATABASE_URL.toString(),
    projectId: process.env.PROJECT_ID.toString(),
    storageBucket: process.env.STORAGE_BUCKET.toString(),
    messagingSenderId: process.env.MESSAGING_SENDER_ID.toString(),
    appId: process.env.APP_ID.toString(),
  };
}


// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  feedsFunc: feedsReducer,
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
