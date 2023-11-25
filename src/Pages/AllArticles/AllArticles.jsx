// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../Components/Heading";

const AllArticles = () => {
  const axiosPublic = useAxiosPublic();
  const { data: articles = [] } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosPublic.get("/articles");
      return res.data;
    },
  });
  // const approved = data.filter((item) => item?.status === "approved");
  return (
    <div>
      <Heading heading={`All Articles`}></Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {articles?.map((item, idx) => (
          <div
            key={idx}
            className="card card-compact  bg-base-100 rounded-xl shadow-xl">
            <figure>
              <img className="h-60 w-full" src={item?.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <p className="font-bold">Publisher : {item?.publisher}</p>
              <h2 className="card-title font-extrabold text-[#100d2c]">
                {item?.title}
              </h2>
              <p className="font-bold text-[#4b4b4b]">
                {item?.description.length > 100
                  ? item?.description.slice(0, 100)
                  : item?.description}
                ......
              </p>
              <span className="font-bold text-[#100d2c]">
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
