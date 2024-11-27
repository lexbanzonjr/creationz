import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import ViewOrders from "./ViewOrders";
import styles from "./Dashboard.module.css";
import { Category } from "../../types/Category";
import { useAuth } from "../../context/AuthContext";
import { Product } from "../../types/Product";

const AdminDashboard: React.FC = () => {
  const { getAccessToken } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const listCategories = useCallback(async () => {
    try {
      // API call to register the account
      const response = await axios.get("https://localhost:5000/category", {
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
      });
      setCategories(response.data.categories);
    } catch (err: any) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listProducts = useCallback(async () => {
    try {
      // API call to register the account
      const response = await axios.get("https://localhost:5000/product", {
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
      });
      setProducts(response.data.products);
    } catch (err: any) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    listCategories();
    listProducts();
  }, [listCategories, listProducts]);

  return (
    <div>
      <div className={styles["admin-dashboard"]}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/admin/category">Category</Link>
            </li>
            <li>
              <Link to="/admin/product">Product</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.content}>
          <Routes>
            <Route
              path="/category"
              element={
                <CategoryPage
                  categories={categories}
                  setCategories={setCategories}
                />
              }
            />
            <Route
              path="/product"
              element={
                <ProductPage products={products} setProducts={setProducts} />
              }
            />
            <Route path="/view-orders" element={<ViewOrders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
