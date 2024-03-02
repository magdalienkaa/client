import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Login } from "./Login";
import Home from "./Home";
import User from "./User";
import Accommodation from "./Accommodation";
import Info from "./Info";
import { useSelector } from "react-redux";
import Select from "./Select";
import Help from "./Help";
import Status from "./Status";

function App() {
  const selector = useSelector((state) => state);

  const isLoggedIn = selector.userStore.loggedIn;

  const navigate = useNavigate();
  const [error, setError] = useState("");
  console.log(isLoggedIn);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<Login isLoggedInVariable={isLoggedIn} />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/user"
          element={isLoggedIn ? <User /> : <Navigate to="/login" />}
        />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/info/:id" element={<Info />} />
        <Route path="/info/:id/select" element={<Select />} />
        <Route path="/home/help" element={<Help />} />
        <Route path="/home/status" element={<Status />} />
      </Routes>
    </div>
  );
}

export default App;
