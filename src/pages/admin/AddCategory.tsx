import React, { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";

import { CategoryProps } from "./Category";
import styles from "./AddCategory.module.css";

interface AddCategoryProps {
  addCategory: (category: CategoryProps) => void;
}

const blankCategory: CategoryProps = {
  _id: 0,
  name: "",
  designs: [],
};

const AddCategory: React.FC<AddCategoryProps> = (props) => {
  const [category, setCategory] = useState<CategoryProps>(blankCategory);

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
      const updatedProperties = [...prev.designs];
      updatedProperties[index] = {
        ...updatedProperties[index],
        [name]: value,
      };
      return { ...prev, designs: updatedProperties };
    });
  };

  const addProperty = () => {
    setCategory((prev) => ({
      ...prev,
      designs: [...prev.designs, { name: "", type: "" }],
    }));
  };

  const handleRemoveBtnClick = (index: number) => {
    setCategory((prev) => ({
      ...prev,
      designs: prev.designs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    props.addCategory(category);
  };

  return (
    <div className={styles["add-category"]}>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["category-name"]}>
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
        </div>

        <h3>Properties</h3>
        {category.designs.map((property, index) => (
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
              <button
                onClick={() => handleRemoveBtnClick(index)}
                style={{
                  backgroundColor: "red",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                aria-label="Remove item"
              >
                <RemoveIcon style={{ color: "white" }} />
              </button>
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
