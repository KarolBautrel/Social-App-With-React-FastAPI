export const getDirectMessage = async (messageId) => {
  const data = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));
  const token = data.access_token;
  try {
    const resp = await fetch(`/messages/${messageId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!resp.ok) {
      throw new Error();
    }
    const data = resp.json();
    return data;
  } catch (e) {
    alert(e.message);
  }
};
