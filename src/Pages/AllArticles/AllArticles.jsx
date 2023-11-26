// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../Components/Heading";
import premiumImg from "../../assets/images/premium.png";
import { useState } from "react";

const AllArticles = () => {
  const [search, setSearch] = useState("");
  const axiosPublic = useAxiosPublic();
  const { data: articles = [], refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/articles?search=${search}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();

    const searchText = e.target.search.value;
    setSearch(searchText);
    refetch();
  };

  return (
    <div>
      <Heading heading={`All Articles`}></Heading>

      <form onSubmit={handleSearch} className="flex justify-center pt-10">
        <input
          type="text"
          name="search"
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
                {item?.hashtags?.map((t, index) => (
                  <p key={index}>{t}</p>
                ))}
              </span>

              <div className="card-actions mt-5 justify-center">
                <Link to={`/allArticles/${item?._id}`}>
                  <Button title={`Details`}></Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
