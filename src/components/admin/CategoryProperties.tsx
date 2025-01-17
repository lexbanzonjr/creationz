import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Design } from "../../types/global";
import useStore from "../../hooks/useAdminStore";
import { useEffect, useState } from "react";
import RemoveButton from "../RemoveButton";
import GreenButton from "../GreenButton";
import { useAuth } from "../../context/AuthContext";
import useDebounce from "../../hooks/useDebounce";

const blankDesign: Design = {
  name: "",
  type: "",
};

const CategoryProperties = () => {
  const [design, setDesign] = useState<Design>(blankDesign);
  const { activeCategory, types, setActiveCategory, updateCategory } =
    useStore();
  const { getAccessToken } = useAuth();
  const debouncedValue = useDebounce(activeCategory, 1000);

  useEffect(() => {
    if (debouncedValue._id !== "") {
      updateCategory(getAccessToken, debouncedValue);
    }
  }, [debouncedValue, getAccessToken, updateCategory]);

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
    } else if (name === "category-name" && value !== activeCategory.name) {
      setActiveCategory({
        ...activeCategory,
        name: value,
      });
    }
  };

  const handleAddDesignBtnClick = () => {
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
    <div id="category-properties">
      <h2 className="text-center text-black font-bold text-xl mb-5">
        Category Properties
      </h2>

      <label className="block my-2 font-bold text-[#34495e]">
        Category name:
      </label>
      <input
        type="text"
        name="category-name"
        value={activeCategory._id === "" ? "" : activeCategory.name}
        className="w-full p-2.5 mb-4 border border-[#bdc3c7] rounded-md text-sm disabled:cursor-not-allowed"
        onChange={handleChange}
        disabled={activeCategory._id === ""}
        required
      />

      <fieldset className="border border-gray-300 rounded-md p-4">
        <legend className="block my-2 font-bold text-[#34495e]">
          Designs: {"  "}
          <small className="text-gray-500">
            Designs offer customers to choose design options.
          </small>
        </legend>

        <label className="block my-2 font-bold text-[#34495e]">
          Design name:
          <br />
          <small className="text-gray-500">
            For example: color shirt, color bag, color font.
          </small>
        </label>
        <input
          type="text"
          name="design-name"
          value={design.name}
          className="w-full p-2.5 mb-4 border border-[#bdc3c7] rounded-md text-sm disabled:cursor-not-allowed"
          onChange={handleChange}
          disabled={activeCategory._id === ""}
          required
        />

        <label className="block my-2 font-bold text-[#34495e]">
          Design type:
          <br />
          <small className="text-gray-500">
            Select type of choice <br />
          </small>
        </label>
        <select
          name="design-type"
          id="design-type"
          onChange={handleChange}
          className="w-full p-2.5 mb-4 border border-[#bdc3c7] rounded-md text-sm disabled:cursor-not-allowed"
          disabled={activeCategory._id === ""}
        >
          {types.map((type, index) => (
            <option key={index} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        <GreenButton
          className="rounded-md"
          onClick={handleAddDesignBtnClick}
          type="button"
          disabled={activeCategory._id === ""}
        >
          Add design
        </GreenButton>
        <br />
        <div className="ag-theme-alpine" style={{ height: 200, width: "100%" }}>
          <AgGridReact
            rowData={activeCategory?.designs}
            columnDefs={columnDefs}
            defaultColDef={{ flex: 1, resizable: true }}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default CategoryProperties;
