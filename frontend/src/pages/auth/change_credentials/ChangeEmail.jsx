import { useState, useEffect } from "react";
import { changeEmailRequest } from "../api/changeEmailRequest";
import { useNavigate } from "react-router-dom";
export const ChangeEmail = () => {
  const redirect = useNavigate();
  const [newEmail, setNewEmail] = useState("");

  const onEmailChange = async () => {
    const response = await changeEmailRequest(newEmail);
    if (response == 200) {
      redirect("/me");
    }
  };
  return (
    <div>
      <div className="card">
        <h1>This is email</h1>
        <form>
          <input
            type="text"
            className="form-control"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
        </form>
        <button className="btn-blue" onClick={onEmailChange}>
          Change Email
        </button>
      </div>
    </div>
  );
};
