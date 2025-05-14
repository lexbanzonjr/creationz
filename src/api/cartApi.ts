import axios from "axios";
import { Cart, Product } from "../types/global";

export interface AddProductParams {
  product: Product;
  quantity: number;
  accessToken: string;
}
export const addProduct = async ({
  product,
  quantity,
  accessToken,
}: AddProductParams) => {
  const body = {
    product,
    quantity,
  };
  await axios.post("https://localhost:5000/user/cart", body, {
    headers: {
      Authorization: `Basic ${accessToken}`,
    },
  });
};

export interface GetParams {
  accessToken: String;
}
export const get = async ({ accessToken }: GetParams) => {
  const response = await axios.get("https://localhost:5000/user/cart", {
    headers: {
      Authorization: `Basic ${accessToken}`,
    },
  });
  return response.data.cart as Cart;
};

export interface GetSubtotalParams {
  accessToken: String;
}
export interface GetSubtotalData {
  subTotal: number;
}
export const getSubtotal = async ({ accessToken }: GetSubtotalParams) => {
  const response = await axios.get(
    "https://localhost:5000/user/cart/subtotal",
    {
      headers: {
        Authorization: `Basic ${accessToken}`,
      },
    }
  );
  return response.data as GetSubtotalData;
};
