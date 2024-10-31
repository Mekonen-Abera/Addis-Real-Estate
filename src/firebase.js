// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "addis-real-state.firebaseapp.com",
    projectId: "addis-real-state",
    storageBucket: "addis-real-state.appspot.com",
    messagingSenderId: "358705711283",
    appId: "1:358705711283:web:a164d8149d53524d9b48c6",
    measurementId: "G-C992XPK9W9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);