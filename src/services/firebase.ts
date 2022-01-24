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
  apiKey: "AIzaSyDIcO7JLOJn6rr_UK45bjF9-w9QDBqrtnU",
  authDomain: "bdo-barter.firebaseapp.com",
  projectId: "bdo-barter",
  storageBucket: "bdo-barter.appspot.com",
  messagingSenderId: "424285807649",
  appId: "1:424285807649:web:7133a1e182e179097f2f60",
  measurementId: "G-0EDGY9HDB9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
