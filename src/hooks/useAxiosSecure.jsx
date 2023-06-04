/** @format */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://bistro-boss-server-shajib-dv.vercel.app",
});

const useAxiosSecure = () => {
  const { logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    // console.log("Token", token);
    axiosSecure.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOutUser, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
