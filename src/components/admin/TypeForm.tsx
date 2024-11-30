import React, { useState } from "react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { Type } from "../../types/Type";
import styles from "./TypeForm.module.css";
import RemoveButton from "../RemoveButton";

interface TypeFormProps {
  types: Type[];

  addType: (type: Type) => Promise<Type>;
  deleteType: (type: Type) => void;
}

const blankType: Type = {
  _id: "",
  name: "",
  options: [],
};

const TypeForm: React.FC<TypeFormProps> = (props) => {
  const [type, setType] = useState<Type>(blankType);
  console.log(props.types);
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
          <RemoveButton
            onClick={() => props.deleteType(params.data as Type)}
          ></RemoveButton>
        );
      },
      flex: 0.5,
    },
  ];

  const handleAddTypeBtnClick = () => {
    props.addType(type);
    setType(blankType);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") {
      setType((prev) => ({
        ...prev,
        name: value,
      }));
    }
  };

  return (
    <div className={styles["type-form"]}>
      <h2>Type</h2>
      <small>
        Configure types to describe characteristic values that your customers
        will use when you add designs to your product.
        <br />
        For example: <br />
        Name: Shirt sizes
        <br />
        Options: small, medium, large <br />
        <br />
        Name: Shirt color <br />
        Options: red, blue, green, yellow, white <br />
        <br />
      </small>
      <form>
        <div>
          <label>
            Name: <br />
            <small>Enter a name for the type</small>
            <input
              type="text"
              name="name"
              value={type.name}
              onChange={handleChange}
              required
            />
          </label>
          <button onClick={handleAddTypeBtnClick} type="button">
            Add Type
          </button>
        </div>
        <br />

        <label>
          Type List: <br />
          <small>Select a type to modify its properties</small>
        </label>
        <div
          className={`${styles["type-name"]} ag-theme-alpine`}
          style={{ height: 200, width: "100%" }}
        >
          <AgGridReact
            rowData={props.types}
            columnDefs={columnDefs}
            defaultColDef={{ flex: 1, resizable: true }}
          />
        </div>
      </form>
    </div>
  );
};

export default TypeForm;
