import { useState } from "react";

const API_URL = "http://localhost:4000/api/";

const resources = [{ resource: "login", method: "POST" }];

const useRequest = () => {
  const [requestState, setRequestState] = useState({
    loading: false,
    error: null,
    data: [],
  });

  const sendRequest = async ({ resource, payload }) => {
    const endPoint = resources.find((item) => item.resource === resource);

    const options = {};
    endPoint.method && (options["method"] = endPoint.method);
    payload && (options["body"] = JSON.stringify(payload));

    console.log(options);

    try {
      setRequestState((prevState) => {
        return {
          ...prevState,
          loading: true,
        };
      });
      const res = await fetch(`${API_URL}${endPoint.resource}`, options);
      setRequestState((prevState) => {
        return {
          loading: false,
          data: res.data,
          error: null,
        };
      });
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
