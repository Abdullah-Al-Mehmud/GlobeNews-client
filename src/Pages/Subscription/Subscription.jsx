import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import subscriptionImg from "../../assets/images/subscription.png";
import Heading from "../../Components/Heading";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);

  const logedinUser = allUsers.find((users) => users?.email === user?.email);
  console.log(logedinUser);

  const [selectedPeriod, setSelectedPeriod] = useState("");

  const handleSubscribe = () => {
    if (!selectedPeriod) {
      alert("Please select a subscription period");
      return;
    }

    const currentDate = new Date();
    let subscriptionEndDate;
    switch (selectedPeriod) {
      case "1min":
        subscriptionEndDate = new Date(currentDate.getTime() + 1 * 60 * 1000);
        break;
      case "5days":
        subscriptionEndDate = new Date(
          currentDate.getTime() + 5 * 24 * 60 * 60 * 1000
        );
        break;
      case "10days":
        subscriptionEndDate = new Date(
          currentDate.getTime() + 10 * 24 * 60 * 60 * 1000
        );
        break;

      default:
        return;
    }

    fetch(`https://globe-news-server.vercel.app/users/${logedinUser?._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        premiumTaken: subscriptionEndDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        navigate("/payment");
      })
      .catch((error) => {
        console.error("Error subscribing:", error);
      });
  };
  useEffect(() => {
    fetch("https://globe-news-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);
  return (
    <div>
      <Heading heading={`Subscription`}></Heading>
      <div className="flex justify-center">
        <img className="h-96 w-fit" src={subscriptionImg} alt="" />
      </div>

      <div className="rounded-xl mt-10">
        <div className="hero h-[200px] rounded-xl">
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content rounded-xl">
            <div className="">
              <div className="flex flex-col md:flex-row items-center gap-5 ">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="select select-success w-[300px] md:w-[700px] text-main-blue-950 font-medium">
                  <option value="">Select Subscription Period</option>
                  <option value="1min">
                    1 Minute{" "}
                    <span className="text-lg text-main-blue-950 ml-10">
                      $5{" "}
                    </span>
                  </option>
                  <option value="5days">
                    5 Days{" "}
                    <span className="text-lg text-main-blue-950">$100 </span>
                  </option>
                  <option value="1week">
                    10 Days{" "}
                    <span className="text-lg text-main-blue-950">$500 </span>
                  </option>
                </select>
                <button
                  onClick={handleSubscribe}
                  className="px-7 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]  ">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
