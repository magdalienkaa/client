import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
        <Route
          path="/accommodation"
          element={isLoggedIn ? <Accommodation /> : <Navigate to="/login" />}
        />
        <Route
          path="/info/:id"
          element={isLoggedIn ? <Info /> : <Navigate to="/login" />}
        />
        <Route
          path="/info/:id/select"
          element={isLoggedIn ? <Select /> : <Navigate to="/login" />}
        />
        <Route
          path="/home/help"
          element={isLoggedIn ? <Help /> : <Navigate to="/login" />}
        />
        <Route
          path="/home/status"
          element={isLoggedIn ? <Status /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
