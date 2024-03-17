// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2zUsuOsnqQR_ZDeD327uHH06RkLjqeLs",
  authDomain: "filmania-e6015.firebaseapp.com",
  projectId: "filmania-e6015",
  storageBucket: "filmania-e6015.appspot.com",
  messagingSenderId: "482800392217",
  appId: "1:482800392217:web:948635d34854e28e07f288",
  measurementId: "G-EPSYY1Q8NC"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const analytics = getAnalytics(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);