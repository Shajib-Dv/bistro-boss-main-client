/** @format */

import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";
//TODO: provide stripe published key
const stripePromise = loadStripe(import.meta.env.VITE_stripe_PK);

const Payment = () => {
  const [cart] = useCart();
  const price = cart?.reduce((sum, item) => item.price + sum, 0);
  const totalPrice = parseFloat(price.toFixed(2));
  return (
    <>
      <div className="w-full">
        <SectionTitle subHeading={"Please Process"} heading={"Payment"} />
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart} />
      </Elements>
    </>
  );
};

export default Payment;
