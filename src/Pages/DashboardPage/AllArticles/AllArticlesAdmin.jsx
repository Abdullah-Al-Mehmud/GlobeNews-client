import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import moment from "moment/moment";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useState } from "react";

const AllArticlesAdmin = () => {
  const [message, setMessage] = useState("");
  const axiosSecure = useAxiosSecure();
  const { data: articles = [], refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles/admin/allArticles");
      return res.data;
    },
  });

  const handleStatus = (id) => {
    axiosSecure.patch(`/articles/admin/${id}`).then((res) => {
      if (res.data) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handlePremium = (id) => {
    axiosSecure.patch(`/articles/admin/premium/${id}`).then((res) => {
      if (res.data) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

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
        axiosSecure.delete(`/articles/admin/${id}`).then((res) => {
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

  // const { register, handleSubmit } = useForm();
  // const onSubmit = (data) => {
  //   console.log(data);
  //   const message = {
  //     reason: data.reason,
  //   };
  //   console.log(message);
  // };

  const handleMessage = (id) => {
    // console.log(id, message);
    const feedback = { message };
    console.log(id, feedback);
    axiosSecure.post(`/feedback/${id}`, feedback).then((res) => {
      if (res.data.success) {
        refetch();
        Swal.fire({
          position: "top-right",
          icon: "success",
          title: "Message Send",
          showConfirmButton: false,
          timer: 1500,
        });
        axiosSecure.patch(`/articles/admin/decline/${id}`).then((res) => {
          console.log(res.data);
          refetch();
        });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table bg-[#250f5e] text-main-blue-50">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox text-main-blue-50"
                  />
                </label>
              </th>
              <th className="text-main-blue-50">Serial no</th>
              <th className="text-main-blue-50">Author</th>
              <th className="text-main-blue-50">Title</th>
              <th className="text-main-blue-50">Posted Date</th>
              <th className="text-main-blue-50">Publisher</th>
              <th className="text-main-blue-50">isPremium</th>
              <th className="text-main-blue-50">Status</th>

              <th className="text-main-blue-50">Decline</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {articles?.map((article, idx) => {
              const formattedDate = moment(article?.postedDate).format(
                "MM/DD/YYYY"
              );
              return (
                <tr key={article?._id}>
                  <th>
                    <RiDeleteBin6Line
                      onClick={() => handleDelete(article?._id)}
                      size={23}
                      className="text-[#ff3131] cursor-pointer"
                    />
                  </th>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={article?.authorImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-main-blue-50">
                          {article?.authorName}
                        </div>
                        <div className="text-sm opacity-50">
                          {article?.authorEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {article?.title}
                    <br />
                  </td>
                  <td>{formattedDate}</td>
                  <td>{article?.publisher}</td>
                  <td>
                    {article?.subscription === "premium" ? (
                      "Premium"
                    ) : (
                      <button
                        onClick={() => handlePremium(article?._id)}
                        className="w-20 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]">
                        Make Premium
                      </button>
                    )}
                  </td>
                  <td>
                    {article?.status === "active" ? (
                      "Approved"
                    ) : (
                      <button
                        onClick={() => handleStatus(article?._id)}
                        className="w-20 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]">
                        Approve Article
                      </button>
                    )}
                  </td>
                  <th>
                    <button
                      className=" w-20 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#e75050] to-[#dd3333]"
                      onClick={() =>
                        document.getElementById(article?._id).showModal()
                      }>
                      Declined
                    </button>
                    <dialog id={article?._id} className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-main-blue-950 text-lg">
                          Reason for Decline
                        </h3>

                        <input
                          type="text"
                          // {...register("reason", { required: true })}
                          name="reason"
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Reason...."
                          className="input mt-4 input-bordered border-2 text-main-blue-950 border-main-blue-300 rounded-lg w-full "
                        />
                        <button
                          // type="submit"
                          onClick={() => handleMessage(article?._id)}
                          className=" px-6 mt-5 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#e75050] to-[#dd3333]">
                          Send
                        </button>

                        <p className="py-4 text-main-blue-950">
                          Press ESC key or click outside to close
                        </p>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllArticlesAdmin;
