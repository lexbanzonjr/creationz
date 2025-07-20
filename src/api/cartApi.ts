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
  httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // Use the httpClient instance to make the request
  httpClient.post("https://localhost:5000/cart", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export interface GetParams {
  token: String;
}
export const get = async ({ token }: GetParams) => {
  httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
  const response = await axios.get("https://localhost:5000/cart/subtotal", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as GetSubtotalData;
};
