import axios from "axios";
import { Product } from "../types/global";

export const addProduct = async ({
  accessToken,
  product,
}: {
  accessToken: string;
  product: Product;
}) => {
  const response = await axios.post("https://localhost:5000/product", product, {
    headers: {
      Authorization: `Basic ${accessToken}`,
    },
  });

  return response.data.product as Product;
};

export const deleteProduct = async ({
  accessToken,
  product,
}: {
  accessToken: string;
  product: Product;
}) => {
  await axios.delete("https://localhost:5000/product", {
    params: { _id: product._id },
    headers: {
      Authorization: `Basic ${accessToken}`,
    },
  });
};

export const getProducts = async (props?: { accessToken?: string }) => {
  try {
    // API call to register the account
    const response = await axios.get("https://localhost:5000/product", {
      headers: !props?.accessToken
        ? {}
        : {
            Authorization: `Bearer ${props.accessToken}`,
          },
    });
    return response.data.products as Product[];
  } catch (err: any) {}
  return [];
};

export const updateProduct = async ({
  accessToken,
  product,
}: {
  accessToken: string;
  product: Product;
}) => {
  const response = await axios.put("https://localhost:5000/product", product, {
    headers: {
      Authorization: `Basic ${accessToken}`,
    },
  });

  return response.data.product as Product;
};
