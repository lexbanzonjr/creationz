import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { CategoryProps, DesignProps } from "./Category";
import styles from "./AddCategory.module.css";

interface AddCategoryProps {
  addCategory: (category: CategoryProps) => void;
}

const blankCategory: CategoryProps = {
  _id: 0,
  name: "",
  designs: [],
};

const blankDesign: DesignProps = {
  name: "",
  type: "",
};

const AddCategory: React.FC<AddCategoryProps> = (props) => {
  const [category, setCategory] = useState<CategoryProps>(blankCategory);
  const [design, setDesign] = useState<DesignProps>(blankDesign);

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
    if (name === "category-name") {
      setCategory((prev) => ({
        ...prev,
        name: value,
      }));
    } else if (name === "design-name") {
      setDesign((prev) => ({
        ...prev,
        name: value,
      }));
    } else if (name === "design-type") {
      setDesign((prev) => ({
        ...prev,
        type: value,
      }));
    }
  };

  const handleAddDesignBtnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setCategory((prev) => ({
      ...prev,
      designs: [design, ...prev.designs],
    }));
    setDesign(blankDesign);
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
              name="category-name"
              value={category.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>Designs:</label>
          <div className={styles["category-designs"]}>
            <label>
              Name:
              <input
                type="text"
                name="design-name"
                value={design.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                name="design-type"
                value={design.type}
                onChange={handleChange}
                required
              />
            </label>
            <button
              type="button"
              onClick={handleAddDesignBtnClick}
              style={{
                backgroundColor: "green",
                border: "none",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              aria-label="Add design"
            >
              <AddIcon style={{ color: "white" }} />
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
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
