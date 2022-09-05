import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logout } from "../pages/auth/logout/Logout";
import { Searchbar } from "./Searchbar";
import { FaEnvelope } from "react-icons/fa";
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
        <div className="m-3">
          <Searchbar />
        </div>
        {!username ? (
          <div className="ml-[60%] flex">
            <div className="m-3 ">
              <Link className="btn-navbar" to="/login">
                Login
              </Link>
            </div>
            <div className="m-3 ">
              <Link className="btn-navbar" to="/register">
                Signup
              </Link>
            </div>{" "}
          </div>
        ) : (
          <div className="ml-[60%] flex">
            <div className="m-5">
              <Link className="btn-navbar" to="/me">
                Profile
              </Link>
            </div>
            <div className="m-3 ">
              <Logout />
            </div>
            <div className="m-3 ">
              <Link className="btn-navbar" to="/inbox">
                <FaEnvelope />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
