export const postDirectMessage = async (
  userId,
  directMessageSubject,
  directMessageBody
) => {
  const data = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));
  const token = data.access_token;
  try {
    const resp = await fetch(`/messages/${userId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        subject: directMessageSubject,
        body: directMessageBody,
      }),
    });
    if (!resp.ok) {
      throw new Error();
    }
    console.log(resp.status);
    return resp.status;
  } catch (e) {
    alert(e.message);
  }
};
