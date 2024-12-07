import React, { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { MdCategory, MdColorLens } from "react-icons/md";
import { IoMdShirt } from "react-icons/io";

import ViewOrders from "./ViewOrders";
import styles from "./Dashboard.module.css";
import { useAuth } from "../../context/AuthContext";
import { getCategories } from "../../api/categoryApi";
import { getProducts } from "../../api/productApi";
import TypePage from "./TypePage";
import { getTypes } from "../../api/typeApi";
import useAdminStore from "../../hooks/useAdminStore";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";

const AdminDashboard: React.FC = () => {
  const { getAccessToken } = useAuth();
  const { pathname } = useLocation();
  const { populate, setAllData } = useAdminStore();

  useEffect(() => {
    const fetchData = async () => {
      const params = { accessToken: getAccessToken, populate: true };
      try {
        // Replace these functions with your actual data-fetching logic
        const [categories, products, types] = await Promise.all([
          getCategories(params),
          getProducts(params),
          getTypes(params),
        ]);

        // Set all data at once to avoid multiple re-renders
        setAllData({ categories, products, types, populate: true });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!populate) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={`${styles["admin-dashboard"]} `}>
        <nav className={`${styles.nav}`}>
          <ul>
            <li>
              <Link
                to="/admin/category"
                className={`${styles["nav-link"]} ${
                  pathname === "/admin/category"
                    ? styles["nav-link-active"]
                    : styles["nav-link-not-active"]
                }`}
              >
                <MdCategory className={styles["nav-link-icon"]} />
                <span>Category</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/type"
                className={`${styles["nav-link"]} ${
                  pathname === "/admin/type"
                    ? styles["nav-link-active"]
                    : styles["nav-link-not-active"]
                }`}
              >
                <MdColorLens className={styles["nav-link-icon"]} />
                <span>Type</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/product"
                className={`${styles["nav-link"]} ${
                  pathname === "/admin/product"
                    ? styles["nav-link-active"]
                    : styles["nav-link-not-active"]
                }`}
              >
                <IoMdShirt className={styles["nav-link-icon"]} />
                <span>Product</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.content}>
          <Routes>
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/type" element={<TypePage />} />
            <Route path="/view-orders" element={<ViewOrders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
