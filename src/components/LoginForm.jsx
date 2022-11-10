import React, { useState } from "react";

function LoginForm({ makeRequest }) {
  const [userCreds, setUserCreds] = useState({
    email: "",
    password: "",
  });

  const handleUserCredsChange = (event) => {
    setUserCreds((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    makeRequest(userCreds)
  }

  return (
    <form className="flex flex-col">
      <input
        type="email"
        name="email"
        onChange={handleUserCredsChange}
        className="border"
      />
      <input
        type="password"
        name="password"
        onChange={handleUserCredsChange}
        className="border"
      />
      <button onClick={handleSubmit} className="border">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
