import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: "AIzaSyAAp7X6MMLfJtAnsdZJTDgWD6n7z_zpjZY",
  authDomain: "grean-de04f.firebaseapp.com",
  databaseURL: "https://grean-de04f-default-rtdb.firebaseio.com",
  projectId: "grean-de04f",
  storageBucket: "grean-de04f.appspot.com",
  messagingSenderId: "881625022209",
  appId: "1:881625022209:web:fc7fed7164fbbf7925a500",
  measurementId: "G-6N4REHK39G"
};

const app = initializeApp(firebaseConfig);


// Auth
export const auth = getAuth(app);

setPersistence(auth, inMemoryPersistence);
// Firestore
export const db = getFirestore(app);
// Storage
export const storage = getStorage(app);
// Analytics
export const analytics = getAnalytics(app);
// App
export default app;