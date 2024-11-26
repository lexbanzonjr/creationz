import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import styles from "./ViewCategory.module.css";

interface Property {
  name: string;
  type: string;
}

interface Category {
  id: number;
  name: string;
  properties: Property[];
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const { getAccessToken } = useAuth();

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
      headerName: "Properties",
      field: "properties",
      cellRenderer: (params: any) => {
        const properties = params.value as Property[];
        return properties
          .map((property) => `${property.name} (${property.type})`)
          .join(", ");
      },
      flex: 2,
    },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => {
        return (
          <button
            onClick={() => handleRemoveCategory(params.data.id)}
            style={{ cursor: "pointer", padding: "5px 10px", color: "red" }}
          >
            Remove
          </button>
        );
      },
      flex: 0.5,
    },
  ];

  // Fetch initial categories (replace with your API call)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // API call to register the account
        const response = await axios.get("https://localhost:5000/category", {
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        });
        setCategories(response.data.categories);
      } catch (err: any) {}
    };
    fetchCategories();
  }, [getAccessToken]);

  // Handle adding a new category
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      setCategories((prevCategories) => [
        ...prevCategories,
        {
          id: Date.now(), // Unique ID
          name: newCategoryName,
          properties: [], // Empty properties
        },
      ]);
      setNewCategoryName(""); // Reset input field
    }
  };

  // Handle removing a category
  const handleRemoveCategory = (id: number) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
  };

  return (
    <div className={styles["view-category"]}>
      <h2>Category List</h2>
      {/* Add Category Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter category name"
          style={{ padding: "8px", width: "300px", marginRight: "10px" }}
        />
        <button
          onClick={handleAddCategory}
          style={{
            padding: "8px 16px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Category
        </button>
      </div>
      {/* AG Grid */}
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={categories}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, resizable: true }}
          onCellValueChanged={(params) => {
            const updatedCategory = params.data as Category;
            setCategories((prevCategories) =>
              prevCategories.map((category) =>
                category.id === updatedCategory.id ? updatedCategory : category
              )
            );
          }}
        />
      </div>
    </div>
  );
};

export default CategoryList;
