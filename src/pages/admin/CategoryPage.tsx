import { useEffect, useState } from "react";
import axios from "axios";

import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import { useAuth } from "../../context/AuthContext";
import { Category } from "../../types/Category";

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { getAccessToken } = useAuth();

  const handleAddCategory = async (category: Category) => {
    try {
      await axios.post("https://localhost:5000/category", category, {
        headers: {
          Authorization: `Basic ${getAccessToken}`,
        },
      });
    } catch (error: any) {
      if (error.response.status !== 200)
        alert(
          "Status code: " +
            error.response.status +
            ". " +
            error.response.data.error
        );
    }

    setCategories((prevCategories) => [...prevCategories, category]);
  };

  const handleDeleteCategory = async (category: Category) => {
    try {
      await axios.delete("https://localhost:5000/category", {
        params: { _id: category._id },
        headers: {
          Authorization: `Basic ${getAccessToken}`,
        },
      });
    } catch (error: any) {
      if (error.response.status !== 200)
        alert(
          "Status code: " +
            error.response.status +
            ". " +
            error.response.data.error
        );
    }

    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat._id !== category._id)
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // API call to register the account
        const response = await axios.get("https://localhost:5000/category", {
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        });
        setCategories(response.data.categories);
      } catch (err: any) {}
    };
    fetchCategories();
  }, [getAccessToken]);

  return (
    <div>
      <CategoryForm addCategory={handleAddCategory} />
      <CategoryList
        categories={categories}
        handleDeleteCategory={handleDeleteCategory}
        setCategories={setCategories}
      />
    </div>
  );
};

export default CategoryPage;