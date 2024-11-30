import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsfuD6hr2j3L8ddXfOKFGyTM-e1caKaBg",
  authDomain: "task-manager-app-14b4d.firebaseapp.com",
  projectId: "task-manager-app-14b4d",
  storageBucket: "task-manager-app-14b4d.firebasestorage.app",
  messagingSenderId: "521304530198",
  appId: "1:521304530198:web:293008a6ca3f3e87650437",
  measurementId: "G-NHTZVXFV2J"
};


const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
export{auth,app,db}; 