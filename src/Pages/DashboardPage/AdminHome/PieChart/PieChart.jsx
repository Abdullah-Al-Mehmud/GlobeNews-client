import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Chart } from "react-google-charts";

const PieChart = () => {
  const axiosSecure = useAxiosSecure();
  // publishers
  const { data: publishers = [] } = useQuery({
    queryKey: ["publications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  // articles
  const { data: articles = [] } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles");
      return res.data;
    },
  });

  const chartData = [["Publication", "Percentage"]].concat(
    publishers.map((publication) => [
      publication.name,
      (articles.filter((article) => article.publisher === publication.name)
        .length /
        articles.length) *
        100,
    ])
  );
  return (
    <Chart
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        title: "Article Distribution by Publication",
        is3D: true,
        titleTextStyle: {
          fontSize: 32,
          fontWeight: "bold",
        },
        width: "100%",
        height: "500px",
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
};

export default PieChart;
