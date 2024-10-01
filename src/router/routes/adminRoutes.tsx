import { lazy } from "react";
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Category = lazy(() => import("../../views/admin/Category"));
const Customers = lazy(() => import("../../views/admin/Customers"));
const Orders = lazy(() => import("../../views/admin/Orders"));

export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/dashboard/orders",
    element: <Orders />,
    role: "admin",
  },
  {
    path: "admin/dashboard/category",
    element: <Category />,
    role: "admin",
  },
  {
    path: "admin/dashboard/customers",
    element: <Customers />,
    role: "admin",
  },
];
