/** @format */

import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCartPlus, FaSignOutAlt } from "react-icons/fa";
import { authContext } from "../../../Providers/AuthProvider";
import useCart from "../../../hooks/useCart";

const NavBar = () => {
  const { user, logOutUser } = useContext(authContext);

  const [cart] = useCart();

  const handleLogOut = () => {
    logOutUser()
      .then(() =>
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Log out successful",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((error) => console.log(error.message));
  };

  const navOptions = (
    <>
      <Link to="/">Home</Link>
      <Link to="/menu">Our Menu</Link>
      <Link to="/order/salad">Order Food</Link>
      {user ? (
        <>
          <div className="avatar backdrop-blur-sm w-12">
            <div className="w-12 rounded-full">
              <img src={user?.photoURL} />
            </div>
          </div>
          <button onClick={handleLogOut} className="text-3xl" title="Log Out">
            <FaSignOutAlt />
          </button>
        </>
      ) : (
        <Link to="/login">Log in</Link>
      )}
      <Link to="dashbord/mycart">
        <div className="indicator">
          <span className="indicator-item badge badge-secondary">
            +{cart?.length || 0}
          </span>
          <FaCartPlus className="text-3xl mx-4" />
        </div>
      </Link>
    </>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[rgb(0,0,0,0.5)] w-screen gap-4 rounded-box "
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu gap-6 items-center menu-horizontal px-1">
            {navOptions}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Get started</a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
