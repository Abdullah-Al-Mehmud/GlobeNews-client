import heroImg from "../../../assets/images/newsHero.jpg";
import { Typewriter } from "react-simple-typewriter";
const HeroSection = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="md:flex items-center pt-10">
        <div className="w-fit">
          <div className="px-10">
            <h1 className="text-5xl font-bold">
              <span className="text-main-blue-500">Explore </span> Our {""}
              <span className="mt-2">
                <Typewriter
                  words={["Trending News !!", "Affordable Price !!"]}
                  loop={0 | false}
                  cursor
                  cursorStyle="_"
                  typeSpeed={50}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h1>

            <p className="mt-4 pr-20 font-bold ">
              "Welcome to GlobeNews, where information meets insight! Our hero
              section is your gateway to a world of timely, reliable, and
              engaging news. Immerse yourself in a visually captivating display
              of current events, thought-provoking stories, and in-depth
              analyses that transcend the headlines. From breaking news to
              feature articles, our carefully curated content ensures you stay
              informed and inspired. Explore a seamless blend of multimedia
              elements, including striking images.
            </p>
            <button className="px-7 mt-5 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]  ">
              Read More
            </button>
          </div>
        </div>
        <div className="w-fit">
          <img className="" src={heroImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
