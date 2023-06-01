/** @format */

import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaShoppingCart,
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaHamburger,
  FaShoppingBag,
  FaEnvelope,
  FaBookOpen,
  FaUtensils,
  FaMagic,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
  const [isAdmin] = useAdmin();

  const AdminList = () => (
    <>
      <Link to="" className="flex items-center gap-3">
        <FaHome />
        Admin Home
      </Link>
      <Link to="/dashboard/addItem" className="flex items-center gap-3">
        <FaUtensils />
        Add Items
      </Link>
      <Link to="" className="flex items-center gap-3">
        <FaMagic />
        Manage Items
      </Link>
      <Link to="" className="flex items-center gap-3">
        <FaBook />
        Manage Bookings
      </Link>
      <Link to="allUsers" className="flex items-center gap-3">
        <FaUsers />
        Manage Users
      </Link>
    </>
  );

  const CommonUserList = () => (
    <>
      <Link to="" className="flex items-center gap-3">
        <FaHome />
        User Home
      </Link>
      <Link to="" className="flex items-center gap-3">
        <FaCalendarAlt />
        Reservations
      </Link>
      <Link to="" className="flex items-center gap-3">
        <FaWallet />
        Payment History
      </Link>
      <Link to="/dashboard/mycart" className="flex items-center gap-3">
        <FaShoppingCart />
        My Cart
      </Link>
    </>
  );

  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-6">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="flex gap-2 fixed top-2 text-[#D29F55] items-center drawer-button lg:hidden"
          >
            <FaBookOpen className="text-2xl" /> Open Dashboard
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="menu space-y-4 p-4 w-80 bg-[#D29F55] text-black">
            <div className="text-2xl text-black text-center">
              BISTRO-BOSS Restaurant
            </div>
            {isAdmin ? <AdminList /> : <CommonUserList />}
            <hr className="border-black" />
            <Link to="/" className="flex items-center gap-3">
              <FaHome />
              Home
            </Link>
            <Link to="/menu" className="flex items-center gap-3">
              <FaHamburger />
              Menu
            </Link>
            <Link to="/order/salad" className="flex items-center gap-3">
              <FaShoppingBag />
              Shop
            </Link>
            <Link to="/" className="flex items-center gap-3">
              <FaEnvelope />
              Contact
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
