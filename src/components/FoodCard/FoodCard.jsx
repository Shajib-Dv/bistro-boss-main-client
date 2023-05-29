/** @format */

import { useContext } from "react";
import Swal from "sweetalert2";
import { authContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const navigate = useNavigate();
  const { name, image, price, recipe, _id } = item;
  const { user } = useContext(authContext);
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    if (user && user.email) {
      const orderItem = {
        foodId: _id,
        name,
        image,
        price,
        recipe,
        email: user?.email,
      };
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(orderItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully added to cart",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => console.log(error));
    }

    // Swal.fire({
    //   title: "Please log in for add to cart",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Log in",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     navigate("/login");
    //   }
    // });
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="" />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">
        ${price}
      </p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
