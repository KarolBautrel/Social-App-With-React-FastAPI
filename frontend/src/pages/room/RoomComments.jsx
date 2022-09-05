import React from "react";
import { Link } from "react-router-dom";
export const RoomComments = ({ roomQuery }) => {
  console.log(roomQuery);
  return (
    <div className="chat-container">
      {roomQuery.comments.map((comment) => (
        <div key={comment.id}>
          <ul>
            <Link to={`user/${comment.comment_creator.id}`} replace>
              <h1 className="font-bold font-sans">
                {comment.comment_creator.username}:
              </h1>
            </Link>
            <li>{comment.body}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};
