import Lottie from "react-lottie";
import animationData from "../../assets/images/addArticle.json";

import { useForm } from "react-hook-form";
import Select from "react-select";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddArticles = () => {
  const tagsData = [
    { value: "#News", label: "#News" },
    { value: "#BreakingNews", label: "#BreakingNews" },
    { value: "#Headlines", label: "#Headlines" },
    { value: "#Business", label: "#Business" },
    { value: "#Politics", label: "#Politics" },
    { value: "#Science", label: "#Science" },
    { value: "#HealthNews", label: "#HealthNews" },
    { value: "#Wellness", label: "#Wellness" },
    { value: "#EntertainmentNews", label: "#EntertainmentNews" },
    { value: "#Sports", label: "#Sports" },
  ];

  const { user } = useContext(AuthContext);
  console.log(user);

  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, setValue, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // upload image to imagebb

    const imageFile = { image: data.image[0] };
    axiosPublic
      .post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        const articles = {
          title: data.title,
          publisher: data.publisher,
          hashtags: data.hashtags?.map((tag) => tag?.value),
          description: data.description,
          image: res?.data?.data?.display_url,
          status: "active",
          subscription: "local",
          authorName: user?.displayName,
          authorEmail: user?.email,
          authorImage: user?.photoURL,
        };
        axios
          .post("http://localhost:3000/articles", articles)
          .then((result) => {
            if (result.data.success) {
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
      });
  };
  return (
    <div className="md:flex justify-center px-10 items-center ">
      {/* img */}
      <div className="w-full">
        <Lottie options={{ loop: true, autoplay: true, animationData }} />
      </div>
      {/* form */}
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <div className="md:flex  gap-5 ">
            <div className="md:w-1/2">
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="Title"
                className="input input-bordered border-2 border-main-blue-300 rounded-lg w-full "
              />
            </div>

            <div className="md:w-1/2">
              <select
                {...register("publisher", { required: true })}
                className="select select-bordered border-2 border-main-blue-300 rounded-lg w-full ">
                <option disabled defaultValue>
                  Choose Publisher
                </option>
                <option>Business Insights</option>
                <option>Green Horizon</option>
                <option>Political Spectrum</option>
                <option>Healthy Living</option>
                <option>Scientific Endeavors</option>
                <option>Global Insight</option>
                <option>Sports Chronicles</option>
              </select>
            </div>
          </div>

          <div className="md:flex mt-4 gap-5 ">
            <div className="md:w-full">
              <Select
                {...register("hashtags", { required: true })}
                defaultValue={[tagsData[4], tagsData[7]]}
                isMulti
                // name="colors"
                onChange={(selectedOptions) => {
                  setValue("hashtags", selectedOptions);
                }}
                options={tagsData}
                className=" border-2  border-main-blue-300 rounded-lg"
                classNamePrefix="select"
              />
            </div>
          </div>

          {/* description */}
          <div className="md:flex mt-4  gap-10 ">
            <div className="md:w-full">
              <textarea
                placeholder="Description"
                className="input py-2 h-40 input-bordered w-full border-2 border-main-blue-300 rounded-lg"
                {...register("description", { required: true })}
              />
            </div>
          </div>
          {/* Photo input */}
          <div className="mt-5">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input border-2  border-main-blue-300 rounded-lg w-full max-w-xs"
            />
          </div>
          <div className="mt-5">
            <input
              type="submit"
              value="Add Article"
              className="btn mb-10 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]  text-[white] text-lg font-bold btn-block"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticles;
