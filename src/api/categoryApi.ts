import axios from "axios";
import { Category } from "../types/Category";

export const getCategories = async (props: { accessToken: string }) => {
  try {
    // API call to register the account
    const response = await axios.get("https://localhost:5000/category", {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    });
    return response.data.categories as Category[];
  } catch (err: any) {}
  return [];
};
