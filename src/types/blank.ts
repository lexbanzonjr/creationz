import { Binary, Category, Option, Product, Type } from "./global";

export const blankBinary: Binary = {
  _id: "",
  name: "",
  //   data: null,
  "content-type": "",
};

export const blankCategory: Category = {
  _id: "",
  name: "",
  description: "",
  designs: [],
};

export const blankOption: Option = {
  _id: "",
  name: "",
};

export const blankProduct: Product = {
  _id: "",
  cost: 0.0,
  name: "",
  description: "",
  image_id: [],
  categories: [],
};

export const blankType: Type = {
  _id: "",
  name: "",
  options: [],
};
