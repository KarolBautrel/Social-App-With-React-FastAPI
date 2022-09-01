import { Navigate } from "react-router-dom";

export const AuthUserValidator = ({ children }) => {
  const localStorageData = window.localStorage.getItem("AUTH_CREDENTIALS");
  const data = JSON.parse(localStorageData);
  if (!data) {
    return <Navigate to="/login" />;
  }
  return children;
};
