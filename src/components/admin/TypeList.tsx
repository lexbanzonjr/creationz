import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import styles from "./TypeList.module.css";
import { Type } from "../../types/Type";

interface CategoryListProps {
  type: Type;
}

const TypeList: React.FC<CategoryListProps> = (props) => {
  // Define column definitions for AG Grid
  const columnDefs: ColDef[] = [
    {
      headerName: "Option name",
      field: "name",
      sortable: true,
      filter: true,
      flex: 1,
      editable: true, // Allow inline editing for category name
    },
  ];

  return (
    <div className={styles["type-list"]}>
      <h2>Type Properties</h2>
      <label>Options:</label>
      <div className="ag-theme-alpine" style={{ height: 650, width: "100%" }}>
        <AgGridReact
          rowData={props.type.options}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, resizable: true }}
        />
      </div>
    </div>
  );
};

export default TypeList;
