import { useState } from "react";
import { getTokenJWT } from "../api/getTokenJWT";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const redirect = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const loginForm = [
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
  ];

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getTokenJWT(login);
    window.localStorage.setItem("AUTH_CREDENTIALS", JSON.stringify(data));
    redirect("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {loginForm.map(({ name, placeholder, id, type }) => (
          <label key={id}>
            <input
              required
              id={id}
              key={id}
              type={type}
              placeholder={placeholder}
              name={name}
              value={loginForm[name]}
              onChange={handleChange}
            />
          </label>
        ))}

        <button className="button">Login</button>
      </form>
    </div>
  );
};
