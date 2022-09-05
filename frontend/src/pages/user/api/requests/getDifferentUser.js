export const getDifferentUser = async (id) => {
  const data = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));

  const token = data.access_token;
  try {
    const resp = await fetch(`/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!resp.ok) {
      throw new Error();
    }
    const data = await resp.json();
    console.log(data);
    return data;
  } catch (err) {
    alert(err.message);
  }

  return <div>getLoggedUser</div>;
};
