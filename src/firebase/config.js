// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwoTUWnVhkCSPzVoL2KROlxBLEI9ki5q4",
  authDomain: "react-geo-23bc6.firebaseapp.com",
  projectId: "react-geo-23bc6",
  storageBucket: "react-geo-23bc6.firebasestorage.app",
  messagingSenderId: "1040914758397",
  appId: "1:1040914758397:web:d463cadc11e9e0c51c1c94"
};

// Initialize Firebase
export const FireBaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FireBaseApp );
export const FirebaseDB = getFirestore( FireBaseApp );