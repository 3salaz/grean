// src/contexts/AuthContext.js

import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../firebase.config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Unsubscribe on cleanup
  }, []);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

  const login = async (email, password) => {
    console.log("Attempting to log in with:", email, password);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('logged in')
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        alert(`Login Failed: ${error.message}`);
      });
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    googleSignIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
