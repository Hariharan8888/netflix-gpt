// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3Vs-XB50AsZgJI4jr2-66iiZ7GruohkY",
  authDomain: "netflixgpt-546ba.firebaseapp.com",
  projectId: "netflixgpt-546ba",
  storageBucket: "netflixgpt-546ba.appspot.com",
  messagingSenderId: "842078675921",
  appId: "1:842078675921:web:e2ed4e282a48536e78b6f0",
  measurementId: "G-RZKS2E92BL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();