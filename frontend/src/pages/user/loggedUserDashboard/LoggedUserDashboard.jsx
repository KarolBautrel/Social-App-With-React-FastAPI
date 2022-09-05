import { useState, useEffect } from "react";
import { getLoggedUser } from "../api/requests/getLoggedUser";
import { LoggedUserCard } from "./LoggedUserCard";
export const LoggedUserDashboard = () => {
  const [currentUserCredentials, setCurrentUserCredentials] = useState("");

  const executeGetLoggedUser = async () => {
    const data = await getLoggedUser();
    setCurrentUserCredentials(data);
  };
  useEffect(() => {
    executeGetLoggedUser();
    console.log(currentUserCredentials);
  }, []);

  return (
    <div className="card">
      {currentUserCredentials ? (
        <LoggedUserCard userCredentials={currentUserCredentials} />
      ) : (
        <div> Loading...</div>
      )}
    </div>
  );
};
