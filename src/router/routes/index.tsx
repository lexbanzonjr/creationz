import { privateRoutes } from "./privateRoutes";
import { lazy } from "react";
const MainLayout = lazy(() => import("../../layout/MainLayout"));

export const getRoutes = () => {
  return {
    path: "/",
    element: <MainLayout />,
    children: privateRoutes,
  };
};
