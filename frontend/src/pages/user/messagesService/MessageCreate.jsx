import { useState } from "react";
import { postDirectMessage } from "../api/requests/postDirectMessage";
import { useNavigate } from "react-router-dom";
export const MessageCreate = ({ userId }) => {
  const [directMessageSubject, setDirectMessageSubject] = useState("");
  const [directMessageBody, setDirectMessageBody] = useState("");
  const redirect = useNavigate();
  const handleClick = async () => {
    const response = await postDirectMessage(
      userId,
      directMessageSubject,
      directMessageBody
    );
    if (response == 200) {
      redirect(`user/${userId}`);
    }
  };
  return (
    <div>
      <h2 style={{ marginLeft: "46%" }}>Register</h2>
      <form className="card">
        <input
          className="register-form"
          value={directMessageSubject}
          placeholder="Subject"
          onChange={(e) => {
            setDirectMessageSubject(e.target.value);
          }}
        />
        <textarea
          className="register-form"
          placeholder="Your Message"
          value={directMessageBody}
          onChange={(e) => {
            setDirectMessageBody(e.target.value);
          }}
        />
      </form>

      <button className="button" onClick={handleClick}>
        Send Message
      </button>
    </div>
  );
};
