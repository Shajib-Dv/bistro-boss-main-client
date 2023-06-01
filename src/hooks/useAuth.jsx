/** @format */

import { useContext } from "react";
import { authContext } from "../Providers/AuthProvider";

const useAuth = () => {
  const auth = useContext(authContext);
  return auth;
};

export default useAuth;
