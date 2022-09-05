import React from "react";
import { DifferentUserCard } from "./DifferentUserCard";
import { useParams } from "react-router-dom";
import { getDifferentUser } from "../api/requests/getDifferentUser";
import { useState, useEffect } from "react";

export const DifferentUserDashboard = () => {
  const [differentUserCredentials, setDifferentUserCredentials] = useState("");
  const { id } = useParams();
  const executeGetDifferentUser = async (id) => {
    const data = await getDifferentUser(id);
    setDifferentUserCredentials(data);
  };
  useEffect(() => {
    executeGetDifferentUser(id);
    console.log(differentUserCredentials);
  }, []);

  return (
    <div className="card">
      {differentUserCredentials ? (
        <div>
          <DifferentUserCard differenUser={differentUserCredentials} />
        </div>
      ) : (
        <div> loading </div>
      )}
    </div>
  );
};
