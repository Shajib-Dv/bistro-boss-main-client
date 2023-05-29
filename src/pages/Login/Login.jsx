/** @format */

import React, { useContext, useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import loginLotte from "/public/loginLotte.json";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../../Providers/AuthProvider";

const Login = () => {
  const captchaRef = useRef(null);
  const [disableLogIn, setDisableLogIn] = useState(false); //TODO: make disable true
  const { signInUser } = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully log in",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
        form.reset();
      })
      .catch((error) =>
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: true,
          timer: 3000,
        })
      );
  };

  const handleVerifyCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value) == true) {
      setDisableLogIn(false);
    } else {
      setDisableLogIn(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl text-center font-bold">Login now!</h1>
            <div>
              <Lottie animationData={loginLotte} loop={true} />
            </div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogIn} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <p className="label-text-alt link link-hover">
                    Forgot password?
                  </p>
                </label>
              </div>
              <div className="form-control">
                <div>
                  <LoadCanvasTemplate />
                </div>
                <input
                  type="captcha"
                  ref={captchaRef}
                  placeholder="Inter the captcha "
                  className="input input-bordered"
                />
                <button
                  onClick={handleVerifyCaptcha}
                  className="btn btn-outlet btn-xs mt-2"
                >
                  Verify
                </button>
              </div>
              <div className="form-control mt-6">
                <input
                  disabled={disableLogIn}
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="pb-4 text-center font-semibold">
              New Here ! Please{" "}
              <Link to="/signup" className="btn-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
