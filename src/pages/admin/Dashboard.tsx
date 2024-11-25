import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Category from "./Category";
import AddProduct from "./AddProduct";
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
              <Link to="/admin/add-product">Add Product</Link>
            </li>
            <li>
              <Link to="/admin/view-orders">View Orders</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.content}>
          <Routes>
            <Route path="/category" element={<Category />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/view-orders" element={<ViewOrders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
