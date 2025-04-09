// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

// console.log(process.env);
// console.log( import.meta.env );

// Your web app's Firebase configuration
//dev-prod
/* const firebaseConfig = {
  apiKey: "AIzaSyDwoTUWnVhkCSPzVoL2KROlxBLEI9ki5q4",
  authDomain: "react-geo-23bc6.firebaseapp.com",
  projectId: "react-geo-23bc6",
  storageBucket: "react-geo-23bc6.firebasestorage.app",
  messagingSenderId: "1040914758397",
  appId: "1:1040914758397:web:d463cadc11e9e0c51c1c94"
}; */

//testing
/* const firebaseConfig = {
  apiKey: "AIzaSyAbM_ao7pbXanMovsFFI5RxDGgiRkTwpkw",
  authDomain: "testing-react-3bc9d.firebaseapp.com",
  projectId: "testing-react-3bc9d",
  storageBucket: "testing-react-3bc9d.firebasestorage.app",
  messagingSenderId: "532419033689",
  appId: "1:532419033689:web:1c8a6b71c41c12132a0f48"
}; */

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

console.log(firebaseConfig);

// Initialize Firebase
export const FireBaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FireBaseApp );
export const FirebaseDB = getFirestore( FireBaseApp );