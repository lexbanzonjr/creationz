import { httpClient } from "../httpClient";
import { Product } from "../types/global";

export const addProduct = async ({ product }: { product: Product }) => {
  const response = await httpClient.post("/product", product);
  return response.data.product as Product;
};

export const deleteProduct = async ({ product }: { product: Product }) => {
  await httpClient.delete("/product", {
    params: { _id: product._id },
  });
};

export const getProduct = async ({ _id }: { _id: string }) => {
  const response = await httpClient.get(`/product/${_id}`);
  return response.data.product as Product;
};

export const getProducts = async () => {
  try {
    // API call to register the account
    const response = await httpClient.get("/product");
    return response.data.products as Product[];
  } catch (err: any) {}
  return [];
};

export const updateProduct = async ({ product }: { product: Product }) => {
  const response = await httpClient.put("/product", product);
  return response.data.product as Product;
};
