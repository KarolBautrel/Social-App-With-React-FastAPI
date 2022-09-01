export const getTokenJWT = async (login) => {
  const loginFormData = new FormData();
  loginFormData.append("username", login.email);
  loginFormData.append("password", login.password);
  const resp = await fetch("/login", {
    method: "POST",

    body: loginFormData,
  });
  if (!resp.ok) {
    throw new Error("somethind went wrong with fetch");
  }
  const data = await resp.json();
  return data;
};
