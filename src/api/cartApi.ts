import { Cart, CartItem } from "../types/global";
import { httpClient } from "../httpClient";

export interface AddProductParams extends CartItem {}
export const addProduct = async ({ product, quantity }: AddProductParams) => {
  const body = {
    product,
    quantity,
  };
  await httpClient.post("/cart", body);
};

export const removeItem = async (item_Id: string) => {
  await httpClient.delete(`/cart?item_id=${item_Id}`);
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
