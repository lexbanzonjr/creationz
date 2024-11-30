import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Type } from "../../types/Type";
import GreenButton from "../GreenButton";

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
    <div>
      <h2 className="text-center text-black font-bold text-xl mb-5">
        Edit type properties
      </h2>
      <label className="block my-2 font-bold text-[#34495e]">Option:</label>
      <form>
        <div>
          <label className="block my-2 font-bold text-[#34495e]">
            Name: <br />
            <small className="text-gray-500">Enter a name for the type</small>
            <input
              type="text"
              name="name"
              className="w-full p-2.5 mb-4 border border-[#bdc3c7] rounded-md text-sm"
              required
            />
          </label>
          <GreenButton type="button">Add Type</GreenButton>
        </div>
      </form>

      <label className="block my-2 font-bold text-[#34495e]">
        Option list:
      </label>
      <div className="ag-theme-alpine" style={{ height: 350, width: "100%" }}>
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
