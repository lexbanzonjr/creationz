import React from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // Assumes a CartContext is already implemented
import styles from "./Dashboard.module.css";

// Mock Data
const userInfo = {
  name: "John Doe",
  email: "johndoe@example.com",
};

const orderHistory = [
  {
    id: 1,
    date: "2024-11-15",
    total: 59.99,
    items: ["Classic Tee", "V-Neck Tee"],
  },
  { id: 2, date: "2024-10-20", total: 39.99, items: ["Graphic Tee"] },
];

const Dashboard: React.FC = () => {
  const { cart } = useCart(); // Retrieve cart data from context
  const { getId } = useAuth();

  return (
    <div className={styles.dashboard}>
      <h1>User Dashboard</h1>

      {/* User Information Section */}
      <section className={styles["user-info"]}>
        <h2>User Information</h2>
        <p>
          <strong>Name:</strong> {getId.name}
        </p>
        <p>
          <strong>Email:</strong> {getId.email}
        </p>
      </section>

      {/* Cart Section */}
      <section className={styles["cart-info"]}>
        <h2>Cart</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </section>

      {/* Order History Section */}
      <section className={styles["order-history"]}>
        <h2>Order History</h2>
        {orderHistory.length > 0 ? (
          <ul>
            {orderHistory.map((order) => (
              <li key={order.id}>
                <p>
                  <strong>Order Date:</strong> {order.date}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </p>
                <p>
                  <strong>Items:</strong> {order.items.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no order history.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
