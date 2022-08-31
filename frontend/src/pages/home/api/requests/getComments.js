export const getComments = async () => {
  const resp = await fetch("/comment");
  const data = await resp.json();
  return data;
};
