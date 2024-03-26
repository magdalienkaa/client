import React, { useState, useEffect } from "react";
import "./App.css";
import Room from "./Room";
import User from "./User";

const Select = () => {
  const [filters, setFilters] = useState({
    dormitory: "",
    orientation: "",
    block: "",
    floor: "",
    roomType: "",
    reconstructionStatus: "",
    locationOnCorridor: "",
  });
  const [dormitories, setDormitories] = useState([]);

  useEffect(() => {
    const fetchDormitories = async () => {
      try {
        const response = await fetch(
          "https://server-production-5a4b.up.railway.app/api/home"
        );
        const data = await response.json();
        setDormitories(data);
      } catch (error) {
        console.error("Chyba pri získavaní informácií o internátoch:", error);
      }
    };

    fetchDormitories();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleResetFilters = () => {
    setFilters({
      dormitory: "",
      orientation: "",
      block: "",
      floor: "",
      roomType: "",
      reconstructionStatus: "",
      locationOnCorridor: "",
    });
  };

  return (
    <div>
      <User />
      <div className="room-container">
        <div className="filters">
          <label>
            Internát:
            <select
              name="dormitory"
              value={filters.dormitory}
              onChange={handleFilterChange}
            >
              <option value="">-- Vyberte internát --</option>
              {dormitories.map((dormitory) => (
                <option key={dormitory.id_internat} value={dormitory.nazov}>
                  {dormitory.nazov}
                </option>
              ))}
            </select>
          </label>

          <label>
            Orientácia:
            <select
              name="orientation"
              value={filters.orientation}
              onChange={handleFilterChange}
            >
              <option value="">-- Vyberte orientáciu --</option>
              <option value="Sever">Sever</option>
              <option value="Juh">Juh</option>
              <option value="Východ">Východ</option>
              <option value="západ">Západ</option>
            </select>
          </label>
          <label>
            Blok:
            <select
              name="block"
              value={filters.block}
              onChange={handleFilterChange}
            >
              <option value="">-- Vyberte blok --</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
          </label>
          <label>
            Poschodie:
            <input
              type="number"
              name="floor"
              value={filters.floor}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Typ izby:
            <select
              name="roomType"
              value={filters.roomType}
              onChange={handleFilterChange}
            >
              <option value="">-- Vyberte typ izby --</option>
              <option value="Jednolôžková">Jednolôžková</option>
              <option value="Dvojlôžková">Dvojlôžková</option>
              <option value="Trojlôžková">Trojlôžková</option>
            </select>
          </label>
          <label>
            Stav rekonštrukcie:
            <select
              name="reconstructionStatus"
              value={filters.reconstructionStatus}
              onChange={handleFilterChange}
            >
              <option value="">-- Vyberte stav rekonštrukcie --</option>
              <option value="Rekonštruovaná">Rekonštruovaná</option>
              <option value="Nezrekonštruovaná">Nezrekonštruovaná</option>
            </select>
          </label>
          <label>
            Umiestnenie na chodbe:
            <select
              name="locationOnCorridor"
              value={filters.locationOnCorridor}
              onChange={handleFilterChange}
            >
              <option value="">-- Vyberte umiestnenie na chodbe --</option>
              <option value="Pri spoločných WC">Pri spoločných WC</option>
              <option value="Pri schodoch">Pri schodoch</option>
              <option value="Pri kuchynke">Pri kuchynke</option>
              <option value="Začiatok">Začiatok</option>
              <option value="Koniec">Koniec</option>
              <option value="Pri výťahu">Pri výťahu</option>
            </select>
          </label>
          <div>
            <button onClick={handleResetFilters}>Reset</button>
          </div>
        </div>
        <Room filters={filters} />
      </div>
    </div>
  );
};

export default Select;
