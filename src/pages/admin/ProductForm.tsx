import React, { useState } from "react";

import { ProductProps } from "./ProductPage";
import styles from "./ProductForm.module.css";

interface ProductFormProps {
  addCategory: (category: ProductProps) => void;
}

const blankProduct: ProductProps = {
  _id: "",
  name: "",
  description: "",
  category_id: "",
};

const ProductForm: React.FC<ProductFormProps> = (props) => {
  const [product, setProduct] = useState<ProductProps>(blankProduct);

  const handleAddProductBtnClick = () => {
    props.addCategory(product);
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
