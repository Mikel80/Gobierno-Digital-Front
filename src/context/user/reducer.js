export const reducer = (state, action) => {
  switch (action.type) {
    case "login_success":
      return {
        ...state,
        user: { ...action.payload.user },
        token: action.payload.token,
      };
    case "logout_success":
      return {
        user: {
          id: "",
          name: "",
          roles: [],
        },
        token: "",
      };
    default:
      return state;
  }
};

export const initialState = {
  user: {
    id: "",
    name: "",
    roles: [],
  },
  token: "",
};
