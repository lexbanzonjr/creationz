import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/Dashboard";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import { useAuth } from "./hooks/useAuthStore";

const App: React.FC = () => {
  const { initialize: initializeAuth } = useAuth();

  // Initialize auth on app startup
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shop" element={<Shop />} />

        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
