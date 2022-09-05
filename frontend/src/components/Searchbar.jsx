import { useState, useEffect } from "react";
import { getTopicsListRequest } from "./api/requests/getTopicsListRequest";
import { getSearchingTopicPosts } from "./api/requests/getSearchingTopicPosts";
export const Searchbar = () => {
  const [queryPhrase, setQueryPhrase] = useState("");
  const [topicList, setTopicList] = useState([]);

  const getTopics = async () => {
    const resp = await getTopicsListRequest();
    setTopicList(resp);
    return resp;
  };

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <div>
      <select
        onChange={(e) => {
          setQueryPhrase(e.target.value);
        }}
        value={queryPhrase}
      >
        {topicList.map((topic) => (
          <option key={topic.id} value={topic.topic_name}>
            {topic.topic_name}
          </option>
        ))}
      </select>
      <button className="btn btn-outline-success" onClick={() => {}}>
        Search
      </button>
    </div>
  );
};
