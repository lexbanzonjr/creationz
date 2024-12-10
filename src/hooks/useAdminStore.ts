import { create } from "zustand";
import { Category, Product, Type } from "../types/global";
import {
  addCategory as addCategoryApi,
  deleteCategory as deleteCategoryApi,
} from "../api/categoryApi";
import {
  addProduct as addProductApi,
  deleteProduct as deleteProductApi,
} from "../api/productApi";
import { deleteType as deleteTypeApi } from "../api/typeApi";

interface DataState {
  categories: Category[];
  products: Product[];
  types: Type[];
  populate: boolean;

  activeCategory?: Category;
  setActiveCategory: (activeCategory: Category) => void;

  addCategory: (accessToken: string, category: Category) => Promise<Category>;
  addProduct: (accessToken: string, product: Product) => Promise<Product>;

  deleteCategory: (accessToken: string, category: Category) => Promise<void>;
  deleteProduct: (accessToken: string, product: Product) => Promise<void>;
  deleteType: (accessToken: string, type: Type) => Promise<void>;

  setCategories: (categories: Category[]) => void;
  setProducts: (products: Product[]) => void;
  setTypes: (types: Type[]) => void;
  setPopulate: (populate: boolean) => void;
  setAllData: ({
    categories,
    products,
    types,
    populate,
  }: {
    categories: Category[];
    products: Product[];
    types: Type[];
    populate: boolean;
  }) => void;
}

const useStore = create<DataState>((set) => ({
  categories: [],
  products: [],
  types: [],
  populate: false,

  activeCategory: undefined,
  setActiveCategory: (activeCategory) => {
    set({ activeCategory });
  },

  addCategory: async (accessToken, category) => {
    const newCategory = await addCategoryApi({ accessToken, category });
    set((state) => {
      return { categories: [...state.categories, newCategory] };
    });
    return newCategory;
  },
  addProduct: async (accessToken, product) => {
    const newProduct = await addProductApi({ accessToken, product });
    set((state) => ({ products: [...state.products, newProduct] }));
    return newProduct;
  },

  deleteCategory: async (accessToken, category) => {
    await deleteCategoryApi({ accessToken, category });
    set((state) => ({
      categories: state.categories.filter((item) => item._id !== category._id),
    }));
  },
  deleteProduct: async (accessToken, product) => {
    await deleteProductApi({ accessToken, product });
    set((state) => ({
      products: state.products.filter((item) => item._id !== product._id),
    }));
  },
  deleteType: async (accessToken, type) => {
    await deleteTypeApi({ accessToken, type });
    set((state) => ({
      types: state.types.filter((item) => item._id !== type._id),
    }));
  },

  setCategories: (categories) => set({ categories }),
  setProducts: (products) => set({ products }),
  setTypes: (types) => set({ types }),
  setPopulate: (populate) => set({ populate }),

  setAllData: ({
    categories,
    products,
    types,
    populate,
  }: {
    categories: Category[];
    products: Product[];
    types: Type[];
    populate: boolean;
  }) => set({ categories, products, types, populate }),
}));

export default useStore;
