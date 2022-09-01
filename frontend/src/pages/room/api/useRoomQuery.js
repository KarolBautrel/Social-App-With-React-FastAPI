import { getRoom } from "./requests/getRoom";
import { useQuery } from "@tanstack/react-query";

export const useRoomQuery = (roomId) => {
  const roomQuery = useQuery(["room", roomId], () => getRoom(roomId));
  return roomQuery;
};
