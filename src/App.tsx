import { useState } from "react";
import "./index.css";
import Router from "./router/Router";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allRoutes, setAllRoutes] = useState([]);
  return <Router allRoutes={allRoutes} />;
}

export default App;
