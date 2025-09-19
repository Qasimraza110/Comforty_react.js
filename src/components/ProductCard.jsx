import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  const handleAdd = () => {
    setAdding(true);
    addToCart(product, navigate); 

    setTimeout(() => {
      setAdding(false);
    }, 1200);
  };

  return (
    <div className="border p-3 rounded-md hover:shadow-lg transition transform hover:scale-105 bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
      <p className="mt-1 text-gray-500">${product.price}</p>

      <button
        onClick={handleAdd}
        className={`mt-3 px-4 py-2 rounded-md w-full font-medium transition
          ${adding ? "bg-green-600 text-white" : "bg-teal-600 text-white hover:bg-teal-700"}`}
      >
        {adding ? "Added!" : "Add to Cart"}
      </button>
    </div>
  );
}

