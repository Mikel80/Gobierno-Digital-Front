import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/user";

export default function RequireAuth({ children }) {
  const [userState] = useContext(UserContext);
  let location = useLocation();

  if (!userState.user.name || !userState.token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
