import React, { ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

type authContext = {
  currentUser: any;
  signup: (email: string, password: string) => void;
};

const AuthContext = React.createContext<authContext>({
  currentUser: "Mason",
  signup: (email: string, password: string) => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (children: any) => {
  // current user state
  const [currentUser, setCurrentUser] = useState(undefined);
  //   sign up with firebase (TODO: type this better)
  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  // this is going to fire only once
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
