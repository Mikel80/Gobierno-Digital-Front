import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";

export default function TopBar() {
  const [requestState, sendRequest] = useRequest();
  const navigate = useNavigate();
  const [userState, dispatch] = useContext(UserContext);
  const { user } = userState;

  const handleLogout = async () => {
    console.log('Logging out');
    const response = await sendRequest({endPoint: 'logout', method: 'POST'});
    if (response && !requestState.error) {
      dispatch({type: 'logout_success'});
      navigate('/');
    }
  }

  return (
    <div className="flex-1 flex max-h-16 h-16 border-b-2 items-center justify-between">
      <div className="pl-6">Logo</div>
      {user && user.name && (
        <div className="pr-6 flex gap-8 items-center">
          <span>{user.name}</span>
          <span>
            <button className="px-4 py-2 border" onClick={handleLogout}>Logout</button>
          </span>
        </div>
      )}
    </div>
  );
}
