import { useState, useEffect } from "react";
import { getLocalStorageInboxData } from "../../utils/getLocalStorageInboxData";
import { InboxCard } from "./InboxCard";
export const Inbox = () => {
  const [inboxData, setInboxData] = useState("");

  useEffect(() => {
    const data = getLocalStorageInboxData();
    setInboxData(data);
    console.log(inboxData);
  }, []);
  return (
    <>
      {inboxData ? (
        <div className="card">
          <InboxCard messages={inboxData} />
        </div>
      ) : (
        <div>Loading..</div>
      )}
    </>
  );
};
