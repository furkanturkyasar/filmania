import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from "./src/constants";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const firestore = getFirestore(app); 

export const FIREBASE_AUTH = auth;
export const FIREBASE_FIRESTORE = firestore;