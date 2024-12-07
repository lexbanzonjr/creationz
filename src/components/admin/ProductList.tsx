import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import styles from "./ProductList.module.css";
import { Product } from "../../types/global";
import { useAuth } from "../../context/AuthContext";
import useStore from "../../hooks/useAdminStore";

const ProductList = () => {
  const { getAccessToken } = useAuth();
  const { products, deleteProduct, setProducts } = useStore();

  // Define column definitions for AG Grid
  const columnDefs: ColDef[] = [
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      flex: 1,
      editable: true, // Allow inline editing for category name
    },
    {
      headerName: "Description",
      field: "description",
      flex: 2,
    },
    {
      headerName: "Actions",
      cellRenderer: (params: ICellRendererParams<Product>) => {
        return (
          <button
            type="button"
            onClick={() =>
              deleteProduct(getAccessToken, params.data as Product)
            }
            style={{ cursor: "pointer", padding: "5px 10px", color: "red" }}
          >
            Remove
          </button>
        );
      },
      flex: 0.5,
    },
  ];

  return (
    <div className={styles["product-list"]}>
      <h2>Product List</h2>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={products}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, resizable: true }}
          onCellValueChanged={(params) => {
            const updatedProduct = params.data as Product;
            setProducts(
              products.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
              )
            );
          }}
        />
      </div>
    </div>
  );
};

export default ProductList;
