import React from "react";
import { useCart } from "../context/CartContext";
import styles from "./Cart.module.css";
const Cart: React.FC = () => {
  const { cart, updateCartItem, removeCartItem } = useCart();

  const calculateTotal = () =>
    cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <div className={styles.cart}>
      <h1 className={styles.h1}>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.name} width="50" />
                    {item.name}
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartItem(item.id, parseInt(e.target.value))
                      }
                      min="1"
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeCartItem(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Total: ${calculateTotal()}</h2>
        </>
      )}
    </div>
  );
};

export default Cart;
