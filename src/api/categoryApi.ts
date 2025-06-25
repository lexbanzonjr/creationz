import axios from "axios";
import { Category } from "../types/global";

export const addCategory = async ({
  token,
  category,
}: {
  token: string;
  category: Partial<Category>;
}) => {
  const response = await axios.post(
    "https://localhost:5000/category",
    category,
    {
      headers: {
        Authorization: `Basic ${token}`,
      },
    }
  );

  return response.data.category as Category;
};

export const deleteCategory = async ({
  token,
  category,
}: {
  token: string;
  category: Category;
}) => {
  try {
    await axios.delete("https://localhost:5000/category", {
      params: { _id: category._id },
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
  } catch (error: any) {}
};

export const getCateogy = async ({
  token,
  __id,
}: {
  token: string;
  __id: string;
}) => {
  try {
    const response = await axios.get(
      `https://localhost:5000/category/${__id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.categories as Category[];
  } catch (err: any) {}
  return null;
};

export const getCategories = async (
  props: { token?: string; populate: boolean } = {
    token: "",
    populate: false,
  }
) => {
  try {
    // API call to register the account
    const response = await axios.get("https://localhost:5000/category", {
      headers: !props.token
        ? {}
        : {
            Authorization: `Bearer ${props.token}`,
          },
      params: {
        populate: props.populate,
      },
    });
    return response.data.categories as Category[];
  } catch (err: any) {}
  return [];
};

export const updateCategory = async ({
  token,
  category,
}: {
  token: string;
  category: Category;
}) => {
  const response = await axios.put(
    "https://localhost:5000/category",
    category,
    {
      headers: {
        Authorization: `Basic ${token}`,
      },
    }
  );

  return response.data.category as Category;
};
