import { useParams } from "react-router-dom";
import products from "../data/products";

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <p className="p-4">Product not found!</p>;

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
      <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-96 object-cover rounded" />
      <div className="md:w-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-700 text-xl">${product.price}</p>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum.
        </p>
        <button className="bg-teal-600 text-white px-6 py-2 rounded-md">Add to Cart</button>
      </div>
    </div>
  );
}
