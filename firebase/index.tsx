import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseClient from "./clientApp";

// Other imports if you're using other Firebase services

const firebaseConfig = {
  // Your Firebase configuration object
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
