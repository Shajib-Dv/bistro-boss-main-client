/** @format */

import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/firebase.config";
import axios from "axios";

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  //create user with email and pass
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign up/in with google pop up
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //log in
  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //log out user
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //update user profile
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //track user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      //get and set jwt token
      if (currentUser) {
        axios
          .post("https://bistro-boss-server-shajib-dv.vercel.app/jwt", {
            email: currentUser.email,
          })
          .then((data) => {
            localStorage.setItem("access-token", data.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
      }
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    signInUser,
    googleSignIn,
    signUpUser,
    logOutUser,
    updateUserProfile,
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
