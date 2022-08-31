import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="border-b-2 border-slate-300 hover:border-indigo-300 bg-zinc-100 ">
      <div className="flex">
        <div className="m-3">
          <Link className="text-3xl" to="/">
            Home
          </Link>
        </div>
        <div className="m-3 ml-[85%] rounded-md bg-zinc-300 hover:bg-zinc-600">
          <Link className="p-3 text-2xl" to="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};
