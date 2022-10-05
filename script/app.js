'use strict';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3ssOJN8oEeW26Fqd77NwLP_j5r-8bTkk",
  authDomain: "tabvar-topos.firebaseapp.com",
  projectId: "tabvar-topos",
  storageBucket: "tabvar-topos.appspot.com",
  messagingSenderId: "823275884172",
  appId: "1:823275884172:web:b0706443314c2bba3d35a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


function ToposClient() {

  firebase.auth().signInAnonymously().then(function() {
    that.initTemplates();
    that.initRouter();
    that.initReviewDialog();
    that.initFilterDialog();
  }).catch(function(err) {
    console.log(err);
  });
}

