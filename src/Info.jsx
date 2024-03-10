import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";
import User from "./User";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Info = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    navigate(`/info/${id}/select`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://server-production-5a4b.up.railway.app/api/info/${id}`
        );
        const data = await response.json();
        setDescription(data.popis);

        const [lat, lon] = data.suradnice.split(", ");
        setLatitude(lat);
        setLongitude(lon);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, navigate]);

  useEffect(() => {
    const map = L.map("map", {
      center: [latitude, longitude],
      zoom: 16,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `https://server-production-5a4b.up.railway.app/api/fotky/${id}`
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
        <div className="map" id="map" style={{ height: "400px" }}></div>
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
