// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaSignOutAlt,
  FaHome,
  FaPhoneAlt,
  FaStore,
} from "react-icons/fa";
import { GiSofa } from "react-icons/gi";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userName = user?.displayName || user?.email?.split("@")[0];

  // Auto-close dropdown after 3 seconds
  useEffect(() => {
    let timer;
    if (dropdownOpen) {
      timer = setTimeout(() => setDropdownOpen(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [dropdownOpen]);

  const hoverLink =
    "relative font-medium after:content-[''] after:block after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full";

  // Navigation links with icons
  const navLinks = [
    { name: "Home", to: "/", icon: <FaHome /> },
    { name: "Shop", to: "/shop", icon: <FaStore /> },
    { name: "Contact", to: "/contact", icon: <FaPhoneAlt /> },
  ];

  return (
    <nav className="bg-teal-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 font-bold text-2xl hover:text-gray-200 transition-colors duration-300"
        >
          <GiSofa className="text-3xl text-yellow-300" />
          <span>Comforty</span>
        </Link>

        {/* Desktop Menu */}
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="flex items-center gap-1 hover:text-gray-200 transition"
            >
              {link.icon}
              <span className={hoverLink}>{link.name}</span>
            </Link>
          ))}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-1 hover:text-gray-200 transition"
          >
            <FaShoppingCart className="text-2xl" />
            <span className={hoverLink}>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Profile / Auth */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 hover:text-gray-200 transition focus:outline-none"
              >
                <FaUserCircle className="text-2xl" />
                <span className={hoverLink}>{userName}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg z-50">
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-gray-200 transition"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className={`hover:text-gray-200 transition ${hoverLink}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`hover:text-gray-200 transition ${hoverLink}`}
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-teal-700 text-white transform transition-transform duration-500 z-50
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-teal-500">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setMobileMenuOpen(false)}>
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-teal-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.icon} {link.name}
            </Link>
          ))}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-3 px-3 py-2 rounded hover:bg-teal-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaShoppingCart className="text-xl" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute left-20 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 px-3">
                <FaUserCircle className="text-xl" />
                <span>{userName}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-teal-600 transition"
              >
                <FaSignOutAlt className="text-xl" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                className="block px-3 py-2 rounded hover:bg-teal-600 transition"
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                className="block px-3 py-2 rounded hover:bg-teal-600 transition"
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
