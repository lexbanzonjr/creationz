import { useEffect, useState } from "react";
import axios from "axios";

import AddCategory from "./AddCategory";
import ViewCategory from "./ViewCategory";
import { useAuth } from "../../context/AuthContext";

export interface PropertyProps {
  name: string;
  type: string;
}

export interface CategoryProps {
  id: number;
  name: string;
  properties: PropertyProps[];
}

const Category = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const { getAccessToken } = useAuth();

  const handleAddCategory = async (category: CategoryProps) => {
    console.log("Category added:", category);
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
      <AddCategory addCategory={handleAddCategory} />
      <ViewCategory categories={categories} setCategories={setCategories} />
    </div>
  );
};

export default Category;
