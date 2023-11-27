import { NavLink } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex h-auto">
      <div className="w-64 min-h-full bg-main-blue-500 text-main-blue-50">
        <ul className="menu text-lg p-4">
          <li>
            <NavLink className=" font-bold " to="/dashboard/adminHome">
              {/* <FiHom /> */}
              Admin Home
            </NavLink>
          </li>
          <li>
            <NavLink className=" font-bold " to="/dashboard/allArticles">
              {/* <ImSpoonKnife /> */}
              All Articles
            </NavLink>
          </li>

          <li>
            <NavLink className=" font-bold " to="/dashboard/allUsers">
              <FaUsers />
              All Users
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 bg-main-blue-100"></div>
    </div>
  );
};

export default Dashboard;
