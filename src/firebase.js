import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpd0bWUEkmjdE-GY5Sp1stnZ0kNA0vTxY",
  authDomain: "comforty-app-1ccfa.firebaseapp.com",
  projectId: "comforty-app-1ccfa",
  storageBucket: "comforty-app-1ccfa.firebasestorage.app",
  messagingSenderId: "22337789271",
  appId: "1:22337789271:web:95747536b903b28f50b212",
  measurementId: "G-Q3DS12JJNY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
