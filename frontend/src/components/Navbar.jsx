import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar-background ">
      <div className="flex">
        <div className="m-3">
          <Link className="text-3xl" to="/">
            Home
          </Link>
        </div>
        <div className="m-3 ml-[85%] rounded-md bg-gradient-to-r from-pink-500 hover:to-yellow-500">
          <Link className="p-3 text-2xl" to="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};
