// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyC3VP1141LJQl4W94wa7PeeUKVHrP57rBQ",
    authDomain: "myrapidchef-dev.firebaseapp.com",
    projectId: "myrapidchef-dev",
    storageBucket: "myrapidchef-dev.appspot.com",
    messagingSenderId: "610176760250",
    appId: "1:610176760250:web:872247209f79483cda8583"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);