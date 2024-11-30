// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAasXnRsoOJ9XZ7VLThEQeKnOtIYaiqOYQ",
  authDomain: "task-manager-24f26.firebaseapp.com",
  projectId: "task-manager-24f26",
  storageBucket: "task-manager-24f26.firebasestorage.app",
  messagingSenderId: "453748714444",
  appId: "1:453748714444:web:2dfd75feb78e70f89b4b69",
  measurementId: "G-5C0YD8S0SP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);