import React, { useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ICellRendererParams } from "ag-grid-community";
import RemoveButton from "../../components/RemoveButton";
import EditButton from "../../components/EditButton";
import { Category } from "../../types/global";
import useStore from "../../hooks/useAdminStore";
import CategoryDetailFrame from "./CategoryDetailFrame";
import GreenButton from "../../components/GreenButton";
import { useAuth } from "../../context/AuthContext";

interface RowData {
  category?: Category;
  expanded: boolean;
}

const CategoryPage: React.FC = () => {
  const { categories, addCategory, deleteCategory, updateCategory } =
    useStore();
  const { getAccessToken } = useAuth();
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

  const gridRef = useRef<AgGridReact>(null);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Category",
        flex: 4,
        cellRenderer: (params: ICellRendererParams<RowData>) => {
          const category = params.data?.category!;
          const handleUpdateCategory = async (
            params: any,
            category: Category
          ) => {
            const updatedCategory = await updateCategory(getAccessToken, {
              ...category,
              ...params,
            });
            setRowData((prevData) => {
              const index = prevData.findIndex(
                (data) => data.category?._id === category._id
              );
              if (index > -1) {
                prevData[index].category = updatedCategory;
              }
              return prevData;
            });
            gridRef.current?.api.refreshCells();
          };
          return (
            <div className="inline-block w-full">
              <div className="float-left p-1">{category.name}</div>
              <br />
              <CategoryDetailFrame
                category={category}
                updateCategory={(params) =>
                  handleUpdateCategory(params, category)
                }
              />
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
                row.category!._id === data.category!._id
                  ? { ...row, expanded: !row.expanded }
                  : row
              )
            );
            gridRef.current?.api.resetRowHeights();
          };

          const handleRemove = async (data: RowData) => {
            setRowData((prevData) => {
              return prevData.filter(
                (rowData) => rowData.category!._id !== data.category!._id
              );
            });
            await deleteCategory(getAccessToken, data.category!);
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
    return params.data.expanded ? 225 : 50;
  };

  const handleAddRow = async () => {
    const data = {
      category: await addCategory(getAccessToken),
      expanded: false,
    };
    setRowData([...rowData, data]);
  };

  return (
    <div>
      <GreenButton className="rounded-md" onClick={handleAddRow} type="button">
        Add new category
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

export default CategoryPage;
