import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logout } from "../pages/auth/logout/Logout";
export const Navbar = () => {
  const { username } = useSelector((state) => state.auth);
  console.log(username);
  return (
    <nav className="navbar-background ">
      <div className="flex">
        <div className="m-3">
          <Link className="text-3xl" to="/">
            Home
          </Link>
        </div>
        {!username ? (
          <>
            <div className="m-3 ">
              <Link className="btn-pink-yellow" to="/login">
                Login
              </Link>
            </div>
            <div className="m-3 ">
              <Link className="btn-pink-yellow" to="/register">
                Signup
              </Link>
            </div>{" "}
          </>
        ) : (
          <div className="flex">
            <div className="m-5">
              <Link className="btn-pink-yellow" to="/me">
                Profile
              </Link>
            </div>
            <div className="m-3 ">
              <Logout />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
