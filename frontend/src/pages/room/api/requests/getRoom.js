export const getRoom = async (roomId) => {
  const resp = await fetch(`/post/${roomId}`);
  const data = await resp.json();
  return data;
};
