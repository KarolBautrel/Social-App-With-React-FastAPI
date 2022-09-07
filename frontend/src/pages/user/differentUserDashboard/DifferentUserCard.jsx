import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../../components/Modal";
import { MessageCreate } from "../messagesService/MessageCreate";
import { useParams } from "react-router-dom";
export const DifferentUserCard = ({ differentUser }) => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <div className=" grid grid-cols-2">
        <div className="col">{differentUser.username}</div>
        <div className="col">
          <div className="">
            <h1>Following: </h1>
            {differentUser &&
              differentUser.follower.map((post) => (
                <ul>
                  <li key={post.id}>{post.title}</li>
                </ul>
              ))}
          </div>
        </div>
      </div>
      <div className="row">
        {showMessageModal && (
          <Modal>
            <MessageCreate userId={id} />
          </Modal>
        )}
        <button
          className="ml-[35%] mt-5 btn-blue"
          onClick={() => {
            setShowMessageModal(true);
          }}
        >
          Send Message
        </button>
        <button className="ml-[35%] mt-5 btn-blue">
          Check Friends(deprecated)
        </button>
      </div>{" "}
    </>
  );
};
