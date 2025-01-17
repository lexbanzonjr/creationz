import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { Category } from "../../types/global";
import useStore from "../../hooks/useAdminStore";
import { useAuth } from "../../context/AuthContext";
import RemoveButton from "../RemoveButton";
import EditButton from "../EditButton";

const CategoryList = () => {
  const { categories, deleteCategory, setActiveCategory } = useStore();
  const { getAccessToken } = useAuth();

  // Define column definitions for AG Grid
  const columnDefs: ColDef[] = [
    {
      headerName: "Category Name",
      field: "name",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Actions",
      cellRenderer: (params: ICellRendererParams<Category>) => {
        if (params.data === undefined) {
          return;
        }
        return (
          <div className="inline-block">
            <div className="float-left p-1">
              <RemoveButton
                onClick={() =>
                  deleteCategory(getAccessToken, params.data as Category)
                }
              />
            </div>
            <div className="float-left p-1">
              <EditButton
                onClick={() => setActiveCategory(params.data as Category)}
              />
            </div>
          </div>
        );
      },
      flex: 0.5,
    },
  ];

  return (
    <div
      id="category-list"
      className="ag-theme-alpine"
      style={{ height: 200, width: "100%" }}
    >
      <h2 className="text-center text-black font-bold text-xl mb-5 font-arial">
        Category List
      </h2>
      <AgGridReact
        rowData={categories}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, resizable: true }}
      />
    </div>
  );
};

export default CategoryList;
