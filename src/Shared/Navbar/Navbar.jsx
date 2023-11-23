import { Link, NavLink } from "react-router-dom";
import Button from "../../Components/Button";

const Navbar = () => {
  const links = (
    <>
      <li className="font-bold">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-500  " : ""
          }>
          Home
        </NavLink>
      </li>
      <li className="font-bold">
        <NavLink
          to="/addArticles"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-blue-500 underline shadow-lg"
              : ""
          }>
          Add Articles
        </NavLink>
      </li>
      <li className="font-bold">
        <NavLink
          to="/allArticles"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-500  " : ""
          }>
          All Articles
        </NavLink>
      </li>
      <li className="font-bold">
        <NavLink
          to="/subscription"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-500  " : ""
          }>
          Subscription
        </NavLink>
      </li>
      <li className="font-bold">
        <NavLink
          to="/myArticles"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-500  " : ""
          }>
          My Articles
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar lg:px-16  h-20 mb-5">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {links}
            </ul>
          </div>
          <Link className="flex items-center" to="/">
            <img src="/logo2.png" className="w-20 " alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-5 cursor-pointer">{links}</ul>
        </div>
        <div className="navbar-end gap-5">
          <Button title="Login"></Button>
          <Button title="Register"></Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
