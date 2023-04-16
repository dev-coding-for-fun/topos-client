import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { firebaseConfig } from "./firebase.config";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

export const Firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const Providers = { google: new GoogleAuthProvider() };
export const db = getFirestore(Firebase);
connectFirestoreEmulator(db, '127.0.0.1', 8080);
