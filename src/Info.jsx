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
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    navigate(`/info/${id}/select`);
  };

  async function fetchData() {
    try {
      const response = await fetch(
        `https://server-production-5a4b.up.railway.app/api/info/${id}`
      );
      const data = await response.json();
      setDescription(data.popis);
      console.log(data);
      setLatitude(data.suradnice2);
      setLongitude(data.suradnice);
      console.log("Data fetch");
      console.log(latitude, longitude);
      mapa(data.suradnice, data.suradnice2);
    } catch (error) {
      console.error("Chyba pri načítavaní dát.", error);
    }
  }

  async function mapa(latitude, longitude) {
    console.log("Data fetch MAPA");
    console.log(latitude, longitude);
    const map = L.map("map").setView([latitude, longitude], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);
  }

  async function fetchPhotos() {
    try {
      const response = await fetch(
        `https://server-production-5a4b.up.railway.app/api/fotky/${id}`
      );
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error("Chyba pri načítavaní fotiek.", error);
    }
  }

  const photoTypes = [...new Set(photos.map((photo) => photo.typ))];

  useEffect(() => {
    fetchData();
    fetchPhotos();
    // mapa();
  }, [id]);

  return (
    <div>
      <div className="user-containter">
        <User />
      </div>
      <div className="info-container">
        <h2>Info</h2>
        <div className="next top-right">
          <button onClick={handleNextButtonClick}>Ďalej</button>
        </div>
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
        <div
          className="map"
          id="map"
          style={{ height: "200px", width: "400px" }}
        ></div>
        <div className="next bottom-center">
          <button onClick={handleNextButtonClick}>Ďalej</button>
        </div>
      </div>
    </div>
  );
};

export default Info;
