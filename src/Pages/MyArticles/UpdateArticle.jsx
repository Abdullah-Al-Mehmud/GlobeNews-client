import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Select from "react-select";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateArticle = () => {
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
  const axiosPublic = useAxiosPublic();
  const { _id, title, publisher, hashtags, description } = useLoaderData();

  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    const imageFile = { image: data.image[0] };
    let res;
    if (imageFile.image) {
      res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
    }
    const articles = {
      title: data.title,
      publisher: data.publisher,
      hashtags: data.hashtags,
      description: data.description,
    };
    if (imageFile.image) {
      articles.image = res?.data?.data?.display_url;
    }
    const articleRes = await axiosPublic.put(`/articles/${_id}`, articles);
    if (articleRes.data.success) {
      console.log("success");
    }
  };
  const transformedTags = hashtags.map((tag) => ({ value: tag, label: tag }));

  return (
    <div className="md:flex justify-center px-10 items-center ">
      {/* form */}
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <div className="md:flex  gap-5 ">
            <div className="md:w-1/2">
              <input
                type="text"
                {...register("title", { required: true })}
                defaultValue={title}
                placeholder="Title"
                className="input input-bordered border-2 border-main-blue-300 rounded-lg w-full "
              />
            </div>

            <div className="md:w-1/2">
              <select
                {...register("publisher", { required: true })}
                defaultValue={publisher}
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
                defaultValue={transformedTags}
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
                defaultValue={description}
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
              value="Update Article"
              className="btn mb-10 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]  text-[white] text-lg font-bold btn-block"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateArticle;
