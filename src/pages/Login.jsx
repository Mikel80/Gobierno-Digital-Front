import React from "react";
import { useState } from "react";
import useRequest from "../hooks/useRequest";

export default function Login() {
  const [userCreds, setUserCreds] = useState({
    email: "",
    pass: "",
  });

  const [requestState, sendRequest] = useRequest();

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
    const options = {
      resource: "login",
      payload: userCreds,
    };
    sendRequest(options);
  };

  return (
    <div className="flex flex-3 justify-center align-middle">
      <form className="flex flex-col">
        <input
          type="email"
          name="email"
          onChange={handleUserCredsChange}
          className="border"
        />
        <input
          type="password"
          name="pass"
          onChange={handleUserCredsChange}
          className="border"
        />
        <button onClick={handleSubmit} className="border">
          Login
        </button>

        {requestState.loading && <div>Loading...</div>}
        {requestState.error && <div>Algo Fallo</div>}
      </form>
    </div>
  );
}
