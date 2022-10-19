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

let firebaseConfig = {
  apiKey: "AIzaSyD1Tbn5zdnGKOD5RDvvxXkGQBqOR6GQDes",
  authDomain: "reactive-feeds.firebaseapp.com",
  databaseURL: "https://reactive-feeds.firebaseio.com",
  projectId: "reactive-feeds",
  storageBucket: "reactive-feeds.appspot.com",
  messagingSenderId: "512493791420",
  appId: "1:512493791420:web:b5dc3882054f43c48dc8b9",
};

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
