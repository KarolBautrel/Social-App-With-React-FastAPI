export const getLoggedUser = async () => {
  const data = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));

  const token = data.access_token;
  try {
    const resp = await fetch("/user/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!resp.ok) {
      window.localStorage.removeItem("AUTH_CREDENTIALS");
      throw new Error();
    }
    const data = await resp.json();
    return data;
  } catch (err) {
    alert(err.message);
  }

  return <div>getLoggedUser</div>;
};
