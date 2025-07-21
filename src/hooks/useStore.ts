import { create } from "zustand";
import { getProduct as getProductApi } from "../api/productApi";
import { Product } from "../types/global";

interface DataState {
  products: Product[];
  getProductById: (id: string) => Promise<Product | undefined>;
}

const useStore = create<DataState>((set, get) => ({
  products: [],
  getProductById: async (id) => {
    const state = get();
    let product = state.products.find((product) => product._id === id);
    if (!product) {
      product = await getProductApi({ _id: id });
    }
    console.log("Fetched product:", product);
    if (!product) return undefined;

    // Type assertion or additional check to ensure product is defined
    const validProduct = product as Product;
    set((state) => ({
      products: [...state.products, validProduct],
    }));
    return validProduct;
  },
}));

export default useStore;
