import { useState } from "react";
import { createUserPostRequest } from "../api/createUserPostRequest";
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const redirect = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const registerFormMapper = [
    {
      name: "username",

      placeholder: "Username",
      type: "username",
      id: "username",
    },
    {
      name: "email",

      placeholder: "Email",
      type: "email",
      id: "email",
    },
    {
      name: "password",

      placeholder: "Password",
      type: "password",
      id: "password",
    },
    {
      name: "confirm_password",

      placeholder: "Confirm Password",
      type: "password",
      id: "confirm_password",
    },
  ];

  const handleChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = async () => {
    const resp = await createUserPostRequest(registerForm);

    if (resp) {
      redirect("/");
    }
  };
  return (
    <div>
      <h2 style={{ marginLeft: "46%" }}>Register</h2>
      <form className="card">
        {registerFormMapper.map(({ name, id, placeholder, type }) => (
          <input
            className="register-form"
            name={name}
            placeholder={placeholder}
            value={registerFormMapper[name]}
            type={type}
            key={id}
            onChange={handleChange}
          />
        ))}
      </form>
      <button className="button" onClick={handleClick}>
        Sign up!
      </button>
    </div>
  );
};
