import { create } from "zustand";
import {
  addProduct as addProductApi,
  get as getApi,
  getSubtotal as getSubtotalApi,
} from "../api/cartApi";
import { Cart, Product } from "../types/global";

interface AddItemParams {
  accessToken: string;
  product: Product;
  quantity: number;
}

interface CalculateSubtotalParams {
  accessToken: string;
}

interface FetchParams {
  accessToken: string;
}

interface DataState {
  cart: Cart;
  addItem: (item: AddItemParams) => void;
  calculateSubTotal: (params: CalculateSubtotalParams) => Promise<string>;
  fetch: (params: FetchParams) => Promise<void>;
}

const useCart = create<DataState>((set) => ({
  cart: { items: [] },
  addItem: async ({ accessToken, product, quantity }: AddItemParams) => {
    addProductApi({ accessToken, product, quantity });
  },
  calculateSubTotal: async ({ accessToken }: CalculateSubtotalParams) => {
    const data = await getSubtotalApi({ accessToken });
    return data.subTotal.toFixed(2);
  },
  fetch: async ({ accessToken }: FetchParams) => {
    const cart = await getApi({ accessToken });
    set({ cart });
  },
}));

export default useCart;
