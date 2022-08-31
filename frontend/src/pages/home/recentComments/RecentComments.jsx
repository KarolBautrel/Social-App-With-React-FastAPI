import React from "react";
import { useRecentCommentsQuery } from "../api/useRecentCommentsQuery";
import { RecentCommentsCard } from "./RecentCommentsCard";

export const RecentComments = () => {
  const recentCommentsQuery = useRecentCommentsQuery();
  if (recentCommentsQuery.status === "error") {
    return <div>Something went wrong</div>;
  }
  return (
    <div>
      {recentCommentsQuery.status === "loading" ? (
        <div>loading...</div>
      ) : (
        <RecentCommentsCard
          recentCommentsQuery={recentCommentsQuery.data.slice(0, 5)}
        />
      )}
    </div>
  );
};
