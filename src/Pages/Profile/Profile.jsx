import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Button from "../../Components/Button";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  // console.log(user);
  const [update, setUpdate] = useState(true);
  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;

    updateUser(name, image)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setUpdate(!update);
  };
  return (
    <div className="flex justify-center items-center py-10 h-auto">
      <div className="bg-[#160938] relative py-10 text-main-blue-50 rounded-lg w-auto px-20 h-auto">
        <div className="avatar flex justify-center">
          <div className="w-36 rounded-full mt-5 ">
            <img src={user?.photoURL} />
          </div>
        </div>

        {update ? (
          <div className="mt-10">
            <div className="text-center mt-5">
              <p className="text-sm font-bold">
                {" "}
                Name :{" "}
                <span className="text-lg font-bold mt-2">
                  {user?.displayName}
                </span>
              </p>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-bold">
                Email :{" "}
                <span className="text-lg font-bold mt-2">{user?.email}</span>
              </p>
            </div>
            <div
              onClick={() => setUpdate(!update)}
              className="flex justify-center mt-6">
              <Button
                title={update ? `Update Profile` : `Save Changes`}></Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="  mt-10">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-bold text-main-blue-50 ">
                Your Image
              </label>
              <input
                type="text"
                defaultValue={user?.photoURL}
                name="image"
                className="w-72 relative text-main-blue-950 rounded-full pl-5 py-1 font-bold border-2 border-[#4984e8] focus:border-[#4984e8] outline-none"
                placeholder="Your Image"
                required=""
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-bold text-main-blue-50 ">
                Your Name
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                name="name"
                className="w-72 relative text-main-blue-950 rounded-full pl-5 py-1 font-bold border-2 border-[#4984e8] focus:border-[#4984e8] outline-none"
                placeholder="Your Name"
                required=""
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-bold text-main-blue-50 ">
                Email (Email cannot be changed)
              </label>
              <input
                type="text"
                defaultValue={user?.email}
                readOnly
                className="w-72 relative text-main-blue-950 rounded-full pl-5 py-1 font-bold border-2 border-[#4984e8] focus:border-[#4984e8] outline-none"
                placeholder="Your Email"
                required=""
              />
            </div>
            <div className="flex justify-center mt-6">
              <Button title={`Save Changes`}></Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
