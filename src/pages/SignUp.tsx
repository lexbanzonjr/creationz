import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setError(null);
    setSuccess(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // API call to register the account
      const response = await axios.post(
        "https://localhost:5000/auth/register",
        {
          name,
          email,
          password,
        }
      );

      // Handle success
      setSuccess("Account created successfully! You can now log in.");
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (err: any) {
      // Handle errors
      setError(
        err.response?.data?.message || "Sign up failed. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp} className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
