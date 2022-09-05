export const getLocalStorageInboxData = () => {
  const data = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));
  console.log(data.user.inbox);
  return data.user.inbox;
};
