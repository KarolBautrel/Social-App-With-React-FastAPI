export const getInbox = async () => {
  const localStorageData = JSON.parse(
    window.localStorage.getItem("AUTH_CREDENTIALS")
  );
  const token = localStorageData.access_token;

  const resp = await fetch("messages/inbox", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = resp.json();
  return data;
};
