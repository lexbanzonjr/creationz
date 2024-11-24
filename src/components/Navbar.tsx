import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const { isAuthenticated, getId, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to the login page
  };

  const isAdmin = () => {
    return getId.roles.includes("admin");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-brand"]}>
        <Link to="/">Creationz by CC</Link>
      </div>
      <ul className={styles["navbar-links"]}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {isAdmin() ? (
          <>
            <li>
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
