export const getTokenJWT = async ({ email, password }) => {
  console.log(email, password);
  const resp = await fetch("/login", {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    body: JSON.stringify({ username: email, password: password }),
  });
  if (resp.ok) {
    const data = await resp.json();
    window.localStorage.setItem("AUTH_CREDENTIALS", JSON.stringify(data));
    return "ok";
  } else {
    throw new Error("Invalid credentials");
  }
};
