import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLoggedUserData } from "../redux/auth";

export const SessionHolder = ({ children }) => {
  const dispatch = useDispatch();
  const localStorageData = window.localStorage.getItem("AUTH_CREDENTIALS");
  const data = JSON.parse(localStorageData);
  if (data) {
    dispatch(
      getLoggedUserData({
        username: data.user.user_username,
        email: data.user.user_email,
        token: data.access_token,
        id: data.user.user_id,
      })
    );
  }
  return children;
};
