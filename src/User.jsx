import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./reducers/UserReducer";

const User = () => {
  const navigate = useNavigate();
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const loggedInUserData = selector.userStore.userData;
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleUserClick = () => {
    navigate("/home");
  };

  const handleStatusClick = () => {
    navigate("/status");
  };

  const handleAddClick = () => {
    navigate("/add");
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="user-container">
      <div className="home" onClick={handleUserClick} title="Domov">
        <img src="/images/home.svg" alt="Home" />
      </div>
      <div
        className="user"
        onMouseEnter={() => loggedInUserData.role === "admin" && toggleMenu()}
        onMouseLeave={() => loggedInUserData.role === "admin" && toggleMenu()}
        onClick={() =>
          loggedInUserData.role === "student" && handleStatusClick()
        }
        title="Možnosti"
      >
        <img src="/images/user.svg" alt="User" />
        {showMenu && loggedInUserData.role === "admin" && (
          <div className="menu">
            <div onClick={handleStatusClick} title="Stav žiadostí">
              Stav žiadostí
            </div>
            <div onClick={handleAddClick} title="Pridať">
              Pridať
            </div>
          </div>
        )}
      </div>
      <div className="user-name">
        <h3>
          {loggedInUserData &&
          loggedInUserData.meno &&
          loggedInUserData.priezvisko &&
          loggedInUserData.meno !== "null" &&
          loggedInUserData.priezvisko !== "null"
            ? `${loggedInUserData.meno} ${loggedInUserData.priezvisko}`
            : "Admin"}
        </h3>
      </div>
      <div className="points">
        <h3>
          {loggedInUserData &&
          loggedInUserData.body &&
          loggedInUserData.body !== "null"
            ? `${loggedInUserData.body} bodov`
            : null}
        </h3>
      </div>
      <div className="back" onClick={handleBackClick} title="Návrat">
        <img src="/images/back.svg" alt="Back" />
      </div>
      <div className="logout" onClick={handleLogout} title="Odhlásenie">
        <img src="/images/logout.svg" alt="Logout" />
      </div>
    </div>
  );
};

export default User;
