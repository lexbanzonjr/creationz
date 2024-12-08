import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import styles from "./Admin.module.css";
import { Design } from "../../types/global";
import useStore from "../../hooks/useAdminStore";
import { useState } from "react";
import RemoveButton from "../RemoveButton";
import GreenButton from "../GreenButton";

const blankDesign: Design = {
  name: "",
  type: "",
};

const CategoryProperties = () => {
  const [design, setDesign] = useState<Design>(blankDesign);
  const { activeCategory, types, setActiveCategory } = useStore();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "design-name") {
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

  const handleAddDesignBtnClick = () => {
    if (activeCategory === undefined) {
      return;
    }
    setActiveCategory({
      ...activeCategory,
      designs: [...activeCategory.designs, design],
    });
    setDesign(blankDesign);
  };

  const handleRemoveBtnClick = (name: string) => {
    if (activeCategory === undefined) {
      return;
    }
    setActiveCategory({
      ...activeCategory,
      designs: activeCategory.designs.filter((design) => design.name !== name),
    });
  };

  return (
    <div className={styles["admin"]}>
      <h2>Category Properties</h2>
      <div>
        <div>
          <label>
            Designs:
            <br />
            <small>Designs offer customers to choose design options.</small>
          </label>

          <div>
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
          </div>

          <div>
            <label>
              Type:
              <br />
              <small>
                Select type of choice <br />
              </small>
              <select
                name="design-type"
                id="design-type"
                onChange={handleChange}
              >
                {types.map((type, index) => (
                  <option key={index} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <br />
          {/* <button
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
          </button> */}
          <GreenButton
            className="rounded-md"
            onClick={handleAddDesignBtnClick}
            type="button"
          >
            Add type
          </GreenButton>
        </div>
      </div>
      <br />
      <div className="ag-theme-alpine" style={{ height: 200, width: "100%" }}>
        <AgGridReact
          rowData={activeCategory?.designs}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, resizable: true }}
        />
      </div>
    </div>
  );
};

export default CategoryProperties;
