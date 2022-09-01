import React from "react";
import { useRoomQuery } from "./api/useRoomQuery";
import { useParams } from "react-router-dom";
import { RoomComments } from "./RoomComments";
import { RoomParticipants } from "./RoomParticipants";
import { RoomHeader } from "./RoomHeader";
import { RoomCommentCreateForm } from "./RoomCommentCreateForm";
export const Room = () => {
  const { id } = useParams();
  const roomQuery = useRoomQuery(id);
  if (roomQuery.status === "error") {
    return <div>Something went wrong</div>;
  }
  return (
    <div>
      {roomQuery.status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <RoomHeader roomQuery={roomQuery.data} />
          </div>
          <div className="mt-[1%] flex grid-cols-2 ">
            <div className="w-4/5">
              <RoomComments roomQuery={roomQuery.data} />
            </div>
            <div className="w-1/5">
              <RoomParticipants roomQuery={roomQuery.data} />
            </div>
          </div>
          <div className="ml-[5px] flex grid-cols-2 ">
            <div className="w-4/5">
              <RoomCommentCreateForm />
            </div>
          </div>
        </>
      )}{" "}
    </div>
  );
};
