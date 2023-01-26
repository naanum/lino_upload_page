// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTArQoBnuIbwo09AunVPwAzNHbDLRc17M",
  authDomain: "myline-372f9.firebaseapp.com",
  projectId: "myline-372f9",
  storageBucket: "myline-372f9.appspot.com",
  messagingSenderId: "1058879769433",
  appId: "1:1058879769433:web:94f28e9142695329249a48",
  measurementId: "G-9RJJ1MM81V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
