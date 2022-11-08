import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ children }) {
  const [userState, dispatch] = useAuth();
  let location = useLocation();

  console.log(userState);

  if (!userState.user || !userState.token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
