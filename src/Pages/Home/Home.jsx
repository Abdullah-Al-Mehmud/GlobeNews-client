import { useEffect, useState } from "react";
import AllPublishers from "./AllPublishers/AllPublishers";
import Statistics from "./Statistics/Statistics";

const Home = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShow(true);
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);
  return (
    <div>
      <Statistics></Statistics>
      <AllPublishers></AllPublishers>

      {show ? (
        <div className="modal">
          <div className="modal-content">
            <p>Subscribe to our service for exclusive content!</p>
            <button>Subscribe Now</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
