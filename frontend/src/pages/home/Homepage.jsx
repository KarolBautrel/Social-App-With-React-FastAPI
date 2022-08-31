import React from "react";
import { RoomsList } from "./roomsList/RoomsList";
import { RecentComments } from "./recentComments/RecentComments";
export const Homepage = () => {
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      <div className="row-span-3 col-span-2">
        <RoomsList />
      </div>
      <div className="row-span-3">
        <RecentComments />
      </div>
    </div>
  );
};
