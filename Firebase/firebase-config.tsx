import firebase from "firebase/compat/app"
import {getStorage} from 'firebase/storage';
import {getFirestore} from'firebase/firestore';
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyA4bRI_AJIqel0pdZTzZWpYEUlpJtFFtBU",
  authDomain: "react-photography-c6b2f.firebaseapp.com",
  projectId: "react-photography-c6b2f",
  storageBucket: "react-photography-c6b2f.appspot.com",
  messagingSenderId: "9911131058",
  appId: "1:9911131058:web:4269b821e02e16baa8a2ab",
  measurementId: "G-D7PVTCJL2R"
};
export const app =  firebase.apps.length === 0 ? firebase.initializeApp(firebaseConfig) : firebase.app();
export const firebaseStorage = getStorage(app);
export const firebaseFirestore = getFirestore(app);
export const firebaseAuth = getAuth(app)