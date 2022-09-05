import React from "react";

export const InboxCard = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <div className="row">
          Message from: {message.message_creator}
          <h1>{message.message_body}</h1>
          {message.message_status ? (
            <h2>Checkbox Mark as readed</h2>
          ) : (
            <h2>Status: Readed</h2>
          )}
          <br />
        </div>
      ))}
    </div>
  );
};
