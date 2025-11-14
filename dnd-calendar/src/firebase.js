import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEDdggxvmLUbUTydApYE2vsSU2HU0yHfQ",
  authDomain: "dnd-availability.firebaseapp.com",
  projectId: "dnd-availability",
  storageBucket: "dnd-availability.firebasestorage.app",
  messagingSenderId: "169732474964",
  appId: "1:169732474964:web:53b371dcca5ebdda8b05c1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);