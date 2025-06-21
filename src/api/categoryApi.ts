import axios from "axios";
import { Category } from "../types/global";

export const addCategory = async ({
  accessToken,
  category,
}: {
  accessToken: string;
  category: Partial<Category>;
}) => {
  const response = await axios.post(
    "https://localhost:5000/category",
    category,
    {
      headers: {
        Authorization: `Basic ${accessToken}`,
      },
    }
  );

  return response.data.category as Category;
};

export const deleteCategory = async ({
  accessToken,
  category,
}: {
  accessToken: string;
  category: Category;
}) => {
  try {
    await axios.delete("https://localhost:5000/category", {
      params: { _id: category._id },
      headers: {
        Authorization: `Basic ${accessToken}`,
      },
    });
  } catch (error: any) {}
};

export const getCateogy = async ({
  accessToken,
  __id,
}: {
  accessToken: string;
  __id: string;
}) => {
  try {
    const response = await axios.get(
      `https://localhost:5000/category/${__id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.categories as Category[];
  } catch (err: any) {}
  return null;
};

export const getCategories = async (
  props: { accessToken?: string; populate: boolean } = {
    accessToken: "",
    populate: false,
  }
) => {
  try {
    // API call to register the account
    const response = await axios.get("https://localhost:5000/category", {
      headers: !props.accessToken
        ? {}
        : {
            Authorization: `Bearer ${props.accessToken}`,
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
  accessToken,
  category,
}: {
  accessToken: string;
  category: Category;
}) => {
  const response = await axios.put(
    "https://localhost:5000/category",
    category,
    {
      headers: {
        Authorization: `Basic ${accessToken}`,
      },
    }
  );

  return response.data.category as Category;
};
