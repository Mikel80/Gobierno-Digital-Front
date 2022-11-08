import { useState } from "react";
import useAuth, { userActions } from "./useAuth";

const API_URL = "http://localhost:8000/api/";

const resources = [
  { resource: "login", method: "POST" },
  { resource: "logout", method: "POST" },
  { resource: "user", method: "POST" },
  { resource: "user", method: "GET" },
];

const useRequest = () => {
  const [requestState, setRequestState] = useState({
    loading: false,
    error: null,
    data: undefined,
  });
  const [userState, dispatch] = useAuth();

  const sendRequest = async ({ resource, payload }) => {
    const endPoint = resources.find((item) => item.resource === resource);

    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    endPoint.method && (options["method"] = endPoint.method);
    payload && (options["body"] = JSON.stringify(payload));

    const setUser = (data) => {
      dispatch({ type: userActions.LOGIN_SUCCESS, payload: data });
    };

    try {
      setRequestState((prevState) => {
        return {
          ...prevState,
          loading: true,
        };
      });
      const res = await fetch(`${API_URL}${endPoint.resource}`, options);
      const result = await res.json();

      setRequestState((prevState) => {
        return {
          loading: false,
          data: {...result},
          error: null,
        };
      });

      if (endPoint.resource === "login") {
        setUser(result);
      }
    } catch (err) {
      console.log(err);
      setRequestState((prevState) => {
        return {
          ...prevState,
          loading: false,
          error: err,
        };
      });
    }
  };

  return [requestState, sendRequest];
};

export default useRequest;
