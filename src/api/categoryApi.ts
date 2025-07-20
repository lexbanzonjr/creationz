import { httpClient } from "../httpClient";
import { Category } from "../types/global";

export const addCategory = async ({
  category,
}: {
  category: Partial<Category>;
}) => {
  const response = await httpClient.post("/category", category);

  return response.data.category as Category;
};

export const deleteCategory = async ({ category }: { category: Category }) => {
  try {
    await httpClient.delete("/category", {
      params: { _id: category._id },
    });
  } catch (error: any) {}
};

export const getCateogy = async ({ __id }: { __id: string }) => {
  try {
    const response = await httpClient.get(`/category/${__id}`);
    return response.data.categories as Category[];
  } catch (err: any) {}
  return null;
};

export const getCategories = async (
  props: { populate: boolean } = {
    populate: false,
  }
) => {
  try {
    // API call to register the account
    const response = await httpClient.get("https://localhost:5000/category", {
      params: {
        populate: props.populate,
      },
    });
    return response.data.categories as Category[];
  } catch (err: any) {}
  return [];
};

export const updateCategory = async ({ category }: { category: Category }) => {
  const response = await httpClient.put("/category", category);

  return response.data.category as Category;
};
