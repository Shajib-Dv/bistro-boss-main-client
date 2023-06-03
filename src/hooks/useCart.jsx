/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const { user, loading } = useAuth();
  // console.log({ user });
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !loading,
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure(`/carts?email=${user?.email}`);

        return res.data;
      }
    },
  });

  return [cart, refetch];
};

export default useCart;
