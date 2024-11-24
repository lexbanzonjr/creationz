import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddProduct from "./AddProduct";
import ViewOrders from "./ViewOrders";
// import "./Dashboard.css";

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <nav>
        <ul>
          <li>
            <Link to="/admin/add-product">Add Product</Link>
          </li>
          <li>
            <Link to="/admin/view-orders">View Orders</Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/view-orders" element={<ViewOrders />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
