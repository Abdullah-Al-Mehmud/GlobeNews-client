import { Link, useNavigate } from "react-router-dom";
import googlePic from "../../assets/icons/google.png";
import { useContext, useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");
  const { loginUser, googleLoginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // login user
    loginUser(email, password)
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/");
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  const handleGoogleLogin = () => {
    googleLoginUser()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch();
  };
  return (
    <div className=" bg-[#160938] py-20 flex h-auto items-center">
      <div className=" bg-main-blue-50 rounded-xl shadow-xl max-w-5xl px-10 py-10 mx-auto md:flex items-center gap-4">
        <div className="w-full">
          <div className="w-full max-w-sm p-4 bg-white rounded-lg sm:p-6 md:p-8 ">
            <form onSubmit={handleLogin} className="space-y-6" action="#">
              <h5 className="text-2xl font-bold text-gray-900 dark:text-main-blue-950">
                Login in to our platform
              </h5>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-main-blue-950">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-72 relative rounded-full pl-5 py-1 font-bold border-2 border-[#4984e8] focus:border-[#4984e8] outline-none"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-main-blue-950">
                  Your password
                </label>

                <input
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
              </div>
              <div className="flex items-start">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#4984e8] dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-bold text-main-blue-950 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="ml-auto text-sm text-[#4984e8] hover:underline dark:text-[#4984e8]">
                  Lost Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-main-blue-50 bg-[#4984e8] hover:bg-[#d14157] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#4984e8] dark:hover:bg-[#4984e8] dark:focus:ring-[#4984e8]">
                Login account
              </button>
              <div>
                {error ? (
                  <p className="font-bold text-[#ff2b2b]">{error}</p>
                ) : (
                  ""
                )}
              </div>
              {/* google login */}
              <div>
                <div className="divider text-center text-main-blue-950 font-bold">
                  Also Login With
                </div>
                <div className="flex mt-4 justify-center">
                  <img
                    onClick={handleGoogleLogin}
                    className="h-10 cursor-pointer"
                    src={googlePic}
                    alt=""
                  />
                </div>
              </div>
              <div className="text-sm font-bold text-gray-500 dark:text-gray-300">
                Not Registered?{" "}
                <Link
                  to="/register"
                  className="text-[#4984e8] hover:underline dark:text-[#4984e8]">
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
