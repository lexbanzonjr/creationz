import { create } from "zustand";
import {
  addProduct as addProductApi,
  get as getApi,
  getSubtotal as getSubtotalApi,
} from "../api/cartApi";
import { Cart, CartItem } from "../types/global";

interface AddItemParams extends CartItem {}

interface DataState {
  cart: Cart;
  addItem: (item: AddItemParams) => void;
  calculateSubTotal: () => Promise<string>;
  fetch: () => Promise<Cart>;
}

const useCart = create<DataState>((set) => ({
  cart: { items: [] },
  addItem: async ({ product, quantity }: AddItemParams) => {
    addProductApi({ product, quantity });
  },
  calculateSubTotal: async () => {
    const data = await getSubtotalApi();
    if (!data || !data.subTotal) return "0.00";
    return data.subTotal.toFixed(2);
  },
  fetch: async () => {
    const cart = await getApi();
    set({ cart });
    return cart;
  },
}));

export default useCart;
