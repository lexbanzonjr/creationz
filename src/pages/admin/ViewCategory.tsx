import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import styles from "./ViewCategory.module.css";
import { CategoryProps, DesignProps } from "./Category";

interface CategoryListProps {
  categories: CategoryProps[];

  setCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>;
}

const CategoryList: React.FC<CategoryListProps> = (props) => {
  // Define column definitions for AG Grid
  const columnDefs: ColDef[] = [
    {
      headerName: "Category Name",
      field: "name",
      sortable: true,
      filter: true,
      flex: 1,
      editable: true, // Allow inline editing for category name
    },
    {
      headerName: "Designs",
      field: "designs",
      cellRenderer: (params: any) => {
        const designs = params.value as DesignProps[];
        return designs
          .map((design) => `${design.name} (${design.type})`)
          .join(", ");
      },
      flex: 2,
    },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => {
        return (
          <button
            onClick={() => handleRemoveCategory(params.data.id)}
            style={{ cursor: "pointer", padding: "5px 10px", color: "red" }}
          >
            Remove
          </button>
        );
      },
      flex: 0.5,
    },
  ];

  // Handle removing a category
  const handleRemoveCategory = (id: number) => {
    props.setCategories((prevCategories) =>
      prevCategories.filter((category) => category._id !== id)
    );
  };

  return (
    <div className={styles["view-category"]}>
      <h2>Category List</h2>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={props.categories}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, resizable: true }}
          onCellValueChanged={(params) => {
            const updatedCategory = params.data as CategoryProps;
            props.setCategories((prevCategories) =>
              prevCategories.map((category) =>
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

export default CategoryList;
