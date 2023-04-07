import firebase from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { firebaseConfig } from "./firebase.config";
import { getFirestore } from "firebase/firestore";

export const Firebase = firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export const Providers = { google: new GoogleAuthProvider() };
export const db = getFirestore();