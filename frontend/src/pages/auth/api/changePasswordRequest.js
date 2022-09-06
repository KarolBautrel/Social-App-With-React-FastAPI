export const changePasswordRequest = async (passwordData) => {
  const data = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));
  const token = data.access_token;
  const resp = await fetch("/user/change_password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      old_password: passwordData.old_password,
      new_password: passwordData.new_password,
      confirm_password: passwordData.confirm_password,
    }),
  });
  if (!resp.ok) {
    throw new Error();
  }
  return resp.status;
};
