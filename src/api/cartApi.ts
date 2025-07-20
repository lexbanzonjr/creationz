import { Cart, Product } from "../types/global";
import { httpClient } from "../httpClient";

export interface AddProductParams {
  product: Product;
  quantity: number;
}
export const addProduct = async ({ product, quantity }: AddProductParams) => {
  const body = {
    product,
    quantity,
  };
  await httpClient.post("/cart", body);
};

export const get = async () => {
  const response = await httpClient.get("/cart");
  return response.data.cart as Cart;
};

export interface GetSubtotalData {
  subTotal: number;
}
export const getSubtotal = async () => {
  const response = await httpClient.get("/cart/subtotal");
  return response.data as GetSubtotalData;
};
