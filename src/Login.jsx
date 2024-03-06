import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, addUserData } from "./reducers/UserReducer.js";
import "./App.css";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      let credentials = {
        email: email,
        password: password,
      };

      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log("Response status:", response);

      const data = await response.json();
      console.log("Data from server:", data);

      if (response.ok) {
        dispatch(login());
        dispatch(addUserData(data.user));
        navigate("/home");
      } else {
        setError(data.message || "An error occurred during login.");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      setError("An error occurred during login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          type="email"
          placeholder="menopriezvisko@student.euba.sk"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          value={password}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>
    </div>
  );
};
