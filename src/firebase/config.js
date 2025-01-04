import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8Q9U6auo_BRB3vs9S0lFBuF46MOJtYqs",
  authDomain: "task-manager-ba659.firebaseapp.com",
  projectId: "task-manager-ba659",
  storageBucket: "task-manager-ba659.firebasestorage.app",
  messagingSenderId: "710921975670",
  appId: "1:710921975670:web:bf30386b8cb4ef36c5ec57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
