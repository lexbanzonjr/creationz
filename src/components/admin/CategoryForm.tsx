import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { Design } from "../../types/Design";
import { Category } from "../../types/Category";
import styles from "./CategoryForm.module.css";
import RemoveButton from "./../RemoveButton";

interface CategoryFormProps {
  addCategory: (category: Category) => void;
}

const blankCategory: Category = {
  _id: "",
  name: "",
  designs: [],
};

const blankDesign: Design = {
  name: "",
  type: "",
};

const CategoryForm: React.FC<CategoryFormProps> = (props) => {
  const [category, setCategory] = useState<Category>(blankCategory);
  const [design, setDesign] = useState<Design>(blankDesign);

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
    {
      headerName: "Actions",
      cellRenderer: (params: ICellRendererParams<Design>) => {
        return (
          <RemoveButton
            onClick={() => handleRemoveBtnClick(params.data?.name ?? "")}
          />
        );
      },
      flex: 0.5,
    },
  ];

  const handleAddCategoryBtnClick = () => {
    props.addCategory(category);
    setCategory(blankCategory);
    setDesign(blankDesign);
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

  const handleRemoveBtnClick = (name: string) => {
    setCategory((prev) => ({
      ...prev,
      designs: prev.designs.filter((design) => design.name !== name),
    }));
  };

  return (
    <div className={styles["category-form"]}>
      <h2>Add Category</h2>
      <form>
        <div className={styles["category-name"]}>
          <label>
            Name: <br />
            <small>
              A category are used to group products together.
              <br />
              For example: t-shirts, sashes, headbands, bags
            </small>
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
          <label>
            Designs:
            <br />
            <small>Designs offer customers to choose design options.</small>
          </label>

          <div className={styles["category-designs"]}>
            <label>
              Name:
              <br />
              <small>For example: color shirt, color bag, color font.</small>
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
              <br />
              <small>
                Select type of choice <br />
                <br />
              </small>
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
        <button onClick={handleAddCategoryBtnClick} type="button">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
