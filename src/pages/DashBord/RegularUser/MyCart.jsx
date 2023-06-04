/** @format */

import React from "react";
import useCart from "../../../hooks/useCart";
import { Helmet } from "react-helmet-async";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cart, reFetch] = useCart();
  const totalPrice = cart?.reduce((sum, item) => item.price + sum, 0);

  const handleDeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure? You want to delete !",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://bistro-boss-server-shajib-dv.vercel.app/carts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            reFetch();
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss || my cart</title>
      </Helmet>
      <div>
        <div className="flex items-center flex-col md:flex-row justify-evenly uppercase">
          <h3 className="md:text-3xl">Total Items: {cart?.length}</h3>
          <h3 className="md:text-3xl">Total Price: ${totalPrice.toFixed(2)}</h3>
          <button className="btn btn-warning btn-sm">
            <Link to="/dashboard/payment">Pay</Link>
          </button>
        </div>
        <div className="overflow-x-auto w-full my-10">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((row, indx) => (
                <tr key={row._id}>
                  <th>{indx + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={row.image} />
                      </div>
                    </div>
                  </td>
                  <td>{row.name}</td>
                  <td>${row.price}</td>
                  <th>
                    <button
                      onClick={() => handleDeleteItem(row._id)}
                      className="bg-red-700 flex items-center justify-center text-white btn-circle"
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyCart;
