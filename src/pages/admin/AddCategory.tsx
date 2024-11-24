import React, { useState } from "react";
import styles from "./AddCategory.module.css";

interface Category {
  name: string;
  properties: { name: string; type: string }[];
}

const blankCategory = {
  name: "",
  properties: [],
};

const AddCategory: React.FC = () => {
  const [category, setCategory] = useState<Category>(blankCategory);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle other fields
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Category Added:", category);
    // Add API call here to save category to database

    // Reset form
    setCategory(blankCategory);
  };

  return (
    <div className={styles["add-category"]}>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
