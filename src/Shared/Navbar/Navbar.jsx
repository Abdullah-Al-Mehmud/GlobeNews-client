import { Link, NavLink } from "react-router-dom";
import Button from "../../Components/Button";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import defaultProfile from "../../assets/images/user.png";
import useAdmin from "../../Hooks/useAdmin";
import usePremium from "../../Hooks/usePremium";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isPremium] = usePremium();

  const links = (
    <>
      <li className="font-bold">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-main-blue-500   " : ""
          }>
          Home
        </NavLink>
      </li>

      {user && isAdmin ? (
        <li className="font-bold">
          <NavLink
            to="/dashboard/adminHome"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-main-blue-500   " : ""
            }>
            Dashboard
          </NavLink>
        </li>
      ) : (
        ""
      )}

      <div className="lg:flex gap-5">
        <li className="font-bold">
          <NavLink
            to="/addArticles"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-main-blue-500  " : ""
            }>
            Add Articles
          </NavLink>
        </li>
        <li className="font-bold">
          <NavLink
            to="/allArticles"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-main-blue-500 " : ""
            }>
            All Articles
          </NavLink>
        </li>
        <li className="font-bold">
          <NavLink
            to="/subscription"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-main-blue-500   " : ""
            }>
            Subscription
          </NavLink>
        </li>

        {user && isPremium ? (
          <li className="font-bold">
            <NavLink
              to="/premiumArticles"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-main-blue-500   " : ""
              }>
              Premium Articles
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {user ? (
          <li className="font-bold">
            <NavLink
              to="/myArticles"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-main-blue-500   " : ""
              }>
              My Articles
            </NavLink>
          </li>
        ) : (
          ""
        )}
      </div>
    </>
  );

  const handleLogOut = () => {
    logOutUser().then().catch();
  };

  // console.log(user);
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
          {user ? (
            <div className="dropdown dropdown-end ">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user ? user?.photoURL : defaultProfile}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between ">{user?.displayName}</a>
                </li>
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>

                <li>
                  <a onClick={handleLogOut}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-5">
              <Link to="/login">
                <Button title={`Login`}></Button>
              </Link>
              <Link to="/register">
                <Button title={`Register`}></Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
