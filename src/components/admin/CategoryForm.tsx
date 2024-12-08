import React, { useState } from "react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { Category, Design } from "../../types/global";
import styles from "./CategoryForm.module.css";
import useStore from "../../hooks/useAdminStore";
import { useAuth } from "../../context/AuthContext";

const blankCategory: Category = {
  _id: "",
  name: "",
  designs: [],
};

const CategoryForm = () => {
  const [category, setCategory] = useState<Category>(blankCategory);
  const {
    activeCategory,
    categories,
    addCategory,
    deleteCategory,
    setActiveCategory,
    setCategories,
  } = useStore();
  const { getAccessToken } = useAuth();

  // Define column definitions for AG Grid
  const columnDefs: ColDef[] = [
    {
      headerName: "Category Name",
      field: "name",
      sortable: true,
      filter: true,
      flex: 1,
      editable: true,
    },
    {
      headerName: "Actions",
      cellRenderer: (params: ICellRendererParams<Category>) => {
        return (
          <button
            type="button"
            onClick={() =>
              deleteCategory(getAccessToken, params.data as Category)
            }
            style={{ cursor: "pointer", padding: "5px 10px", color: "red" }}
          >
            Remove
          </button>
        );
      },
      flex: 0.5,
    },
  ];

  const handleAddCategoryBtnClick = () => {
    addCategory(getAccessToken, category);
    setCategory(blankCategory);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "category-name") {
      setCategory((prev) => ({
        ...prev,
        name: value,
      }));
    }
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

        <br />
        <button onClick={handleAddCategoryBtnClick} type="button">
          Add Category
        </button>
      </form>
      <br />
      <h2>Category List</h2>
      <div className="ag-theme-alpine" style={{ height: "50%", width: "100%" }}>
        <AgGridReact
          rowData={categories}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, resizable: true }}
          onCellValueChanged={(params) => {
            const updatedCategory = params.data as Category;
            setCategories(
              categories.map((category) =>
                category._id === updatedCategory._id
                  ? updatedCategory
                  : category
              )
            );
          }}
        />
      </div>
    </div>
  );
};

export default CategoryForm;
