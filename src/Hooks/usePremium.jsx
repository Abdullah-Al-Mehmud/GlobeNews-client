import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const usePremium = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isPremium = [] } = useQuery({
    queryKey: [user?.email, "premium"],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/premium/${user?.email}`);
      return res.data.premium;
    },
  });

  return [isPremium];
};

export default usePremium;
