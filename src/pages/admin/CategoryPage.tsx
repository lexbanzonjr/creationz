import React, { useState, useMemo, useRef } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ICellRendererParams } from "ag-grid-community";

import CategoryForm from "../../components/admin/CategoryForm";
import EditButton from "../../components/EditButton";
import GreenButton from "../../components/GreenButton";
import RemoveButton from "../../components/RemoveButton";
import { useAuth } from "../../hooks/useAuthStore";
import useStore from "../../hooks/useAdminStore";
import { Category } from "../../types/global";

interface RowData {
  category?: Category;
  expanded: boolean;
}

const CategoryPage: React.FC = () => {
  const { categories, addCategory, deleteCategory, updateCategory } =
    useStore();
  const { getToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(
    undefined
  );
  const [rowData, setRowData] = useState<RowData[]>(() => {
    const data: RowData[] = [];
    categories.forEach((category) => {
      data.push({
        expanded: false,
        category,
      });
    });
    return data;
  });

  // Ag-Grid column definitions
  const gridRef = useRef<AgGridReact>(null);
  const columnDefs = useMemo(
    () => [
      {
        headerName: "Category",
        flex: 4,
        cellRenderer: (params: ICellRendererParams<RowData>) => {
          const category = params.data?.category!;
          return <div>{category.name}</div>;
        },
      },
      {
        headerName: "Action",
        flex: 1,
        cellRenderer: (params: ICellRendererParams<RowData>) => {
          const handleRemove = async (data: RowData) => {
            setRowData((prevData) => {
              return prevData.filter(
                (rowData) => rowData.category!._id !== data.category!._id
              );
            });
            await deleteCategory(getToken, data.category!);
          };

          const handleEditInModal = (data: RowData) => {
            setEditingCategory(data.category);
            setIsModalOpen(true);
          };

          return (
            <div className="inline-block">
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
    [deleteCategory, getToken]
  );

  const handleAddRow = () => {
    setEditingCategory(undefined); // Clear editing category to indicate add mode
    setIsModalOpen(true);
  };

  const handleCancelCategory = () => {
    setIsModalOpen(false);
    setEditingCategory(undefined);
  };

  const handleConfirmCategory = async (name: string, description: string) => {
    if (editingCategory) {
      // Editing existing category
      const updatedCategory = await updateCategory(getToken, {
        ...editingCategory,
        name,
        description,
      });

      setRowData((prevData) => {
        const index = prevData.findIndex(
          (data) => data.category?._id === editingCategory._id
        );
        if (index > -1) {
          prevData[index].category = updatedCategory;
        }
        return prevData;
      });
      gridRef.current?.api.refreshCells();
    } else {
      // Adding new category
      const newCategory = await addCategory(getToken, {
        _id: "",
        name,
        description,
        designs: [],
      });

      const data = {
        category: newCategory,
        expanded: false,
      };
      setRowData([...rowData, data]);
    }

    setIsModalOpen(false);
    setEditingCategory(undefined);
  };

  return (
    <div>
      <GreenButton className="rounded-md" onClick={handleAddRow} type="button">
        Add new category
      </GreenButton>
      <br />
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact ref={gridRef} rowData={rowData} columnDefs={columnDefs} />
      </div>

      <CategoryForm
        isOpen={isModalOpen}
        onClose={handleCancelCategory}
        onConfirm={handleConfirmCategory}
        category={editingCategory}
      />
    </div>
  );
};

export default CategoryPage;
