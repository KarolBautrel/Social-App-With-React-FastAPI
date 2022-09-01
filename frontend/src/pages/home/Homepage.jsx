import { useState } from "react";
import { RoomsList } from "./roomsList/RoomsList";
import { RecentComments } from "./recentComments/RecentComments";
import { GetLoggedUser } from "./reduxService/GetLoggedUser";
export const Homepage = () => {
  useState(() => {
    GetLoggedUser();
  }, []);

  return (
    <div>
      <div className="flex grid-cols-2 ">
        <div className="col w-3/5 ">
          <RoomsList />
        </div>
        <div className="col w-2/5">
          <RecentComments />
        </div>
      </div>
      <div className="grid grid-cols-2 ">Siemano</div>
    </div>
  );
};
