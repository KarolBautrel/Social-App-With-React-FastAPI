import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const RoomCommentCreateForm = () => {
  const [comment, setCommentForm] = useState("");
  return (
    <div>
      <form>
        <textarea
          className="chat-textarea"
          value={comment}
          onChange={(e) => {
            setCommentForm(e.target.value);
          }}
        />
      </form>
      <p>{comment}</p>
    </div>
  );
};
