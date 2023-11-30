import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const [show, setShow] = useState(true);
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // register user
    const email = data.email;
    const password = data.password;
    const name = data.name;
    const image = data.image;
    // console.log(email, password, name, image);
    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        const userInfo = {
          name,
          email,
          image,
          role: "user",
          isPremium: "no",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.success) {
            updateUser(name, image).then().catch();
            //TODO: i have to send the user data to database along with isPremium
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Registered Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
            navigate("/");
          }
        });
      })
      .catch((err) => setError(err));
  };
  return (
    <div className=" bg-[#160938] py-20 flex h-auto items-center">
      <div className=" bg-main-blue-50 rounded-xl shadow-xl max-w-5xl px-10 py-10 mx-auto md:flex items-center gap-4">
        <div className="w-full">
          <div className="w-full max-w-sm p-4 bg-white rounded-lg sm:p-6 md:p-8 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              action="#">
              <h5 className="text-3xl font-bold text-center text-main-blue-950 dark:text-main-blue-950">
                Register Here
              </h5>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-main-blue-950">
                  Your Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-72 relative rounded-full pl-5 py-1 font-bold border-2 border-[#4984e8] focus:border-[#4984e8] outline-none"
                  placeholder="Your Name"
                  required=""
                />

                {errors.name ? (
                  <span className="text-[#f70909] font-bold mt-2">
                    Name is required
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="pic"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-main-blue-950">
                  Your Image
                </label>
                <input
                  type="text"
                  {...register("image", { required: true })}
                  className="w-72 relative rounded-full pl-5 py-1 font-bold border-2 border-[#4984e8] focus:border-[#4984e8] outline-none"
                  placeholder="Image URL"
                  required=""
                />
                {errors.image ? (
                  <span className="text-[#f70909] font-bold mt-2">
                    Image is required
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-main-blue-950">
                  Your email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  id="email"
                  className="w-72 relative rounded-full pl-5 py-1 font-bold border-2 border-[#4984e8] focus:border-[#4984e8] outline-none"
                  placeholder="name@company.com"
                  required=""
                />
                {errors.email ? (
                  <span className="text-[#f70909] font-bold mt-2">
                    Email is required
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-main-blue-950">
                  Your password
                </label>

                <input
                  {...register("password", {
                    required: "Password  is required",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters or above",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/,
                      message:
                        "Password must include at least one uppercase letter, one numeric digit, and one special character.",
                    },
                  })}
                  className="w-72 relative rounded-full pl-5 py-1 font-bold border-2 border-[#4984e8] focus:border-[#4984e8] outline-none"
                  type={show ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                />

                <span
                  onClick={() => setShow(!show)}
                  className="-ml-10 cursor-pointer mt-1.5 py-1 absolute text-lg ">
                  {show ? (
                    <BiSolidHide></BiSolidHide>
                  ) : (
                    <BiSolidShow></BiSolidShow>
                  )}
                </span>
                {errors.password && (
                  <span className="text-[#f70909] font-bold mt-2">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-main-blue-50 bg-[#4984e8] hover:bg-[#d14157] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#4984e8] dark:hover:bg-[#4984e8] dark:focus:ring-[#4984e8]">
                Register account
              </button>
              <div>
                {error ? (
                  <p className="font-bold text-[#ff2b2b]">{error}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="text-sm font-bold text-gray-500 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#4984e8] hover:underline dark:text-[#4984e8]">
                  Login here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
