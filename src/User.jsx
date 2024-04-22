import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUserData } from "./reducers/UserReducer";
import { logout } from "./reducers/UserReducer";

const User = () => {
  const navigate = useNavigate();
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const loggedInUserData = selector.userStore.userData;
  const [showMenu, setShowMenu] = useState(false);
  const userSelect = selector.userStore.userData;

  const [fetchDone, setFetchDone] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `https://server-production-5a4b.up.railway.app/api/me`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
            }),
          }
        );

        const responseData = await response.json();

        dispatch(addUserData(responseData.user));
        setFetchDone(true);
      } catch (error) {
        console.error("Chyba:", error);
      }
    };
    fetchMe();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
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
        onMouseEnter={() =>
          userSelect && userSelect.role === "admin" && toggleMenu()
        }
        onMouseLeave={() =>
          userSelect && userSelect.role === "admin" && toggleMenu()
        }
        onClick={() =>
          userSelect && userSelect.role === "student" && handleStatusClick()
        }
        title="Možnosti"
      >
        <img src="/images/user.svg" alt="User" />
        {showMenu && userSelect && userSelect.role === "admin" && (
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
        <h2>
          {userSelect && userSelect.role != "admin"
            ? `${loggedInUserData.meno} ${loggedInUserData.priezvisko}`
            : ""}
        </h2>
        <h2>{userSelect && userSelect.role === "admin" ? "Admin" : ""}</h2>
      </div>
      <div className="points">
        <h2>
          {loggedInUserData &&
          loggedInUserData.body &&
          loggedInUserData.body !== "null"
            ? `${loggedInUserData.body} bodov`
            : null}
        </h2>
      </div>
      {
        <div
          className="back"
          style={{
            display: window.location.href.includes("/home") ? "none" : "block",
          }}
          onClick={handleBackClick}
        >
          <img src="/images/back.svg" alt="Back" />
        </div>
      }
      <div className="logout" onClick={handleLogout} title="Odhlásenie">
        <img src="/images/logout.svg" alt="Logout" />
      </div>
    </div>
  );
};

export default User;
