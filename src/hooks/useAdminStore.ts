import { create } from "zustand";
import { Category, Option, Product, Type } from "../types/global";
import {
  addCategory as addCategoryApi,
  deleteCategory as deleteCategoryApi,
  updateCategory as updateCategoryApi,
} from "../api/categoryApi";
import {
  addProduct as addProductApi,
  deleteProduct as deleteProductApi,
  updateProduct as updateProductApi,
} from "../api/productApi";
import {
  addType as addTypeApi,
  addTypeOption as addTypeOptionApi,
  deleteType as deleteTypeApi,
} from "../api/typeApi";

const blankCategory: Category = {
  _id: "",
  name: "",
  description: "",
  designs: [],
};

const blankOption: Option = {
  _id: "",
  name: "",
};

const blankProduct: Product = {
  _id: "",
  cost: 0.0,
  name: "",
  description: "",
  image_id: [],
  category_id: "",
};

const blankType: Type = {
  _id: "",
  name: "",
  options: [],
};

const getNext = <T>(current: T, list: T[], blankObject: T) => {
  const index = list.findIndex((value) => current === value);
  if (index + 1 < list.length) {
    return list[index + 1];
  } else if (list.length > 1) {
    return list[index - 1];
  }
  return blankObject;
};

interface DataState {
  categories: Category[];
  products: Product[];
  types: Type[];
  populate: boolean;

  activeCategory: Category;
  activeOption: Option;
  activeType: Type;

  addCategory: (accessToken: string, category?: Category) => Promise<Category>;
  addProduct: (accessToken: string, product?: Product) => Promise<Product>;
  addType: (accessToken: string, type: Type) => Promise<Type>;
  addTypeOption: (
    accessToken: string,
    type: Type,
    option: Option
  ) => Promise<Option>;

  deleteCategory: (accessToken: string, category: Category) => Promise<void>;
  deleteProduct: (accessToken: string, product: Product) => Promise<void>;
  deleteType: (accessToken: string, type: Type) => Promise<void>;

  resetActiveCategory: () => void;
  resetActiveType: () => void;
  resetActiveOption: () => void;

  setActiveCategory: (activeCategory: Category) => Category;
  setActiveOption: (activeOption: Option) => Option;
  setActiveType: (activeType: Type) => Type;
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

  updateCategory: (
    accessToken: string,
    category: Category
  ) => Promise<Category>;
  updateProduct: (accessToken: string, product: Product) => Promise<Product>;
}

const useStore = create<DataState>((set) => ({
  categories: [],
  products: [],
  types: [],
  populate: false,

  activeCategory: blankCategory,
  resetActiveCategory: () => {
    set({ activeCategory: blankCategory });
  },
  setActiveCategory: (activeCategory) => {
    set({ activeCategory });
    return activeCategory;
  },

  activeType: blankType,
  resetActiveType: () => {
    set({ activeType: blankType });
  },
  setActiveType: (activeType) => {
    set({ activeType });
    return activeType;
  },

  activeOption: blankOption,
  resetActiveOption: () => set({ activeOption: blankOption }),
  setActiveOption: (option) => {
    set({ activeOption: option });
    return option;
  },

  addCategory: async (accessToken, category) => {
    let newCategory = blankCategory;
    if (category) {
      newCategory = { ...newCategory, ...category };
    }
    newCategory = await addCategoryApi({ accessToken, category: newCategory });
    set((state) => {
      return { categories: [...state.categories, newCategory] };
    });
    return newCategory;
  },
  addProduct: async (accessToken, product) => {
    let newProduct = blankProduct;
    if (product) {
      newProduct = { ...newProduct, ...product };
    }
    newProduct = await addProductApi({ accessToken, product: newProduct });
    set((state) => ({ products: [...state.products, newProduct] }));
    return newProduct;
  },
  addType: async (accessToken, type) => {
    const newType = await addTypeApi({ accessToken, type });
    set((state) => ({ types: [...state.types, newType] }));
    return newType;
  },
  addTypeOption: async (accessToken: string, type: Type, option: Option) => {
    const newOption = await addTypeOptionApi(accessToken, type, option);
    set((state) => ({
      activeType: {
        ...state.activeType,
        options: [...state.activeType.options, newOption],
      },
    }));
    return newOption;
  },

  deleteCategory: async (accessToken, category) => {
    await deleteCategoryApi({ accessToken, category });
    set((state) => ({
      categories: state.categories.filter((item) => item._id !== category._id),
      activeCategory:
        category._id === state.activeCategory._id
          ? getNext(category, state.categories, blankCategory)
          : state.activeCategory,
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
      activeType:
        type === state.activeType
          ? getNext(type, state.types, blankType)
          : state.activeType,
    }));
  },

  setCategories: (categories) => {
    set(() => ({
      categories: categories.map((category) => ({
        ...blankCategory,
        category,
      })),
    }));
  },
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

  updateCategory: async (accessToken: string, category: Category) => {
    const updateCategory = await updateCategoryApi({ accessToken, category });
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat._id === category._id ? { ...cat, ...category } : cat
      ),
    }));
    return updateCategory;
  },
  updateProduct: async (accessToken: string, product: Product) => {
    const updateProduct = await updateProductApi({ accessToken, product });
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat._id === product._id ? { ...cat, ...product } : cat
      ),
    }));
    return updateProduct;
  },
}));

export default useStore;
