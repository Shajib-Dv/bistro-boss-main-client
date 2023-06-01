/** @format */

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const getAllUsers = () => {
  const [axiosSecure] = useAxiosSecure();

  const { user, loading } = useAuth();
  const { data: allUsers = [] } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  return allUsers;
};

export default getAllUsers;
