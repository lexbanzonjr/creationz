import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous error
    setError(null);

    try {
      const authHeader = `Basic ${btoa(`${email}:${password}`)}`;

      // API call for authentication
      const response = await axios.post(
        "https://localhost:5000/auth/login", // Replace with your API URL
        {}, // No body needed for Basic Authentication
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      // Handle success (e.g., store token, redirect user)
      alert("Login successful");
      login({
        token: response.data.accessToken,
        idToken: response.data.idToken,
      });
      navigate("/dashboard");
    } catch (err: any) {
      // Handle errors (e.g., invalid credentials)
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="auth-button">
          Login
        </button>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
