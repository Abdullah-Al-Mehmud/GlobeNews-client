import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://globe-news-server.vercel.app",
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
