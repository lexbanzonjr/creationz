import Login from "../../views/auth/Login";
import Register from "../../views/auth/Register";

const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default publicRoutes;
