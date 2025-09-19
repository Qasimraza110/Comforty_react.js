// src/pages/Checkout.jsx
import { useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_12345_your_publishable_key"); // apna key dalna

function CheckoutForm() {
  const { cartItems, total, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    // ⚡ Demo only: Normally backend pe PaymentIntent hota
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();

      // 2s delay ke baad home pe navigate
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
        <p className="mt-2 text-gray-600">Redirecting you to home...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold">Checkout</h2>

      <div>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-gray-700">
            <span>
              {item.name} x {item.qty}
            </span>
            <span>${item.price * item.qty}</span>
          </div>
        ))}
      </div>

      <div className="font-bold text-xl text-right">Total: ${total}</div>

      <CardElement className="p-3 border rounded" />

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
