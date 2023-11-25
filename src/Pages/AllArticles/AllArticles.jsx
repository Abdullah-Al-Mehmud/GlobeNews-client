// import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {articles?.map((item, idx) => (
          <div key={idx} className="card card-compact  bg-base-100 shadow-xl">
            <figure>
              <img className="h-60 w-full" src={item?.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <p>{item?.publisher}</p>
              <h2 className="card-title">{item?.title}</h2>
              <p>
                {item?.description.length > 100
                  ? item?.description.slice(0, 100)
                  : item?.description}
                ......
              </p>
              <span>
                {item?.hashtags?.map((t, index) => (
                  <p key={index}>{t}</p>
                ))}
              </span>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
