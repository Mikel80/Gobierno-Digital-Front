import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../context/user";

const API_URL = "http://localhost:8000/api/";

const useRequest = () => {
  const [requestState, setRequestState] = useState({
    loading: false,
    error: null,
    data: undefined,
  });

  const [userState, dispatch] = useContext(UserContext);

  const setUser = (data) => {
    console.log(data)
    dispatch({ type: "login_success", payload: data });
  };

  const sendRequest = async (resource, payload ) => {
    const { endPoint, method } = resource;
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method
    };
    
    if(userState.token) {
      options.headers['Authorization'] = `Bearer ${userState.token}`
    }
    
    payload && (options["body"] = JSON.stringify(payload));

    try {
      setRequestState((prevState) => {
        return {
          ...prevState,
          loading: true,
        };
      });
      const res = await fetch(`${API_URL}${endPoint}`, options);
      const result = await res.json();

      setRequestState((prevState) => {
        return {
          loading: false,
          data: { ...result },
          error: null,
        };
      });

      if (endPoint === "login") {
        setUser(result);
      }
      return result;
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
