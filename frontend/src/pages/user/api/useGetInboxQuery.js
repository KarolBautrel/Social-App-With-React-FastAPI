import { getInbox } from "./requests/getInbox";
import { useQuery } from "@tanstack/react-query";

export const useGetInboxQuery = () => {
  const roomQuery = useQuery(["inbox"], () => getInbox());
  return roomQuery;
};
