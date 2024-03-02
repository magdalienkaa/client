import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./reducers/UserReducer";
import "./App.css";
import User from "./User";

const Info = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const loggedInUserData = useSelector((state) => state.userStore.userData);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleNextButtonClick = () => {
    navigate(`/info/${id}/select`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/info/${id}`);
        const data = await response.json();
        setDescription(data.popis);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, navigate]);

  return (
    <div>
      <div className="user-containter">
        <User />
      </div>
      <div className="info-container">
        <h2>Info</h2>
        <p>{description}</p>
      </div>
      <div className="next">
        <button onClick={handleNextButtonClick}>
          <img src="/images/next.svg" alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default Info;
