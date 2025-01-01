// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWBkATwfuKxECTETgAZT7xbuwnIDN5Rks",
  authDomain: "optimal-state-of-living-c9232.firebaseapp.com",
  projectId: "optimal-state-of-living-c9232",
  storageBucket: "optimal-state-of-living-c9232.firebasestorage.app",
  messagingSenderId: "586458180592",
  appId: "1:586458180592:web:5cf481b0ccdef1c19a0b35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };