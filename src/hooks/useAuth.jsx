import { useReducer } from "react";

const initialState = {
  user: {
    name: "",
    email: "",
    roles: [],
  },
  token: "",
};

export const userActions = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case userActions.LOGIN_SUCCESS:
      return { user: { ...action.payload.user }, token: action.payload.token };
    default:
      return state;
  }
};

const useAuth = () => {
  const [userState, dispatch] = useReducer(reducer, initialState);

  return [userState, dispatch];
};

export default useAuth;
