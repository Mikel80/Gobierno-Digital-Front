import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import useRequest from "../hooks/useRequest";

export default function Login() {
  const [requestState, sendRequest] = useRequest();

  const makeRequest = (userCreds) => {
    sendRequest({endPoint: "login", method: 'POST'}, userCreds);
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <LoginForm makeRequest={makeRequest} />
      <div>
        {requestState.loading && <div>Loading...</div>}
        {requestState.error && <div>Algo Fallo</div>}
        {requestState.data && requestState.data.token && (
          <Navigate to="home" replace />
        )}
      </div>
    </div>
  );
}
