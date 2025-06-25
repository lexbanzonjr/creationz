import React, { useState, useMemo, useRef } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ICellRendererParams } from "ag-grid-community";

import ImagesCellRenderer from "../../components/admin/ImagesCellRenderer";
import EditButton from "../../components/EditButton";
import GreenButton from "../../components/GreenButton";
import ProductForm from "../../components/admin/ProductForm";
import RemoveButton from "../../components/RemoveButton";
import { useAuth } from "../../hooks/useAuthStore";
import useStore from "../../hooks/useAdminStore";
import { Product } from "../../types/global";

interface RowData {
  product?: Product;
  expanded: boolean;
}

const ProductPage: React.FC = () => {
  const { products, addProduct, deleteProduct, updateProduct, categories } =
    useStore();
  const { getToken } = useAuth();

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
            <div className="w-full h-full flex items-center">
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
          return (
            <div className="w-full h-full flex items-center">
              <div className="p-1">{currentProduct.cost.toFixed(2)}</div>
            </div>
          );
        },
      },
      {
        headerName: "Description",
        flex: 4,
        cellRenderer: (params: ICellRendererParams<RowData>) => {
          const currentProduct = params.data?.product!;
          return (
            <div className="w-full h-full flex items-center">
              <div className="p-1">{currentProduct.description}</div>
            </div>
          );
        },
      },
      {
        headerName: "Category",
        flex: 1,
        cellRenderer: (params: ICellRendererParams<RowData>) => {
          const currentProduct = params.data?.product!;
          const category = categories.find(
            (cat) => cat._id === currentProduct.category_id
          );
          return (
            <div className="w-full h-full flex items-center">
              <div className="p-1">{category?.name || "No Category"}</div>
            </div>
          );
        },
      },
      {
        headerName: "Images",
        flex: 1,
        cellRenderer: (params: ICellRendererParams<RowData>) => {
          return (
            <div className="w-full h-full flex items-center">
              <ImagesCellRenderer data={params.data!} />
            </div>
          );
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
            await deleteProduct(getToken, data.product!);
          };

          const handleEditInModal = (data: RowData) => {
            setEditingProduct(data.product);
            setIsModalOpen(true);
          };

          return (
            <div className="w-full h-full flex items-center">
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
    [deleteProduct, getToken, categories]
  );

  const handleAddRow = () => {
    setEditingProduct(undefined); // Clear editing product to indicate add mode
    setIsModalOpen(true);
  };

  const handleCancelProduct = () => {
    setIsModalOpen(false);
    setEditingProduct(undefined);
  };

  const handleConfirmProduct = async (productData: Product) => {
    if (editingProduct) {
      // Editing existing product
      const updatedProduct = await updateProduct(getToken, productData);

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
      const newProduct = await addProduct(getToken, productData);

      const data = {
        product: newProduct,
        expanded: false,
      };
      setRowData([...rowData, data]);
    }
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
