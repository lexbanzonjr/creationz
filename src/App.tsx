import { useEffect, useState } from "react";
import "./index.css";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoutes } from "./router/routes";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Router allRoutes={allRoutes} />;
}

export default App;
