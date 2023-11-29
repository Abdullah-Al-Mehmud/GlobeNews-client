import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (id) => {
    axiosSecure.patch(`/users/${id}`).then((res) => {
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
        axiosSecure.delete(`/users/${id}`).then((res) => {
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
      <div className="overflow-x-auto">
        <table className="table bg-[#250f5e] text-main-blue-50">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="text-main-blue-50">Image</th>
              <th className="text-main-blue-50">Name</th>
              <th className="text-main-blue-50">Email </th>
              <th className="text-main-blue-50">Role</th>
              <th className="text-main-blue-50">Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user?._id}>
                <th>
                  <th>
                    <RiDeleteBin6Line
                      onClick={() => handleDelete(user?._id)}
                      size={23}
                      className="text-[#ff3131] cursor-pointer"
                    />
                  </th>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user?.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {user?.name}
                  <br />
                </td>
                <td>{user?.email}</td>
                <th>{user?.role === "admin" ? "Admin" : "User"}</th>

                <th>
                  {user?.role === "user" ? (
                    <button
                      onClick={() => handleMakeAdmin(user?._id)}
                      className="px-5 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]">
                      Make Admin
                    </button>
                  ) : (
                    ""
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
