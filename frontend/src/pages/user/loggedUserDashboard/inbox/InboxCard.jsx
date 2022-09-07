import { useNavigate } from "react-router-dom";

export const InboxCard = ({ messages }) => {
  const navigate = useNavigate();
  return (
    <div>
      {messages &&
        messages.messages.map((message) => (
          <div className="row">
            Message from: {message.creator.username}
            <h1
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/message/${message.id}`, { replace: true });
              }}
            >
              {message.subject}
            </h1>
            {message.is_readed ? (
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
