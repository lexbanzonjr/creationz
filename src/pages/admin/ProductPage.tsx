import React, { useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ICellRendererParams } from "ag-grid-community";
import RemoveButton from "../../components/RemoveButton";
import EditButton from "../../components/EditButton";
import { Product } from "../../types/global";
import useStore from "../../hooks/useAdminStore";
import GreenButton from "../../components/GreenButton";
import { useAuth } from "../../context/AuthContext";
import ProductForm from "../../components/ProductForm";

interface RowData {
  product?: Product;
  expanded: boolean;
}

const ProductPage: React.FC = () => {
  const { products, addProduct, deleteProduct, updateProduct } = useStore();
  const { getAccessToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(
    undefined
  );
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
        flex: 1,
        cellRenderer: (params: ICellRendererParams<RowData>) => {
          const currentProduct = params.data?.product!;
          return (
            <div className="inline-block w-full h-full flex items-center">
              <div className="p-1">{currentProduct.name}</div>
            </div>
          );
        },
      },
      {
        headerName: "Cost",
        flex: 1,
        cellRenderer: (params: ICellRendererParams<RowData>) => {
          const currentProduct = params.data?.product!;
          return <div className="p-1">{currentProduct.cost.toFixed(2)}</div>;
        },
      },
      {
        headerName: "Description",
        flex: 4,
        cellRenderer: (params: ICellRendererParams<RowData>) => {
          const currentProduct = params.data?.product!;
          return <div className="p-1">{currentProduct.description}</div>;
        },
      },
      {
        headerName: "Action",
        flex: 1,
        cellRenderer: (params: ICellRendererParams<RowData>) => {
          const handleRemove = async (data: RowData) => {
            setRowData((prevData) => {
              return prevData.filter(
                (rowData) => rowData.product!._id !== data.product!._id
              );
            });
            await deleteProduct(getAccessToken, data.product!);
          };

          const handleEditInModal = (data: RowData) => {
            setEditingProduct(data.product);
            setIsModalOpen(true);
          };

          return (
            <div className="inline-block w-full h-full flex items-center">
              <div className="float-left p-1">
                <RemoveButton
                  onClick={async () => await handleRemove(params.data!)}
                />
              </div>
              <div className="float-left p-1">
                <EditButton onClick={() => handleEditInModal(params.data!)} />
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  const getRowHeight = (params: any) => {
    return 60; // Fixed height since we're not using expandable rows anymore
  };

  const handleAddRow = () => {
    setEditingProduct(undefined); // Clear editing product to indicate add mode
    setIsModalOpen(true);
  };

  const handleConfirmProduct = async (productData: Product) => {
    try {
      if (editingProduct) {
        // Editing existing product
        const updatedProduct = await updateProduct(getAccessToken, productData);

        setRowData((prevData) => {
          const index = prevData.findIndex(
            (data) => data.product?._id === editingProduct._id
          );
          if (index > -1) {
            prevData[index].product = updatedProduct;
          }
          return prevData;
        });
        gridRef.current?.api.refreshCells();
      } else {
        // Adding new product
        const newProduct = await addProduct(getAccessToken, productData);

        const data = {
          product: newProduct,
          expanded: false,
        };
        setRowData([...rowData, data]);
      }
      setIsModalOpen(false);
      setEditingProduct(undefined);
    } catch (error) {
      console.error("Failed to save product:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleCancelProduct = () => {
    setIsModalOpen(false);
    setEditingProduct(undefined);
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
          // getRowHeight={getRowHeight}
          domLayout="autoHeight"
        />
      </div>

      <ProductForm
        isOpen={isModalOpen}
        onClose={handleCancelProduct}
        onConfirm={handleConfirmProduct}
        product={editingProduct}
      />
    </div>
  );
};

export default ProductPage;
