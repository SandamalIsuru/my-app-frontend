// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv4z45OpqYWVM0Gd9Bs2dZLCNY2Ynr7GA",
  authDomain: "my-app-fb285.firebaseapp.com",
  projectId: "my-app-fb285",
  storageBucket: "my-app-fb285.appspot.com",
  messagingSenderId: "773240784735",
  appId: "1:773240784735:web:812d90fbd4f984262118ea",
  measurementId: "G-VCV4FS68DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);