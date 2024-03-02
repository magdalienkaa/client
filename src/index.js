import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Login";
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />{" "}
      </Routes>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
