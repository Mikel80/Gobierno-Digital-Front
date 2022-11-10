import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";

function User() {
  const [userState] = useContext(UserContext);
  const { user } = userState;
  return (
    <div>
      <h2>Bienvenido {user.name}</h2>
      <p>El modulo esta en construccion...</p>
      <p>Vuelve pronto!</p>
    </div>
  );
}

export default User;
