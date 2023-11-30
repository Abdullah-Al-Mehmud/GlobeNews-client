import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import Heading from "../../../Components/Heading";

const TrendingArticles = () => {
  const axiosPublic = useAxiosPublic();
  const { data: trending = [], isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const res = await axiosPublic.get("/articles?trending=true");
      return res.data;
    },
  });
  console.log(trending);
  {
    /* <div>{!isLoading && trending?.map((trend) => <p>{trend?.title}</p>)}</div> */
  }
  return (
    <div className="mt-20 ">
      <Heading heading={`Trending Articles`}></Heading>
      <Swiper
        slidesPerView={3}
        spaceBetween={40}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
        {!isLoading &&
          trending?.map((article) => (
            <SwiperSlide key={article._id}>
              <div>
                <div
                  className={
                    article?.subscription
                      ? `bg-red-100 card`
                      : `card bg-green-100`
                  }>
                  <figure className=" h-[350px] w-full">
                    <img src={article?.image} className="h-60" alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-lg">{article?.title}</h2>
                    <p>
                      {article?.description.length > 50
                        ? article?.description.slice(0, 50)
                        : article?.description}
                      ......
                    </p>
                    <p>{article?.publisher}</p>
                    <p className="">
                      {article?.hashtags?.map((tag, idx) => (
                        <p key={idx}>{tag}</p>
                      ))}
                    </p>
                    <p className="text-lg font-medium">
                      Total Views :{" "}
                      <span className="text-xl font-bold">
                        {article?.viewCount}
                      </span>
                    </p>

                    <div className="card-actions justify-center my-5">
                      <button className="px-7 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd] ">
                        <Link to={`/allArticles/${article?._id}`}>
                          View Details
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TrendingArticles;
