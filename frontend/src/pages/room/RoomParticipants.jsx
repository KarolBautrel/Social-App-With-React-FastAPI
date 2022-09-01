import React from "react";

export const RoomParticipants = ({ roomQuery }) => {
  return (
    <div className="chat-container">
      {roomQuery.participants.map((participant) => (
        <div key={participant.id}>
          <ul>
            <li>
              {participant.username === roomQuery.creator.username
                ? participant.username + "(Owner)"
                : participant.username}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};
