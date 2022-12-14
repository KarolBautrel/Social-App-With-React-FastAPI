import { Link } from "react-router-dom";

export const RecentCommentsCard = ({ recentCommentsQuery }) => {
  console.log(recentCommentsQuery);
  return (
    <div className="mr-5">
      <p className=" ml-5 font-semibold text-slate-600 text-3xl">
        Recent Comments
      </p>
      {recentCommentsQuery.map((comment) => (
        <div className="comment-card " key={comment.id}>
          <Link to={`user/${comment.comment_creator.id}`} replace="true">
            <h3 className="ml-[5%] font-semibold text-slate-600 text-xl">
              {comment.comment_creator.username.charAt(0).toUpperCase() +
                comment.comment_creator.username.slice(1)}{" "}
              to: {comment.commented_post.title}
            </h3>
          </Link>
          <h3 className="ml-[5%] font-medium text-slate-700">
            {comment.body.substring(0, 9)}
            <Link
              className=" hover:text-slate-300"
              to={`/room/${comment.commented_post.id}`}
            >
              ...click for more
            </Link>
          </h3>
          <h3 className="font-medium"></h3>
        </div>
      ))}
    </div>
  );
};
