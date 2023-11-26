import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Heading from "../../Components/Heading";

const MyArticles = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: articles } = useQuery({
    queryKey: ["my-articles"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/articles?authorEmail=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <Heading heading={`My Articles`}></Heading>
      <div className="max-w-6xl mx-auto">
        <div className="overflow-x-auto">
          <table className="table bg-main-blue-950 text-main-blue-50 table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-main-blue-50">Name</th>
                <th className="text-main-blue-50">Job</th>
                <th className="text-main-blue-50">Status</th>
                <th className="text-main-blue-50">isPremium</th>
              </tr>
            </thead>
            <tbody>
              {articles?.map((item, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{item?.authorEmail}</td>
                  <td>{item?.title}</td>
                  <td>{item?.status}</td>
                  <td>{item?.subscription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* {articles?.map((item, idx) => (
          <p key={idx}>{item?.authorName}</p>
        ))} */}
      </div>
    </div>
  );
};

export default MyArticles;
