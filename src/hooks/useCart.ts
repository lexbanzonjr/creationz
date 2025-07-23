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
  cart: Cart;

  addItem: (item: AddItemParams) => void;
  calculateSubTotal: () => Promise<string>;
  createOrder: (order: Order) => Promise<Order>;
  fetch: () => Promise<Cart>;
  removeItem: (itemId: string) => Promise<void>;
}

const useCart = create<DataState>((set) => ({
  cart: { items: [] },

  addItem: async ({ product, quantity }: AddItemParams) => {
    await addProductApi({ product, quantity });
  },
  calculateSubTotal: async () => {
    const data = await getSubtotalApi();
    if (!data || !data.subTotal) return "0.00";
    return data.subTotal.toFixed(2);
  },
  createOrder: async (order: Order) => {
    const createdOrder = await createOrderApi({ order });
    return createdOrder;
  },
  fetch: async () => {
    const cart = await getApi();
    set({ cart });
    return cart;
  },
  removeItem: async (itemId: string) => {
    await removeItemApi(itemId);
  },
}));

export default useCart;
