import React from "react";
import { useRoomsListQuery } from "../api/useRoomsListQuery";
import { RoomCards } from "./RoomCards";
export const RoomsList = () => {
  const roomListQuery = useRoomsListQuery();

  if (roomListQuery.status === "error") {
    return <div>Something went wrong</div>;
  }
  return (
    <div>
      {roomListQuery.status === "loading" ? (
        <div>loading...</div>
      ) : (
        <RoomCards roomListQuery={roomListQuery.data} />
      )}
    </div>
  );
};
