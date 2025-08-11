// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEIo9gg9wAi95xN3Uag3sfBA7r8m9ZlhI",
    authDomain: "mywebapp-fe0c2.firebaseapp.com",
    projectId: "mywebapp-fe0c2",
    storageBucket: "mywebapp-fe0c2.appspot.com",
    messagingSenderId: "209013926177",
    appId: "1:209013926177:web:c2b1a788d86b84677ff660",
    measurementId: "G-5YR6P325RL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firestore
export const db = getFirestore(app);