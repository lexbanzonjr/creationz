import axios from "axios";
import { Product } from "../types/Product";

export const getProducts = async (props: { accessToken: string }) => {
  try {
    // API call to register the account
    const response = await axios.get("https://localhost:5000/product", {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    });
    return response.data.products as Product[];
  } catch (err: any) {}
  return [];
};
