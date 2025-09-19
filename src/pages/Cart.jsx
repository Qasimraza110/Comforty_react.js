
import { useCart } from "../context/CartContext";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";

export default function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, total } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg sm:text-xl">Your cart is empty!</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center sm:items-stretch border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              {/* Product Info */}
              <div className="flex items-center w-full sm:w-auto space-x-4 mb-3 sm:mb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded mx-auto sm:mx-0"
                />
                <div className="text-center sm:text-left">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="text-teal-600 hover:text-teal-800"
                >
                  <FaMinusCircle size={22} />
                </button>
                <span className="font-semibold text-lg">{item.qty}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="text-teal-600 hover:text-teal-800"
                >
                  <FaPlusCircle size={22} />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  <FaTrashAlt size={22} />
                </button>
              </div>

              {/* Price */}
              <div className="font-bold text-lg text-center sm:text-right mt-3 sm:mt-0 w-full sm:w-auto">
                ${item.price * item.qty}
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="text-center sm:text-right font-bold text-2xl mt-6">
            Total: ${total}
          </div>

          {/* Checkout Button */}
          <div className="text-center sm:text-right">
            <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition w-full sm:w-auto">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

