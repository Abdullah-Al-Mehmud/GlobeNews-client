import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllArticlesAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { data: articles = [] } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles");
      return res.data;
    },
  });
  return (
    <div>
      {articles?.map((article) => (
        <p>{article.title}</p>
      ))}
    </div>
  );
};

export default AllArticlesAdmin;
