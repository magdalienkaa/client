import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Accommodation = (data) => {
  const accommodation = data;
  return (
    <div className="accommodation">
      <h2>{accommodation.data.nazov}</h2>

      <img
        className="image"
        src={`data:image/jpeg;base64,${accommodation.data.fotky}`}
        alt="uvodna_fotka"
      />
      <div>
        <Link to={`/info/${accommodation.data.id_internat}`}>
          <button>Vybrať</button>
        </Link>
      </div>
    </div>
  );
};

export default Accommodation;
