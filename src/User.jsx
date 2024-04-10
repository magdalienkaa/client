import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./reducers/UserReducer";

const User = () => {
  const navigate = useNavigate();
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const loggedInUserData = selector.userStore.userData;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleUserClick = () => {
    navigate("/home");
  };
  const handleUserStatusClick = () => {
    navigate("/home/status");
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="user-container">
      <div className="home" onClick={handleUserClick}>
        {" "}
        <img src="/images/home.svg" alt="Home" />
      </div>
      <div className="user" onClick={handleUserStatusClick}>
        <img src="/images/user.svg" alt="User" />
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

      <div className="logout" onClick={handleLogout}>
        <img src="/images/logout.svg" alt="Logout" />
      </div>
    </div>
  );
};

export default User;
