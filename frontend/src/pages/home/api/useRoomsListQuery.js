import { getRooms } from "./requests/getRooms";
import { useQuery } from "@tanstack/react-query";

export const useRoomsListQuery = () => {
  const roomsListQuery = useQuery(["rooms"], () => getRooms());
  return roomsListQuery;
};
