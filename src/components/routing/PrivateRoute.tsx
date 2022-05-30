import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// TODO: type this waaaaaay better
const PrivateRoute: React.FC<any> = ({ Component, ...rest }) => {
  // get the current user
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props: any) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" replace />
        );
      }}
    />
  );
};

export default PrivateRoute;
