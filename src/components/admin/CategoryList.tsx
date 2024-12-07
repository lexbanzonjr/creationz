import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import styles from "./CategoryList.module.css";
import { Category, Design } from "../../types/global";
import useStore from "../../hooks/useAdminStore";
import { useAuth } from "../../context/AuthContext";

const CategoryList = () => {
  const { getAccessToken } = useAuth();
  const { categories, deleteCategory, setCategories } = useStore();

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
        const designs = params.value as Design[];
        return designs
          .map((design) => `${design.name} (${design.type})`)
          .join(", ");
      },
      flex: 2,
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

  return (
    <div className={styles["category-list"]}>
      <h2>Category List</h2>
      <div className="ag-theme-alpine" style={{ height: 650, width: "100%" }}>
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

export default CategoryList;
