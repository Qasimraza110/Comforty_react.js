// src/pages/Shop.jsx
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

export default function Shop() {
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
        Shop
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition 
              ${
                selectedCategory === category
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-teal-500 hover:text-white"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
