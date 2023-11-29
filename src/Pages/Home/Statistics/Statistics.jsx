import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import CountUp from "react-countup";
import Heading from "../../../Components/Heading";

const Statistics = () => {
  const axiosPublic = useAxiosPublic();
  const { data: users = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  const premiumUser = users.filter((user) => user?.isPremium === "yes");
  const normalUser = users.filter((user) => user?.isPremium === "no");
  return (
    <div>
      {/* react count up section for the user , premium user and the all users statics section  */}
      <Heading heading={`User Statics`}></Heading>
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-5 justify-center">
          <div className="bg-[#9c6da7] rounded-2xl text-main-blue-50 px-20 py-5">
            <p className="font-bold text-3xl">
              All Users
              <p className="text-center mt-2">
                <CountUp end={users.length} />
              </p>
            </p>
          </div>
          <div className="bg-[#fac635] rounded-2xl text-main-blue-50 px-10 py-5">
            <p className="font-bold text-3xl">
              Premium Users
              <p className="text-center mt-2">
                <CountUp end={premiumUser.length} />
              </p>
            </p>
          </div>
          <div className="bg-[#4cd137] rounded-2xl text-main-blue-50 px-10 py-5">
            <p className="font-bold text-3xl">
              Normal Users
              <p className="text-center mt-2">
                <CountUp end={normalUser.length} />
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
