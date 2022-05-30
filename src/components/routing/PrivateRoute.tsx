import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// TODO: type this waaaaaay better
const PrivateRoute: React.FC<any> = ({ children }: any) => {
  // get the current user
  const { currentUser } = useAuth();
  // if the user is not signed in, re-direct to the login page
  return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
