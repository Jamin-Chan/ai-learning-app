// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: "learning-app-b8e2a.firebaseapp.com",
  projectId: "learning-app-b8e2a",
  storageBucket: "learning-app-b8e2a.appspot.com",
  messagingSenderId: "88091356233",
  appId: "1:88091356233:web:65a3d55e0234c9feab6398",
  measurementId: "G-2FJM9RSJ01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}