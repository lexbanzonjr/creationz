import axios from "axios";
import { Cart, Product } from "../types/global";

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
  await axios.post("https://localhost:5000/user/cart", body, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
};

export interface GetParams {
  token: String;
}
export const get = async ({ token }: GetParams) => {
  const response = await axios.get("https://localhost:5000/user/cart", {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return response.data.cart as Cart;
};

export interface GetSubtotalParams {
  token: String;
}
export interface GetSubtotalData {
  subTotal: number;
}
export const getSubtotal = async ({ token }: GetSubtotalParams) => {
  const response = await axios.get(
    "https://localhost:5000/user/cart/subtotal",
    {
      headers: {
        Authorization: `Basic ${token}`,
      },
    }
  );
  return response.data as GetSubtotalData;
};
