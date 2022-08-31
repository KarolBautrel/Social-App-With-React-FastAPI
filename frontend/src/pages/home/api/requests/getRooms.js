export const getRooms = async () => {
  const resp = await fetch("/post");
  const data = await resp.json();
  return data;
};
