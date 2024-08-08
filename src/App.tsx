import { useState } from "react";
import "./index.css";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  console.log(allRoutes);
  return <Router allRoutes={allRoutes} />;
}

export default App;
