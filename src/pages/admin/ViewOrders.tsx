import React, { useEffect, useState } from "react";
import styles from "./ViewOrders.module.css";

interface Order {
  id: number;
  customerName: string;
  items: { name: string; quantity: number }[];
  total: number;
  date: string;
}

const ViewOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulate fetching orders from API
    const fetchedOrders: Order[] = [
      {
        id: 1,
        customerName: "John Doe",
        items: [
          { name: "Classic Tee", quantity: 2 },
          { name: "V-Neck Tee", quantity: 1 },
        ],
        total: 59.97,
        date: "2024-11-23",
      },
      {
        id: 2,
        customerName: "Jane Smith",
        items: [{ name: "Hoodie", quantity: 1 }],
        total: 35.99,
        date: "2024-11-22",
      },
    ];
    setOrders(fetchedOrders);
  }, []);

  return (
    <div className={styles["view-orders"]}>
      <h2>View Orders</h2>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>
                  {order.items.map((item) => (
                    <div key={item.name}>
                      {item.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default ViewOrders;
