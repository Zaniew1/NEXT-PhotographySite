import firebase from "firebase/compat/app"
import {getStorage} from 'firebase/storage';
import {getFirestore} from'firebase/firestore';
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: String(process.env.REACT_APP_FIREBASE_KEY),
  authDomain: "react-photography-c6b2f.firebaseapp.com",
  projectId: "react-photography-c6b2f",
  storageBucket: "react-photography-c6b2f.appspot.com",
  messagingSenderId: "9911131058",
  appId:  String(process.env.REACT_APP_FIREBASE_ID),
  measurementId: "G-D7PVTCJL2R"
};
export const app =  firebase.apps.length === 0 ? firebase.initializeApp(firebaseConfig) : firebase.app();
export const firebaseStorage = getStorage(app);
export const firebaseFirestore = getFirestore(app);
export const firebaseAuth = getAuth(app)