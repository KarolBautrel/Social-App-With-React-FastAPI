import React from "react";

export const LoggedUserCard = ({ userCredentials }) => {
  console.log(userCredentials);
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
        <button className="ml-[35%] mt-5 btn-blue">Change Password</button>
        <button className="ml-[35%] mt-5 btn-blue">Change Email</button>
        <button className="ml-[35%] mt-5 btn-blue">Check followed Posts</button>
        <button className="ml-[35%] mt-5 btn-blue">
          Check Friends(deprecated)
        </button>
      </div>{" "}
    </>
  );
};
