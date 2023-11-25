import PropTypes from "prop-types";

const Heading = ({ heading }) => {
  return (
    <div>
      <div className="text-center pt-2 pb-10">
        <p className="text-3xl border-y-4 border-main-blue-500 py-3 max-w-xs mt-4 mx-auto font-bold ">
          {heading}
        </p>
      </div>
    </div>
  );
};

Heading.propTypes = {
  heading: PropTypes.string,
};

export default Heading;
