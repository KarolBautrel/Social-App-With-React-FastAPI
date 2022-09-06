import { useState, useEffect } from "react";
import { changePasswordRequest } from "../api/changePasswordRequest";
import { useNavigate } from "react-router-dom";
export const ChangePassword = () => {
  const redirect = useNavigate();
  const [changePassword, setChangePassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const changePasswordForm = [
    {
      name: "old_password",
      id: "old_password",
      placeholder: "Current Password",
      type: "password",
    },
    {
      name: "new_password",
      id: "new_password",
      placeholder: "New Password",
      type: "password",
    },
    {
      name: "confirm_password",
      id: "confirm_password",
      placeholder: "Confirm New Password",
      type: "password",
    },
  ];
  const handleChange = (e) => {
    setChangePassword({
      ...changePassword,
      [e.target.name]: e.target.value,
    });
  };

  const onChangePassword = async () => {
    const response = await changePasswordRequest(changePassword);
    if (response == 200) {
      redirect("/me");
    }
  };

  return (
    <div>
      <div className="card">
        <h1>This is Password</h1>
        <ul>
          {changePasswordForm.map(({ name, id, placeholder, type }) => (
            <li key={id}>
              <input
                required
                name={name}
                id={id}
                placeholder={placeholder}
                type={type}
                value={changePasswordForm[name]}
                onChange={handleChange}
              />
            </li>
          ))}
        </ul>
        <button onClick={onChangePassword} className="btn-blue mt-5 w-3/4">
          Change Password
        </button>
      </div>
    </div>
  );
};
