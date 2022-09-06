export const changeEmailRequest = async (emailData) => {
  console.log(emailData);
  const data = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));
  const token = data.access_token;
  const resp = await fetch("/user/change_mail", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ new_email: emailData }),
  });
  if (!resp.ok) {
    throw new Error();
  }
  console.log(resp.status);
  return resp.status;
};
