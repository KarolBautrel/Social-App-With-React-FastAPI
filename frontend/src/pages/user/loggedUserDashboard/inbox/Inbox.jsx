import { useState, useEffect } from "react";
import { getLocalStorageInboxData } from "../../utils/getLocalStorageInboxData";
import { useGetInboxQuery } from "../../api/useGetInboxQuery";
import { InboxCard } from "./InboxCard";
export const Inbox = () => {
  const inboxQuery = useGetInboxQuery();
  console.log(inboxQuery.data);
  if (inboxQuery.status === "error") {
    return <div>Error</div>;
  }
  if (inboxQuery.status === "loading") {
    <div>Loading...</div>;
  }
  return (
    <>
      <div className="card">
        <InboxCard messages={inboxQuery.data} />
      </div>
    </>
  );
};
