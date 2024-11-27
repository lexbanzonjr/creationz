import { useEffect, useState } from "react";
import axios from "axios";

import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import { useAuth } from "../../context/AuthContext";

export interface ProductProps {
  _id: string;
  name: string;
  description: string;
  category_id: string;
}

const Product = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const { getAccessToken } = useAuth();

  const handleAddProduct = async (product: ProductProps) => {
    try {
      await axios.post("https://localhost:5000/product", product, {
        headers: {
          Authorization: `Basic ${getAccessToken}`,
        },
      });
    } catch (error: any) {
      if (error.response.status !== 200)
        alert(
          "Status code: " +
            error.response.status +
            ". " +
            error.response.data.error
        );
    }

    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const handleDeleteProduct = async (product: ProductProps) => {
    try {
      await axios.delete("https://localhost:5000/product", {
        params: { _id: product._id },
        headers: {
          Authorization: `Basic ${getAccessToken}`,
        },
      });
    } catch (error: any) {
      if (error.response.status !== 200)
        alert(
          "Status code: " +
            error.response.status +
            ". " +
            error.response.data.error
        );
    }

    setProducts((prevProducts) =>
      prevProducts.filter((prod) => prod._id !== product._id)
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // API call to register the account
        const response = await axios.get("https://localhost:5000/product", {
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        });
        setProducts(response.data.products);
      } catch (err: any) {}
    };
    fetchProducts();
  }, [getAccessToken]);

  return (
    <div>
      <ProductForm addCategory={handleAddProduct} />
      <ProductList
        products={products}
        handleDeleteProduct={handleDeleteProduct}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Product;
