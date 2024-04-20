import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { login, logout } from "./reducers/UserReducer";

const token = localStorage.getItem("token");
if (token) {
  store.dispatch(login());
} else {
  store.dispatch(logout());
}

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
