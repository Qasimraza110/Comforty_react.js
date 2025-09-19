import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import { Link } from "react-router-dom";

export default function Home() {
  // Show only 4 featured products
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Featured Products */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-block px-8 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories / Info Section */}
      <section className="bg-gray-100 py-16 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Comforty?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Our furniture is crafted with the highest quality materials for durability and style.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your products delivered safely and on time, anywhere in the country.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">
                Hassle-free returns within 30 days. Your satisfaction is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
