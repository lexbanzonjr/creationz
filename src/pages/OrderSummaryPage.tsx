import React from "react";
import { Order } from "../types/global";
import { useLocation, useNavigate } from "react-router-dom";
import GreenButton from "../components/GreenButton";

const OrderSummaryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order: Order = location.state?.order;
  if (!order || !order.cart || !order.customer) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Order Summary</h1>
        <p className="text-red-500">No order data found. Please try again.</p>
        <GreenButton onClick={() => navigate("/cart")} className="mt-4">
          Back to Cart
        </GreenButton>
      </div>
    );
  }

  const orderDate = order.orderDate
    ? new Date(order.orderDate).toLocaleDateString()
    : new Date().toLocaleDateString();
  const calculateTotal = () => {
    if (!order.cart?.items) return "0.00";
    return order.cart.items
      .reduce((total, item) => {
        return total + item.product.cost * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-green-800">
              Order Confirmed!
            </h1>
            <p className="text-green-600">
              Your order has been successfully placed.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-600">Order Number:</p>
            <p className="font-semibold">{order.orderNumber || order._id}</p>
          </div>
          <div>
            <p className="text-gray-600">Order Date:</p>
            <p className="font-semibold">{orderDate}</p>
          </div>
          <div>
            <p className="text-gray-600">Status:</p>
            <p className="font-semibold capitalize">{order.status}</p>
          </div>{" "}
          <div>
            <p className="text-gray-600">Customer:</p>
            <p className="font-semibold">{order.customer?.name || "Unknown"}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Items Ordered</h2>{" "}
        <div className="space-y-4">
          {order.cart?.items?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-4 last:border-b-0"
            >
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">
                  ${item.product.cost.toFixed(2)} each
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${(item.product.cost * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          )) || <p className="text-gray-500">No items found</p>}
        </div>
        <div className="mt-6 pt-4 border-t-2">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold">${calculateTotal()}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <GreenButton onClick={() => navigate("/shop")} className="flex-1">
          Continue Shopping
        </GreenButton>
        <GreenButton onClick={() => navigate("/")} className="flex-1">
          Back to Home
        </GreenButton>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
