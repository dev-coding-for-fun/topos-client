// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { config } from "./config";
import { ToposClient } from "./ToposClient";


window.onload = () => {
  const firebaseApp = initializeApp(config.firebase);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", "8080");
  new ToposClient(firebaseApp);
};


