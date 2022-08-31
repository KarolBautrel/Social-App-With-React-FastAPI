import { getComments } from "./requests/getComments";
import { useQuery } from "@tanstack/react-query";

export const useRecentCommentsQuery = () => {
  const recentComments = useQuery(["recent_comments"], () => getComments());
  return recentComments;
};
