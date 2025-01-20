import React, { useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ICellRendererParams } from "ag-grid-community";
import RemoveButton from "../../components/RemoveButton";
import EditButton from "../../components/EditButton";
import { Product } from "../../types/global";
import useStore from "../../hooks/useAdminStore";
import ProductDetailFrame from "./ProductDetailFrame";
import GreenButton from "../../components/GreenButton";
import { useAuth } from "../../context/AuthContext";

interface RowData {
  product?: Product;
  expanded: boolean;
}

const ProductPage: React.FC = () => {
  const { products, addProduct, deleteProduct, updateProduct } = useStore();
  const { getAccessToken } = useAuth();
  const [rowData, setRowData] = useState<RowData[]>(() => {
    const data: RowData[] = [];
    products.forEach((product) => {
      data.push({
        expanded: false,
        product,
      });
    });
    return data;
  });

  const gridRef = useRef<AgGridReact>(null);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Product",
        flex: 4,
        cellRenderer: (params: ICellRendererParams<RowData>) => {
          const product = params.data?.product!;
          const handleUpdateProduct = async (params: any, product: Product) => {
            const updatedProduct = await updateProduct(getAccessToken, {
              ...product,
              ...params,
            });
            setRowData((prevData) => {
              const index = prevData.findIndex(
                (data) => data.product?._id === product._id
              );
              if (index > -1) {
                prevData[index].product = updatedProduct;
              }
              return prevData;
            });
            gridRef.current?.api.refreshCells();
          };
          return (
            <div className="inline-block w-full">
              <div className="float-left p-1">{product.name}</div>
              <br />
              <div className="overflow-y-scroll p-4 h-96">
                <ProductDetailFrame
                  product={product}
                  updateProduct={(params) =>
                    handleUpdateProduct(params, product)
                  }
                />
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Action",
        flex: 1,
        cellRenderer: (params: ICellRendererParams<RowData>) => {
          const toggleRowHeight = (data: RowData) => {
            setRowData((prevData) =>
              prevData.map((row) =>
                row.product!._id === data.product!._id
                  ? { ...row, expanded: !row.expanded }
                  : row
              )
            );
            gridRef.current?.api.resetRowHeights();
          };

          const handleRemove = async (data: RowData) => {
            setRowData((prevData) => {
              return prevData.filter(
                (rowData) => rowData.product!._id !== data.product!._id
              );
            });
            await deleteProduct(getAccessToken, data.product!);
          };
          return (
            <div className="inline-block">
              <div className="float-left p-1">
                <RemoveButton
                  onClick={async () => await handleRemove(params.data!)}
                />
              </div>
              <div className="float-left p-1">
                <EditButton onClick={() => toggleRowHeight(params.data!)} />
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  const getRowHeight = (params: any) => {
    return params.data.expanded ? 500 : 50;
  };

  const handleAddRow = async () => {
    const data = {
      product: await addProduct(getAccessToken),
      expanded: false,
    };
    setRowData([...rowData, data]);
  };

  return (
    <div>
      <GreenButton className="rounded-md" onClick={handleAddRow} type="button">
        Add new product
      </GreenButton>
      <br />
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          getRowHeight={getRowHeight}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default ProductPage;
