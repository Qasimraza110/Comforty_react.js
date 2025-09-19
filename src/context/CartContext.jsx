import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // 🟢 Firebase Auth state track
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        // 🟢 Load cart from localStorage for this user
        const savedCart = localStorage.getItem(`cart_${user.uid}`);
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } else {
        setUserId(null);
        setCartItems([]); // 🔴 Logout hone par cart clear
      }
    });
    return () => unsubscribe();
  }, []);

  // 🟢 Save cart to localStorage whenever it changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  // 🟢 Add to Cart
  const addToCart = (product, navigate) => {
    if (!userId) {
      navigate("/login"); // 🔴 Agar user login nahi hai → login page
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // 🟢 Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 🟢 Increase qty
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // 🟢 Decrease qty
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  // 🟢 Clear cart (checkout ke baad use hoga)
  const clearCart = () => {
    setCartItems([]);
    if (userId) {
      localStorage.removeItem(`cart_${userId}`);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
