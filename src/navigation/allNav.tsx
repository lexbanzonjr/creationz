import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { FaStore, FaUsers } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import YahooDashboard from "../views/yahoo/Dashboard";

export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: 3,
    title: "Store",
    icon: <FaStore />,
    role: "admin",
    path: "/admin/dashboard/category",
  },
  {
    id: 4,
    title: "Customers",
    icon: <FaUsers />,
    role: "admin",
    path: "/admin/dashboard/customers",
  },
  {
    id: 5,
    title: "Live Chat",
    icon: <IoIosChatbubbles />,
    role: "admin",
    path: "/admin/dashboard/seller-request",
  },
  {
    id: 6,
    title: "Yahoo",
    icon: <YahooDashboard />,
    role: "admin",
    path: "/yahoo",
  },
];
