import React from "react";

export const MessageCard = ({ message }) => {
  console.log(message);
  return (
    <div className="card">
      {message ? (
        <>
          <h1>{message.creator.username}</h1>
          <h1>{message.subject}</h1>
          <h1>{message.body}</h1>
          <div className="flex">
            <button className="m-5 btn-blue">Answer</button>
            <button className="m-5 btn-blue">Mark as readed</button>
            <button className="m-5 btn-blue">Delete</button>
          </div>
        </>
      ) : (
        <div>Loader inc... </div>
      )}
    </div>
  );
};
