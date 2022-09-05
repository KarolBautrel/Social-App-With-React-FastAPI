export const getTopicsListRequest = async () => {
  try {
    const resp = await fetch("/topic");
    if (!resp.ok) {
      throw new Error();
    }
    const data = resp.json();
    return data;
  } catch (err) {
    alert(err.message);
  }
};
