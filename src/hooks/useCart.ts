import { create } from "zustand";
import {
  addProduct as addProductApi,
  removeItem as removeItemApi,
  get as getApi,
  getSubtotal as getSubtotalApi,
} from "../api/cartApi";
import { Cart, CartItem, Order } from "../types/global";
import { createOrder as createOrderApi } from "./../api/orderApi";

interface AddItemParams extends CartItem {}

interface DataState {
  addItem: (item: AddItemParams) => Promise<Cart>;
  calculateSubTotal: () => Promise<string>;
  createOrder: (order: Order) => Promise<Order>;
  fetch: () => Promise<Cart>;
  removeItem: (itemId: string) => Promise<Cart>;
}

const useCart = create<DataState>(() => ({
  addItem: async ({ product, quantity }: AddItemParams) => {
    const cart = await addProductApi({ product, quantity });
    return cart;
  },
  calculateSubTotal: async () => {
    const data = await getSubtotalApi();
    if (!data || !data.subTotal) return "0.00";
    return data.subTotal.toFixed(2);
  },
  createOrder: async (order: Order) => {
    const { order: createdOrder } = await createOrderApi({ order });
    return createdOrder;
  },
  fetch: async () => {
    const cart = await getApi();
    return cart;
  },
  removeItem: async (itemId: string) => {
    const cart = await removeItemApi(itemId);
    return cart;
  },
}));

export default useCart;
