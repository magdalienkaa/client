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
      setError("Zadajte email a heslo.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      let credentials = {
        email: email,
        password: password,
      };

      const response = await fetch(
        "https://server-production-5a4b.up.railway.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        // localStorage.setItem("userRole", data.user.role);

        dispatch(login());
        dispatch(addUserData(data.user));
        navigate("/home");
      } else {
        setError(data.message || "Vyskytla sa chyba.");
      }
    } catch (error) {
      console.error("Vyskytla sa chyba počas prihlasovania.", error);
      setError("Vyskystla sa chyba. Vyskúšajte to neskôr.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      {error && <p style={{ color: "purple" }}>{error}</p>}
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

        <label htmlFor="password">Heslo</label>
        <input
          value={password}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Prihlasovanie..." : "Prihlásiť sa"}
        </button>
      </form>
    </div>
  );
};
