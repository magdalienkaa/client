import React, { useState } from "react";
import "./App.css";
import Room from "./Room";
import User from "./User";

const Select = () => {
  const [filters, setFilters] = useState({
    orientation: "",
    block: "",
    floor: "",
    roomType: "",
    reconstructionStatus: "",
    locationOnCorridor: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleApplyFilters = () => {
    // Logic to apply filters, for example, trigger a refetch of room data with the new filters
    console.log("Filters applied:", filters);
  };

  const handleResetFilters = () => {
    // Logic to reset filters to default values
    setFilters({
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
          <div className="buttons">
            <button onClick={handleResetFilters}>Reset</button>
          </div>
        </div>
        <Room filters={filters} />
      </div>
    </div>
  );
};

export default Select;
