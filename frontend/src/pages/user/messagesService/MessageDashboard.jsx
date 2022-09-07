import { useState, useEffect } from "react";
import { MessageCard } from "./MessageCard";
import { useParams } from "react-router-dom";
import { getDirectMessage } from "../api/requests/getDirectMessage";
export const MessageDashboard = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const getMessage = async () => {
    const data = await getDirectMessage(id);
    setMessage(data);
  };
  useEffect(() => {
    getMessage();
  }, []);
  return (
    <div>
      <MessageCard message={message} />
    </div>
  );
};
