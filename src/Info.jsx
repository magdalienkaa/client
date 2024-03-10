import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./reducers/UserReducer";
import "./App.css";
import User from "./User";

const Info = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
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
        const response = await fetch(
          `https://client-production-8f11.up.railway.app/api/info/${id}`
        );
        const data = await response.json();
        setDescription(data.popis);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, navigate]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `https://client-production-8f11.up.railway.app/api/fotky/${id}`
        );
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [id]);

  const photoTypes = [...new Set(photos.map((photo) => photo.typ))];

  return (
    <div>
      <div className="user-containter">
        <User />
      </div>
      <div className="info-container">
        <h2>Info</h2>
        <p>{description}</p>
        <div>
          <h3>Fotky</h3>
          {photoTypes.map((photoType) => (
            <div key={photoType}>
              <h4>{photoType}</h4>
              <div className="photos-container">
                {photos
                  .filter((photo) => photo.typ === photoType)
                  .map((photo, index) => (
                    <img
                      key={index}
                      src={`data:image/jpeg;base64,${photo.fotka}`}
                      alt={`Photo ${index + 1}`}
                      className="photo"
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="next">
          <button className="select-button" onClick={handleNextButtonClick}>
            Ďalej
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
