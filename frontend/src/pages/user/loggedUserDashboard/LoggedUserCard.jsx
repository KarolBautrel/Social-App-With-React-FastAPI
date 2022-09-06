import { useState, useEffect } from "react";
import { Modal } from "../../../components/Modal";
import { ChangeEmail } from "../../auth/change_credentials/ChangeEmail";
import { ChangePassword } from "../../auth/change_credentials/ChangePassword";

export const LoggedUserCard = ({ userCredentials }) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showFollowingPostsModal, setShowFollowingPostsModal] = useState(false);

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setShowEmailModal(false);
    setShowFollowingPostsModal(true);
  };

  return (
    <>
      <div className=" grid grid-cols-2">
        <div className="col">{userCredentials.username}</div>
        <div className="col">
          <div className="">
            <h1>Following: </h1>
            {userCredentials &&
              userCredentials.follower.map((post) => (
                <ul>
                  <li key={post.id}>{post.title}</li>
                </ul>
              ))}
          </div>
        </div>
      </div>
      <div className="row">
        {showEmailModal && (
          <Modal handleCloseModal={handleCloseModal}>
            <ChangeEmail />
          </Modal>
        )}
        <button
          onClick={() => {
            setShowEmailModal(true);
          }}
          className="ml-[35%] mt-5 btn-blue"
        >
          Change Email
        </button>
        {showPasswordModal && (
          <Modal handleCloseModal={handleCloseModal}>
            <ChangePassword />
          </Modal>
        )}
        <button
          onClick={() => {
            setShowPasswordModal(true);
          }}
          className="ml-[35%] mt-5 btn-blue"
        >
          Change Password
        </button>

        <button className="ml-[35%] mt-5 btn-blue">
          Check Friends(deprecated)
        </button>
      </div>{" "}
    </>
  );
};
