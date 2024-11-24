import React from "react";
import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Classic Tee",
    price: 19.99,
    image: "/images/classic-tee.jpg",
  },
  { id: 2, name: "V-Neck Tee", price: 21.99, image: "/images/vneck-tee.jpg" },
];

const Shop: React.FC = () => {
  return (
    <div className="shop">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Shop;
