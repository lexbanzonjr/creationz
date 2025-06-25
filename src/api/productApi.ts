import axios from "axios";
import { Product } from "../types/global";

export const addProduct = async ({
  token,
  product,
}: {
  token: string;
  product: Product;
}) => {
  const response = await axios.post("https://localhost:5000/product", product, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return response.data.product as Product;
};

export const deleteProduct = async ({
  token,
  product,
}: {
  token: string;
  product: Product;
}) => {
  await axios.delete("https://localhost:5000/product", {
    params: { _id: product._id },
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
};

export const getProducts = async (props?: { token?: string }) => {
  try {
    // API call to register the account
    const response = await axios.get("https://localhost:5000/product", {
      headers: !props?.token
        ? {}
        : {
            Authorization: `Bearer ${props.token}`,
          },
    });
    return response.data.products as Product[];
  } catch (err: any) {}
  return [];
};

export const updateProduct = async ({
  token,
  product,
}: {
  token: string;
  product: Product;
}) => {
  const response = await axios.put("https://localhost:5000/product", product, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return response.data.product as Product;
};
