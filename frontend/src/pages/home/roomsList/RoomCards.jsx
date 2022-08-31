import { Link } from "react-router-dom";

export const RoomCards = ({ roomListQuery }) => {
  console.log(roomListQuery);
  return (
    <div className="ml-10 w-full h-full sm:h-full">
      <h3 className=" ml-5 font-semibold text-slate-600 text-3xl"> Rooms </h3>
      {roomListQuery.map((room) => (
        <div
          className={`${room.topics.topic_name.toLowerCase()}-card`}
          key={room.id}
        >
          <h3 className="ml-[30%] font-semibold text-slate-600 text-xl ">
            {room.title}
          </h3>
          <h3 className="ml-[5%] font-medium text-slate-900">
            {room.topics.topic_name}
          </h3>
          <div className="flex ">
            <h3 className="ml-[5%] font-medium text-slate-900">{room.body}</h3>
            <button className="ml-[25%] ">
              <Link to={`room/${room.id}`}> Get to the Room </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

//{`${room.topics.topic_name.toLowerCase()}-card`}
