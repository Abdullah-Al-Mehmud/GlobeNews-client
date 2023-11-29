import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Heading from "../../../Components/Heading";

const AllPublishers = () => {
  const axiosPublic = useAxiosPublic();
  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
    },
  });
  return (
    <div>
      <div className="mt-10">
        <Heading heading={`Publishers`}></Heading>
      </div>
      <div className="grid lg:grid-cols-3 px-5 md:grid-cols-2 gap-5">
        {publishers?.map((publisher) => (
          <div
            key={publisher?._id}
            className="card rounded-2xl bg-main-blue-950 text-main-blue-50 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={publisher?.image}
                alt="Shoes"
                className="rounded-xl h-60"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{publisher?.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPublishers;
