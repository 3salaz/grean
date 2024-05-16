// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq9OaSGYx75_HVBPc08JVhRWbRGsfryR4",
  authDomain: "marcellas.firebaseapp.com",
  databaseURL: "https://marcellas-default-rtdb.firebaseio.com",
  projectId: "marcellas",
  storageBucket: "marcellas.appspot.com",
  messagingSenderId: "393026111668",
  appId: "1:393026111668:web:cf39cf90460b9245692fe1",
  measurementId: "G-KKGBT7JV35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { db, auth, storage };