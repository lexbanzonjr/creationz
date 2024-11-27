import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { CategoryProps, DesignProps } from "./Category";
import styles from "./AddCategory.module.css";

interface AddCategoryProps {
  addCategory: (category: CategoryProps) => void;
}

const blankCategory: CategoryProps = {
  _id: "",
  name: "",
  designs: [],
};

const blankDesign: DesignProps = {
  name: "",
  type: "",
};

const AddCategory: React.FC<AddCategoryProps> = (props) => {
  const [category, setCategory] = useState<CategoryProps>(blankCategory);
  const [design, setDesign] = useState<DesignProps>(blankDesign);

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
      cellRenderer: (params: ICellRendererParams<DesignProps>) => {
        return (
          <button
            type="button"
            onClick={() => handleRemoveBtnClick(params.data?.name ?? "")}
            style={{ cursor: "pointer", padding: "5px 10px", color: "red" }}
          >
            Remove
          </button>
        );
      },
      flex: 0.5,
    },
  ];

  const addProperty = () => {
    setCategory((prev) => ({
      ...prev,
      designs: [...prev.designs, { name: "", type: "" }],
    }));
  };

  const handleAddCategoryBtnClick = () => {
    props.addCategory(category);
    setCategory(blankCategory);
    setDesign(blankDesign);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "category-name") {
      setCategory((prev) => ({
        ...prev,
        name: value,
      }));
    } else if (name === "design-name") {
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

  const handleAddDesignBtnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setCategory((prev) => ({
      ...prev,
      designs: [design, ...prev.designs],
    }));
    setDesign(blankDesign);
  };

  const handlePropertyChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCategory((prev) => {
      const updatedProperties = [...prev.designs];
      updatedProperties[index] = {
        ...updatedProperties[index],
        [name]: value,
      };
      return { ...prev, designs: updatedProperties };
    });
  };

  const handleRemoveBtnClick = (name: string) => {
    setCategory((prev) => ({
      ...prev,
      designs: prev.designs.filter((design) => design.name !== name),
    }));
  };

  return (
    <div className={styles["add-category"]}>
      <h2>Add Category</h2>
      <form>
        <div className={styles["category-name"]}>
          <label>
            Name:
            <input
              type="text"
              name="category-name"
              value={category.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>Designs:</label>
          <div className={styles["category-designs"]}>
            <label>
              Name:
              <input
                type="text"
                name="design-name"
                value={design.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                name="design-type"
                value={design.type}
                onChange={handleChange}
                required
              />
            </label>
            <button
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
            </button>
          </div>
        </div>

        <div className="ag-theme-alpine" style={{ height: 200, width: "100%" }}>
          <AgGridReact
            rowData={category.designs}
            columnDefs={columnDefs}
            defaultColDef={{ flex: 1, resizable: true }}
          />
        </div>

        <br />
        <button onClick={handleAddCategoryBtnClick} type="button">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
