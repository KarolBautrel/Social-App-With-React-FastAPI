import { useState, useEffect } from "react";

export const ChangeEmail = () => {
  const [newEmail, setNewEmail] = useState("");
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
      </div>
    </div>
  );
};
