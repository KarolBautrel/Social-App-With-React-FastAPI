import React from "react";

export const DifferentUserCard = ({ differenUser }) => {
  return (
    <>
      <div className=" grid grid-cols-2">
        <div className="col">{differenUser.username}</div>
        <div className="col">
          <div className="">
            <h1>Following: </h1>
            {differenUser &&
              differenUser.follower.map((post) => (
                <ul>
                  <li key={post.id}>{post.title}</li>
                </ul>
              ))}
          </div>
        </div>
      </div>
      <div className="row">
        <button className="ml-[35%] mt-5 btn-blue">Send Message</button>

        <button className="ml-[35%] mt-5 btn-blue">
          Check Friends(deprecated)
        </button>
      </div>{" "}
    </>
  );
};
