import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order } from "../types/global";
import { getOrders } from "../api/orderApi";
import GreenButton from "../components/GreenButton";
import { useAuthStore } from "../hooks/useAuthStore";

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate]);

  const formatDate = (date: Date | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  const calculateOrderTotal = (order: Order) => {
    if (!order.cart?.items) return "0.00";
    return order.cart.items
      .reduce((total, item) => {
        return total + item.product.cost * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleViewOrderSummary = (order: Order) => {
    navigate("/order-summary", { state: { order } });
  };

  if (isLoading) {
    return (
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading orders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600">{error}</p>
          <GreenButton
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Try Again
          </GreenButton>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">No Orders Found</h2>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders yet.
          </p>
          <GreenButton onClick={() => navigate("/shop")}>
            Start Shopping
          </GreenButton>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg border shadow-sm p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    Order #{order.orderNumber || order._id}
                  </h2>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>Date: {formatDate(order.orderDate)}</span>
                    <span className="mx-2">•</span>
                    <span className="capitalize">Status: {order.status}</span>
                    <span className="mx-2">•</span>
                    <span>Customer: {order.customer?.name || "N/A"}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    ${calculateOrderTotal(order)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {order.cart?.items?.length || 0} item(s)
                  </div>
                </div>
              </div>

              {/* Order Items */}
              {order.cart?.items && order.cart.items.length > 0 && (
                <div className="border-t pt-4 mb-4">
                  <h3 className="text-lg font-semibold mb-3">Items Ordered</h3>
                  <div className="space-y-3">
                    {order.cart.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            ${item.product.cost.toFixed(2)} each ×{" "}
                            {item.quantity}
                          </p>
                          {item.note && (
                            <p className="text-sm text-gray-500 mt-1">
                              Note: {item.note}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${(item.product.cost * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold">
                    Total: ${calculateOrderTotal(order)}
                  </div>
                  <GreenButton
                    onClick={() => handleViewOrderSummary(order)}
                    className="px-6 py-2"
                  >
                    Order Summary
                  </GreenButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
