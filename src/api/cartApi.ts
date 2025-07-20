import axios from "axios";
import { Cart, Product } from "../types/global";
import { httpClient } from "../httpClient";

export interface AddProductParams {
  product: Product;
  quantity: number;
  token: string;
}
export const addProduct = async ({
  product,
  quantity,
  token,
}: AddProductParams) => {
  const body = {
    product,
    quantity,
  };
  await httpClient.post("/cart", body);
};

export interface GetParams {
  token: String;
}
export const get = async ({ token }: GetParams) => {
  const response = await httpClient.get("/cart");
  return response.data.cart as Cart;
};

export interface GetSubtotalParams {
  token: String;
}
export interface GetSubtotalData {
  subTotal: number;
}
export const getSubtotal = async ({ token }: GetSubtotalParams) => {
  const response = await httpClient.get("/cart/subtotal");
  return response.data as GetSubtotalData;
};
