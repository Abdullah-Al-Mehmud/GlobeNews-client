import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import errorImage from "../../assets/images/404.jpg";
const ErrorPage = () => {
  return (
    <>
      <div className="flex justify-evenly h-screen items-center">
        <div>
          <h1 className="font-bold text-5xl">Ooooooops !!</h1>
          <p className="font-bold text-3xl mt-2 mb-5">Page Not Found</p>
          <Link to="/">
            <Button title={`Go Home`}></Button>
          </Link>
        </div>
        <img className="h-[500px]" src={errorImage} alt="" />
      </div>
    </>
  );
};

export default ErrorPage;
