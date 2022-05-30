import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";

export type authContext = {
  currentUser: firebase.User | null;
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential> | void; // again, fix this (not gonna be void I don't think)
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential> | void;
  logout: () => Promise<void> | void; // this band-aids authContext, pls fix
};

// auth context react context
const AuthContext = React.createContext<authContext>({
  currentUser: null,
  signup: (email: string, password: string) => {},
  login: (email: string, password: string) => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

// TODO: type this better
export const AuthProvider = ({ children }: any) => {
  // current user state
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  // loading state, do not progress in the application until the current user is set
  const [loading, setLoading] = useState<boolean>(true);
  //   sign up with firebase (TODO: type this better)
  const signup = (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  // log in with firebase
  const login = (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  // log out with firebase
  const logout = (): Promise<void> => {
    return auth.signOut();
  };

  // run this for verification for a user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false); // verification that we have or do not have a user - internal loading for this is done
    });

    return unsubscribe;
  }, []);

  // value of the current user
  const value = { currentUser, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
