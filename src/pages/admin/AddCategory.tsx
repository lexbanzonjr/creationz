import React, { useState } from "react";
import styles from "./AddCategory.module.css";

interface Category {
  name: string;
  properties: { name: string; type: string }[];
}

const blankCategory: Category = {
  name: "",
  properties: [],
};

const AddCategory: React.FC = () => {
  const [category, setCategory] = useState<Category>(blankCategory);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePropertyChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCategory((prev) => {
      const updatedProperties = [...prev.properties];
      updatedProperties[index] = {
        ...updatedProperties[index],
        [name]: value,
      };
      return { ...prev, properties: updatedProperties };
    });
  };

  const addProperty = () => {
    setCategory((prev) => ({
      ...prev,
      properties: [...prev.properties, { name: "", type: "" }],
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

        <h3>Properties</h3>
        {category.properties.map((property, index) => (
          <div key={index} className={styles["property"]}>
            <div className={styles["property-fields"]}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={property.name}
                  onChange={(e) => handlePropertyChange(index, e)}
                  required
                />
              </label>
              <label>
                Type:
                <input
                  type="text"
                  name="type"
                  value={property.type}
                  onChange={(e) => handlePropertyChange(index, e)}
                  required
                />
              </label>
            </div>
          </div>
        ))}

        <button type="button" onClick={addProperty}>
          Add Property
        </button>
        <br />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
