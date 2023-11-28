import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddPublisher = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const publisher = {
      name: data.name,
      image: data.image,
    };
    axiosSecure.post("/publishers", publisher).then((res) => {
      if (res.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Article has been added",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    });
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex  gap-5 ">
          <div className="md:w-1/2">
            <input
              type="text"
              {...register("image", { required: true })}
              placeholder="Image"
              className="input input-bordered border-2 border-main-blue-300 rounded-lg w-full "
            />
          </div>
          <div className="md:w-1/2">
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Publisher Name"
              className="input input-bordered border-2 border-main-blue-300 rounded-lg w-full "
            />
          </div>
        </div>
        <div>
          <button className="px-7 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]  ">
            Add Publisher
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPublisher;
