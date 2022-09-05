import { getSearchingTopicPosts } from "./requests/getSearchingTopicPosts";
import { useQuery } from "@tanstack/react-query";

export const useSearchingPostsQuery = (topic) => {
  return useQuery(["rooms"], () => getSearchingTopicPosts(topic));
};
