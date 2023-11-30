import AllPublishers from "./AllPublishers/AllPublishers";
import Statistics from "./Statistics/Statistics";
import TrendingArticles from "./TrendingArticles/TrendingArticles";
import Plans from "./Plans/Plans";
import HeroSection from "./HeroSection/HeroSection";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  // const [show, setShow] = useState(false);

  // useEffect(() => {
  //   const timeOut = setTimeout(() => {
  //     setShow(true);
  //   }, 2000);
  //   return () => {
  //     clearTimeout(timeOut);
  //   };
  // }, []);
  return (
    <div>
      <HeroSection></HeroSection>
      <TrendingArticles></TrendingArticles>
      <Statistics></Statistics>
      <AllPublishers></AllPublishers>

      {/* {show ? (
        <div className="modal">
          <div className="modal-content">
            <p>Subscribe to our service for exclusive content!</p>
            <button>Subscribe Now</button>
          </div>
        </div>
      ) : (
        ""
      )} */}

      <Plans></Plans>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
