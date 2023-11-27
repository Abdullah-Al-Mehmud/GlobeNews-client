import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Heading from "../../Components/Heading";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyArticles = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: articles, refetch } = useQuery({
    queryKey: ["my-articles", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/articles?authorEmail=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/articles/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.success) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <Heading heading={`My Articles`}></Heading>
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto">
          <table className="table bg-[#160938] text-main-blue-50 ">
            {/* head */}
            <thead>
              <tr>
                <th className="text-main-blue-50">Delete</th>
                <th className="text-main-blue-50">Serial No</th>
                <th className="text-main-blue-50">Title</th>
                <th className="text-main-blue-50">Details</th>
                <th className="text-main-blue-50">Status</th>
                {articles?.map((item, idx) =>
                  item?.status === "declined" ? (
                    <th key={idx} className={`text-main-blue-50`}>
                      Admin Message
                    </th>
                  ) : (
                    ""
                  )
                )}
                <th className="text-main-blue-50">isPremium</th>
                <th className="text-main-blue-50">Edit</th>
              </tr>
            </thead>
            <tbody>
              {articles?.map((item, idx) => (
                <tr key={idx}>
                  <th>
                    <label>
                      <RiDeleteBin6Line
                        onClick={() => handleDelete(item?._id)}
                        size={23}
                        className="text-[#ff3131] cursor-pointer"
                      />
                    </label>
                  </th>
                  <th>{idx + 1}</th>
                  <td>{item?.title}</td>
                  <td>
                    <Link to={`/allArticles/${item?._id}`}>
                      <button className="px-5 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd] ">
                        Details
                      </button>
                    </Link>
                  </td>

                  <td>
                    <p> {item?.status}</p>
                  </td>

                  {item?.status === "declined" ? (
                    <td>
                      <button className="px-5 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd] ">
                        Declined Message
                      </button>
                    </td>
                  ) : (
                    ""
                  )}

                  <td>{item?.subscription === "premium" ? "Yes" : "No"}</td>
                  <th>
                    <label>
                      <Link to={`/updateArticle/${item?._id}`}>
                        <FaEdit
                          // onClick={() => handleUpdate(item)}
                          size={23}
                          className="cursor-pointer text-[#40d148]"
                        />
                      </Link>
                    </label>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyArticles;
