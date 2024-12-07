import React from "react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { Type } from "../../types/global";
import RemoveButton from "../RemoveButton";
import EditButton from "../EditButton";

interface TypeFormProps {
  types: Type[];

  deleteType: (type: Type) => void;
  setType: React.Dispatch<React.SetStateAction<Type>>;
}

const TypeList: React.FC<TypeFormProps> = ({ types, deleteType, setType }) => {
  const columnDefs: ColDef[] = [
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Actions",
      cellRenderer: (params: ICellRendererParams<Type>) => {
        return (
          <div className="inline-block">
            <div className="float-left p-1">
              <RemoveButton onClick={() => deleteType(params.data as Type)} />
            </div>
            <div className="float-left p-1">
              <EditButton onClick={() => setType(params.data as Type)} />
            </div>
          </div>
        );
      },
      flex: 0.5,
    },
  ];

  return (
    <div>
      <form>
        <label className="block my-2 font-bold text-[#34495e]">
          <h2 className="text-center text-black font-bold text-xl mb-5">
            List types
          </h2>
          Type List: <br />
          <small className="text-gray-500">
            Select a type to modify its properties
          </small>
        </label>
        <div className="ag-theme-alpine" style={{ height: 200, width: "100%" }}>
          <AgGridReact
            rowData={types}
            columnDefs={columnDefs}
            defaultColDef={{ flex: 1, resizable: true }}
          />
        </div>
      </form>
    </div>
  );
};

export default TypeList;
