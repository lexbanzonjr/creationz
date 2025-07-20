import { create } from "zustand";
import {
  addProduct as addProductApi,
  get as getApi,
  getSubtotal as getSubtotalApi,
} from "../api/cartApi";
import { Cart, Product } from "../types/global";

interface AddItemParams {
  token: string;
  product: Product;
  quantity: number;
}

interface CalculateSubtotalParams {
  token: string;
}

interface FetchParams {
  token: string;
}

interface DataState {
  cart: Cart;
  addItem: (item: AddItemParams) => void;
  calculateSubTotal: (params: CalculateSubtotalParams) => Promise<string>;
  fetch: (params: FetchParams) => Promise<Cart>;
}

const useCart = create<DataState>((set) => ({
  cart: { products: [] },
  addItem: async ({ token, product, quantity }: AddItemParams) => {
    addProductApi({ token, product, quantity });
  },
  calculateSubTotal: async ({ token }: CalculateSubtotalParams) => {
    const data = await getSubtotalApi({ token });
    if (!data || !data.subTotal) return "0.00";
    return data.subTotal.toFixed(2);
  },
  fetch: async ({ token }: FetchParams) => {
    const cart = await getApi({ token });
    set({ cart });
    return cart;
  },
}));

export default useCart;
