// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../Components/Heading";
import premiumImg from "../../assets/images/premium.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const AllArticles = () => {
  const tagsData = [
    { value: "News", label: "#News" },
    { value: "BreakingNews", label: "#BreakingNews" },
    { value: "Headlines", label: "#Headlines" },
    { value: "Business", label: "#Business" },
    { value: "Politics", label: "#Politics" },
    { value: "Science", label: "#Science" },
    { value: "HealthNews", label: "#HealthNews" },
    { value: "Wellness", label: "#Wellness" },
    { value: "EntertainmentNews", label: "#EntertainmentNews" },
    { value: "Sports", label: "#Sports" },
  ];
  const [search, setSearch] = useState("");
  // const [tags, setTags] = useState("");
  const { user } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();
  const { data: articles = [], refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/articles?search=${search}`);
      return res.data;
    },
  });
  console.log(articles?.map((article) => article?.subscription));

  const { data: allUsers = [] } = useQuery({
    queryKey: ["premiumUser"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  const loggedInUser = allUsers?.find((User) => User?.email === user?.email);

  console.log("43", loggedInUser);
  // console.log(articles);

  const handleSearch = (e) => {
    e.preventDefault();

    refetch();
  };

  const handleViewCount = (id) => {
    axiosPublic
      .patch(`/articles/viewCount/${id}`)
      .then(() => {
        refetch();
      })
      .catch();
  };

  return (
    <div>
      <Heading heading={`All Articles`}></Heading>

      <form onSubmit={handleSearch} className="flex justify-center pt-10">
        <input
          type="text"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          className="w-72 relative text-main-blue-950 rounded-lg pl-5 py-1 font-bold border-2 border-[#4984e8] border-r-none focus:border-[#4984e8] outline-none"
          placeholder="Search Here..."
          required=""
        />
        <button
          type="submit"
          className="px-7 -ml-10 z-10 rounded-l-none font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]  ">
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 max-w-7xl lg:px-0 px-10 mx-auto">
        {articles?.map((item, idx) => (
          <div
            key={idx}
            className={`card card-compact mt-10 ${
              item?.subscription === "premium"
                ? "bg-[#160938] text-main-blue-50"
                : "bg-main-blue-50"
            }  rounded-xl shadow-xl`}>
            <figure className="relative">
              <img className="h-60  w-full" src={item?.image} alt="Shoes" />
            </figure>
            {item?.subscription === "premium" ? (
              <img
                className="absolute w-14 right-0 -mr-5 -mt-5"
                src={premiumImg}
                alt=""
              />
            ) : (
              ""
            )}

            <div className="card-body">
              <p className="font-bold">Publisher : {item?.publisher}</p>
              <h2
                className={`card-title font-extrabold ${
                  item?.subscription === "premium"
                    ? "text-main-blue-50"
                    : "text-[#100d2c]"
                } `}>
                {item?.title}
              </h2>
              <p
                className={`font-bold ${
                  item?.subscription === "premium"
                    ? "text-main-blue-50"
                    : "text-[#4b4b4b]"
                } `}>
                {item?.description.length > 100
                  ? item?.description.slice(0, 100)
                  : item?.description}
                ......
              </p>
              <span
                className={`font-bold ${
                  item?.subscription === "premium"
                    ? "text-main-blue-50"
                    : "text-[#100d2c]"
                } `}>
                {/* {item?.hashtags?.map((tag) => (
                  <h1>{tag.value}</h1>
                ))} */}
                {/* {item?.hashtags?.map((t) => (
                  <span>{t.value}</span>
                ))} */}
                {/* {item?.hashtags?.join(" ")} */}
                {item?.hashtags?.map((tag, idx) => (
                  <p key={idx}>{tag}</p>
                ))}
              </span>

              <div className="card-actions mt-5 justify-center">
                {item?.subscription === "premium" &&
                !loggedInUser?.premiumTaken ? (
                  <Link to={`/allArticles/${item?._id}`}>
                    <button
                      disabled
                      onClick={() => handleViewCount(item?._id)}
                      className={`  
                    px-7 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#979899] to-[#9094a0]  `}>
                      Details
                    </button>
                  </Link>
                ) : (
                  <Link to={`/allArticles/${item?._id}`}>
                    <button
                      onClick={() => handleViewCount(item?._id)}
                      className={`  
                    px-7 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]  `}>
                      Details
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
