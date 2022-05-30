import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";

export type authContext = {
  currentUser: firebase.User | null;
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential> | void; // again, fix this (not gonna be void I don't think)
};

const AuthContext = React.createContext<authContext>({
  currentUser: null,
  signup: (email: string, password: string) => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

// TODO: type this better
export const AuthProvider = ({ children }: any) => {
  // current user state
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  //   sign up with firebase (TODO: type this better)
  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  // this is going to fire only once
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false); // verification that we have or do not have a user - internal loading for this is done
    });

    return unsubscribe;
  }, []);

  // value of the current user
  const value = { currentUser, signup };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
