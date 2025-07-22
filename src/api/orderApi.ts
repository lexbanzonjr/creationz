import { httpClient } from "../httpClient";
import { Order } from "../types/global";

export const createOrder = async ({ order }: { order: Order }) => {
  const response = await httpClient.post("/order", order);
  return response.data.order as Order;
};

export const getOrder = async ({ _id }: { _id: string }) => {
  const response = await httpClient.get(`/order/${_id}`);
  return response.data.order as Order;
};

export const getOrders = async () => {
  try {
    // API call to get all orders
    const response = await httpClient.get("/order");
    return response.data.orders as Order[];
  } catch (err: any) {}
  return [];
};
