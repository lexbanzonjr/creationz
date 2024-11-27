import React, { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

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

  const columnDefs: ColDef[] = [
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Type",
      field: "type",
      flex: 2,
    },
  ];

  const addProperty = () => {
    setCategory((prev) => ({
      ...prev,
      designs: [...prev.designs, { name: "", type: "" }],
    }));
  };

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

        <div>
          <label>Designs:</label>
          <div className={styles["property-fields"]}>
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Type:
              <input type="text" name="type" required />
            </label>
            <button
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

        <div className="ag-theme-alpine" style={{ height: 200, width: "100%" }}>
          <AgGridReact
            rowData={category.designs}
            columnDefs={columnDefs}
            defaultColDef={{ flex: 1, resizable: true }}
          />
        </div>

        <br />
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
