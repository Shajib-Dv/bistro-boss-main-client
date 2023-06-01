/** @format */

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrash, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure("/users");
    return res.data;
  });

  const handleDeleteUser = (id) => {
    console.log(id);
  };

  const handleUserRole = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user.name} is an admin now`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h2 className="text-3xl py-2 font-semibold">
        Total Users: {users.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head*/}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, indx) => (
              <tr key={user._id}>
                <th>{indx + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleUserRole(user)}
                      className="bg-yellow-600 flex items-center justify-center text-white btn-circle"
                    >
                      <FaUserPlus />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-700 flex items-center justify-center text-white btn-circle"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
