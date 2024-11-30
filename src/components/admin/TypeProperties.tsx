import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Type } from "../../types/Type";

interface TypePropertiesProps {
  type: Type;
}

const TypeProperties: React.FC<TypePropertiesProps> = (props) => {
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
    <div className="block w-[800px] h-[800px] mx-auto bg-white p-5 rounded-lg shadow-md ml-[500px]">
      <h2 className="text-center text-black font-bold text-xl mb-5">
        Type Properties
      </h2>
      <label className="block my-2 font-bold text-[#34495e]">Options:</label>
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

export default TypeProperties;
