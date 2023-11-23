import PropTypes from "prop-types";
const Button = ({ title }) => {
  // bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]
  return (
    <div>
      <button className="px-7 font-bold py-3 rounded-lg  text-white  bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]  ">
        {title}
      </button>
    </div>
  );
};
Button.propTypes = {
  title: PropTypes.object,
};
export default Button;
