/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import getAllUsers from "../utils/getAllUsers";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const allUsers = getAllUsers();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", allUsers?.email],
    enabled: !loading,
    queryFn: async () => {
      if (allUsers?.role === "admin") {
        const res = await axiosSecure.get(`/users/admin/${user?.email}`);
        return res.data.admin;
      }
    },
  });
  return [isAdmin, isAdminLoading];
};
export default useAdmin;
