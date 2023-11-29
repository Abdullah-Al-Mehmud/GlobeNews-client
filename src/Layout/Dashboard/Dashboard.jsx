import { NavLink, Outlet } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { RiArticleFill } from "react-icons/ri";
import Navbar from "../../Shared/Navbar/Navbar";

const Dashboard = () => {
  return (
    <>
      <div className="flex h-auto">
        <div className="w-64 min-h-full bg-main-blue-400 text-main-blue-50">
          <ul className="menu text-lg mb-5 p-4">
            <li>
              <NavLink className=" font-bold " to="/dashboard/adminHome">
                {/* <IoMdHome /> */}
                Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink className=" font-bold " to="/dashboard/allArticles">
                <RiArticleFill />
                All Articles
              </NavLink>
            </li>

            <li>
              <NavLink className=" font-bold " to="/dashboard/allUsers">
                <FaUsers />
                All Users
              </NavLink>
            </li>
            <li>
              <NavLink className=" font-bold " to="/dashboard/addPublisher">
                <IoPersonAdd />
                Add Publisher
              </NavLink>
            </li>
            <div className="divider"></div>
            <li>
              <NavLink className=" font-bold " to="/">
                Home Page
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1 bg-main-blue-100">
          <div>
            <Navbar></Navbar>
          </div>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
