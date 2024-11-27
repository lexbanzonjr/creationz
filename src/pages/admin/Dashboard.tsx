import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import ViewOrders from "./ViewOrders";
import styles from "./Dashboard.module.css";

const AdminDashboard: React.FC = () => {
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
            <li>
              <Link to="/admin/view-orders">View Orders</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.content}>
          <Routes>
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/view-orders" element={<ViewOrders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
