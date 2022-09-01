import React from "react";

export const RoomComments = ({ roomQuery }) => {
  console.log(roomQuery);
  return (
    <div className="chat-container">
      {roomQuery.comments.map((comment) => (
        <div key={comment.id}>
          <ul>
            <h1 className="font-bold font-sans">
              {comment.comment_creator.username}:
            </h1>
            <li>{comment.body}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};
