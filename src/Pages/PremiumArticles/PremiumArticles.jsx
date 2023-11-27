import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import premiumImg from "../../assets/images/premium.png";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";

const PremiumArticles = () => {
  const axiosPublic = useAxiosPublic();
  const { data: articles = [] } = useQuery({
    queryKey: ["premium-articles"],
    queryFn: async () => {
      const res = await axiosPublic.get("/articles");
      return res.data;
    },
  });
  const premiumArticles = articles.filter(
    (article) => article?.subscription === "premium"
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 max-w-7xl lg:px-0 px-10 mx-auto">
      {premiumArticles?.map((item) => (
        <div
          key={item?._id}
          className={`card card-compact mt-10 bg-[#160938] text-main-blue-50  rounded-xl shadow-xl`}>
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
            <h2 className={`card-title font-extrabold text-main-blue-50 `}>
              {item?.title}
            </h2>
            <p className={`font-bold text-main-blue-50 `}>
              {item?.description.length > 100
                ? item?.description.slice(0, 100)
                : item?.description}
              ......
            </p>
            <span className={`font-bold text-main-blue-50`}>
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
  );
};

export default PremiumArticles;
