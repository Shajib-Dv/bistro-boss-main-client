/** @format */

import React from "react";
import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { authContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import saveUserToDB from "../utils/saveUserToDB";

const SocialLogIn = () => {
  const { googleSignIn } = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const storeUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };

        saveUserToDB(storeUser);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully log in",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/", { state: { from: location } });
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="divider"></div>
      <div className="w-full text-center mb-4">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-circle btn-outline"
        >
          <FaGoogle />
        </button>
      </div>
    </>
  );
};

export default SocialLogIn;
