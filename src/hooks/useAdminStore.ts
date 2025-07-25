import { create } from "zustand";
import { Binary, Category, Option, Product, Type } from "../types/global";
import {
  addBinary as addBinaryApi,
  deleteBinary as deleteBinaryApi,
  getBinary,
} from "../api/binaryApi";
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
import {
  blankCategory,
  blankOption,
  blankProduct,
  blankType,
} from "../types/blank";

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

  addBinary: (binary: Binary) => Promise<Binary>;
  addCategory: (category?: Category) => Promise<Category>;
  addProduct: (product?: Product) => Promise<Product>;
  addType: (token: string, type: Type) => Promise<Type>;
  addTypeOption: (token: string, type: Type, option: Option) => Promise<Option>;

  deleteBinary: (binary: Binary) => Promise<void>;
  deleteCategory: (category: Category) => Promise<void>;
  deleteProduct: (product: Product) => Promise<void>;
  deleteType: (token: string, type: Type) => Promise<void>;

  getBinary: (_id: string) => Promise<Binary>;

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

  updateCategory: (category: Category) => Promise<Category>;
  updateProduct: (product: Product) => Promise<Product>;
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

  addBinary: async (binary) => {
    return await addBinaryApi({ binary });
  },
  addCategory: async (category) => {
    let newCategory = blankCategory;
    if (category) {
      newCategory = { ...newCategory, ...category };
    }
    newCategory = await addCategoryApi({
      category: newCategory,
    });
    set((state) => {
      return { categories: [...state.categories, newCategory] };
    });
    return newCategory;
  },
  addProduct: async (product) => {
    let newProduct = blankProduct;
    if (product) {
      newProduct = { ...newProduct, ...product };
    }
    newProduct = await addProductApi({
      product: newProduct,
    });
    set((state) => ({ products: [...state.products, newProduct] }));
    return newProduct;
  },
  addType: async (token, type) => {
    const newType = await addTypeApi({ token, type });
    set((state) => ({ types: [...state.types, newType] }));
    return newType;
  },
  addTypeOption: async (token: string, type: Type, option: Option) => {
    const newOption = await addTypeOptionApi(token, type, option);
    set((state) => ({
      activeType: {
        ...state.activeType,
        options: [...state.activeType.options, newOption],
      },
    }));
    return newOption;
  },

  deleteBinary: async (binary) => {
    await deleteBinaryApi({ binary });
  },
  deleteCategory: async (category) => {
    await deleteCategoryApi({ category });
    set((state) => ({
      categories: state.categories.filter((item) => item._id !== category._id),
      activeCategory:
        category._id === state.activeCategory._id
          ? getNext(category, state.categories, blankCategory)
          : state.activeCategory,
    }));
  },
  deleteProduct: async (product) => {
    await deleteProductApi({ product });
    set((state) => ({
      products: state.products.filter((item) => item._id !== product._id),
    }));
  },
  deleteType: async (token, type) => {
    await deleteTypeApi({ token, type });
    set((state) => ({
      types: state.types.filter((item) => item._id !== type._id),
      activeType:
        type === state.activeType
          ? getNext(type, state.types, blankType)
          : state.activeType,
    }));
  },

  getBinary: async (_id) => {
    return await getBinary({ _id });
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

  updateCategory: async (category: Category) => {
    const updateCategory = await updateCategoryApi({ category });
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat._id === category._id ? { ...cat, ...category } : cat
      ),
    }));
    return updateCategory;
  },
  updateProduct: async (product: Product) => {
    const updateProduct = await updateProductApi({ product });
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat._id === product._id ? { ...cat, ...product } : cat
      ),
    }));
    return updateProduct;
  },
}));

export default useStore;
