import React from "react";
import { useCart } from "../context/CartContext";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, price, image }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Call addToCart with the product details
    addToCart({ id, name, price, quantity: 1, image });
    alert(`${name} added to cart!`);
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
