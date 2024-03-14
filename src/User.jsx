import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./reducers/UserReducer";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
  const handleUserHelpClick = () => {
    navigate("/home/help");
  };

  const handleBackClick = () => {
    if (!location.pathname.includes("/login")) {
      window.history.back();
    }
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
          {loggedInUserData
            ? `${loggedInUserData.meno} ${loggedInUserData.priezvisko}`
            : "Loading..."}
        </h3>
      </div>
      <div className="points">
        <h3>
          {loggedInUserData ? `${loggedInUserData.body} bodov` : "Loading..."}
        </h3>
      </div>
      <div className="help" onClick={handleUserHelpClick}>
        <img src="/images/help.svg" alt="Help" />
      </div>
      {
        <div className="back" onClick={handleBackClick}>
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
