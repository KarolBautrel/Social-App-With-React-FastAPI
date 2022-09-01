import React from "react";

export const RoomHeader = ({ roomQuery }) => {
  return (
    <div className="background-main">
      <div className="font-mono text-xl ml-[25%]"> {roomQuery.title}</div>
    </div>
  );
};
