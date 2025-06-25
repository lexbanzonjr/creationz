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

  addBinary: (token: string, binary: Binary) => Promise<Binary>;
  addCategory: (token: string, category?: Category) => Promise<Category>;
  addProduct: (token: string, product?: Product) => Promise<Product>;
  addType: (token: string, type: Type) => Promise<Type>;
  addTypeOption: (token: string, type: Type, option: Option) => Promise<Option>;

  deleteBinary: (token: string, binary: Binary) => Promise<void>;
  deleteCategory: (token: string, category: Category) => Promise<void>;
  deleteProduct: (token: string, product: Product) => Promise<void>;
  deleteType: (token: string, type: Type) => Promise<void>;

  getBinary: (token: string, _id: string) => Promise<Binary>;

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

  updateCategory: (token: string, category: Category) => Promise<Category>;
  updateProduct: (token: string, product: Product) => Promise<Product>;
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

  addBinary: async (token, binary) => {
    return await addBinaryApi({ token, binary });
  },
  addCategory: async (token, category) => {
    let newCategory = blankCategory;
    if (category) {
      newCategory = { ...newCategory, ...category };
    }
    newCategory = await addCategoryApi({
      token,
      category: newCategory,
    });
    set((state) => {
      return { categories: [...state.categories, newCategory] };
    });
    return newCategory;
  },
  addProduct: async (token, product) => {
    let newProduct = blankProduct;
    if (product) {
      newProduct = { ...newProduct, ...product };
    }
    newProduct = await addProductApi({
      token,
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

  deleteBinary: async (token, binary) => {
    await deleteBinaryApi({ token, binary });
  },
  deleteCategory: async (token, category) => {
    await deleteCategoryApi({ token, category });
    set((state) => ({
      categories: state.categories.filter((item) => item._id !== category._id),
      activeCategory:
        category._id === state.activeCategory._id
          ? getNext(category, state.categories, blankCategory)
          : state.activeCategory,
    }));
  },
  deleteProduct: async (token, product) => {
    await deleteProductApi({ token, product });
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

  getBinary: async (token, _id) => {
    return await getBinary({ token, _id });
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

  updateCategory: async (token: string, category: Category) => {
    const updateCategory = await updateCategoryApi({ token, category });
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat._id === category._id ? { ...cat, ...category } : cat
      ),
    }));
    return updateCategory;
  },
  updateProduct: async (token: string, product: Product) => {
    const updateProduct = await updateProductApi({ token, product });
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat._id === product._id ? { ...cat, ...product } : cat
      ),
    }));
    return updateProduct;
  },
}));

export default useStore;
