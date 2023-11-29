import BarChart from "./BarChart/BarChart";
import LineChart from "./BarChart/LineChart/LineChart";
import PieChart from "./PieChart/PieChart";

const AdminHome = () => {
  return (
    <div>
      <PieChart></PieChart>
      <div className="flex">
        <div className="w-full"> {/* <BarChart></BarChart>{" "} */}</div>
        <div>
          {" "}
          <LineChart></LineChart>{" "}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
