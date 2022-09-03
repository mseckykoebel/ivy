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
  resetPassword: (email: string) => Promise<void> | void; // this band-aids authContext, pls fix
  updateEmail: (newEmail: string) => Promise<void> | void;
  updatePassword: (newPassword: string) => Promise<void> | void;
  updateDisplayName: (newDisplayName: string) => Promise<void> | void;
};

// auth context react context
const AuthContext = React.createContext<authContext>({
  currentUser: null,
  signup: (email: string, password: string) => {},
  login: (email: string, password: string) => {},
  logout: () => {},
  resetPassword: (email: string) => {},
  updateEmail: (newEmail: string) => {},
  updatePassword: (newPassword: string) => {},
  updateDisplayName: (newDisplayName: string) => {},
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
  // reset password with firebase
  const resetPassword = (email: string): Promise<void> => {
    return auth.sendPasswordResetEmail(email);
  };
  // update email
  const updateEmail = (newEmail: string): Promise<void> => {
    return (currentUser as firebase.User).updateEmail(newEmail);
  };
  // update password
  const updatePassword = (newPassword: string): Promise<void> => {
    return (currentUser as firebase.User).updatePassword(newPassword);
  };
  // update display name
  const updateDisplayName = (newDisplayName: string): Promise<void> => {
    return (currentUser as firebase.User).updateProfile({
      displayName: newDisplayName,
    });
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
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateDisplayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
