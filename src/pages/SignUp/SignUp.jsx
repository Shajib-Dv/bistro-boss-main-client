/** @format */

import React, { useContext } from "react";
import Lottie from "lottie-react";
import SignUpLotte from "/public/signUpLotte.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const { signUpUser } = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    signUpUser(email, password)
      .then((result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully sign up",
          showConfirmButton: false,
          timer: 1500,
        });
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });
        form.reset();
        navigate(from);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign up</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-center">Sign up now!</h1>
            <Lottie animationData={SignUpLotte} loop={true} />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo url</span>
                </label>
                <input
                  type="url"
                  name="photo"
                  placeholder="photo url"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  required
                  className="input input-bordered"
                />
                <p className="p-4 text-center font-semibold">
                  New Here ! Please{" "}
                  <Link to="/login" className="btn-link">
                    Log in
                  </Link>
                </p>
              </div>
              <div className="form-control">
                <input
                  type="submit"
                  value="Sign up"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
