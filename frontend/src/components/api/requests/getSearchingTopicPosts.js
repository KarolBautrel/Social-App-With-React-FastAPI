export const getSearchingTopicPosts = async (topic) => {
  try {
    const resp = await fetch(`/post/?query=${topic}`);
    if (!resp.ok) {
      throw new Error();
    }
    const data = await resp.json();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};
