import { useState, useEffect } from "react";

export const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div>
      <div className="card">
        <h1>This is Password</h1>
        <form>
          <input
            id="new_password"
            type="text"
            className="form-control"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <input
            id="confirm_password"
            type="text"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
};
