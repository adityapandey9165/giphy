import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMUbpVnDz--cbv10Z0O-l-UmUPbKQPnZA",
  authDomain: "alphabl-adityapandeyproject.firebaseapp.com",
  projectId: "alphabl-adityapandeyproject",
  storageBucket: "alphabl-adityapandeyproject.appspot.com",
  messagingSenderId: "636960695932",
  appId: "1:636960695932:web:6099f9c7f31d2a38168bf9",
  measurementId: "G-L5DFCDQZ0C",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export { auth, firestore };
