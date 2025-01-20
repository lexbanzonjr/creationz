import React, { useState } from "react";

import { Product } from "../../types/global";
import styles from "./ProductForm.module.css";
import useStore from "../../hooks/useAdminStore";
import { useAuth } from "../../context/AuthContext";

const blankProduct: Product = {
  _id: "",
  cost: 0.0,
  name: "",
  description: "",
  image_id: [],
  category_id: "",
};

const ProductForm = () => {
  const [product, setProduct] = useState<Product>(blankProduct);
  const { getAccessToken } = useAuth();
  const { addProduct } = useStore();

  const handleAddProductBtnClick = () => {
    addProduct(getAccessToken, product);
    setProduct(blankProduct);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles["product-form"]}>
      <h2>Add Product</h2>
      <form>
        <div className={styles["category-field"]}>
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
        </div>

        <div className={styles["category-field"]}>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <br />
        <button onClick={handleAddProductBtnClick} type="button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
