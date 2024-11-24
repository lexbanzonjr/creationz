import React, { useState } from "react";
import "./AddProduct.css";

interface Product {
  name: string;
  price: number;
  image: string;
  description: string;
}

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    image: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product Added:", product);
    // Add API call here to save product to database
    setProduct({ name: "", price: 0, image: "", description: "" }); // Reset form
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
