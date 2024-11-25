import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface Property {
  name: string;
  type: string;
}

interface Category {
  name: string;
  properties: Property[];
}

const categoriesData: Category[] = [
  {
    name: "Category 1",
    properties: [
      { name: "Property 1", type: "String" },
      { name: "Property 2", type: "Number" },
    ],
  },
  {
    name: "Category 2",
    properties: [{ name: "Property A", type: "Boolean" }],
  },
];

const CategoryList: React.FC = () => {
  const [categories] = useState<Category[]>(categoriesData);

  // Define column definitions for AG Grid
  const columnDefs: ColDef[] = [
    {
      headerName: "Category Name",
      field: "name",
      sortable: true,
      filter: true,
      width: 250, // Fixed width (25% of a 1000px grid width)
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
      width: 750, // Fixed width (75% of a 1000px grid width)
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <h2>Category List</h2>
      <AgGridReact
        rowData={categories}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={5}
      />
    </div>
  );
};

export default CategoryList;
