import React from 'react';
import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <div className="relative w-full h-[500px]">
      <img
        src="/main.webp"
        alt="Hero Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-8 sm:p-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Modern Furniture for Your Home
        </h1>
        <p className="text-white text-lg mb-6 max-w-lg">
          Discover stylish, comfortable furniture to enhance your living space.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
