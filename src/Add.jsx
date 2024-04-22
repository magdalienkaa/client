import React, { useState } from "react";
import User from "./User";
import "./App.css";

export default function Add() {
  const [file, setFile] = useState(null);
  const [dataType, setDataType] = useState(""); // Stav pre typ dát (Internát, Študent, Izba)

  // Funkcia na spracovanie zmeny výberu typu dát
  const handleTypeChange = (event) => {
    setDataType(event.target.value);
  };

  // Funkcia na spracovanie nahrania súboru
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // CSV validácia
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      console.log("File uploaded:", selectedFile);
    } else {
      alert("Please select a valid CSV file.");
    }
  };

  // Funkcia na odoslanie súboru na server
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!dataType) {
      alert("Please select data type.");
      return;
    }

    const formData = new FormData();
    formData.append("dataType", dataType); // Pridanie typu dát do formData
    formData.append("myCSVFile", file);

    console.log("Uploading file...");

    // POST request na server
    try {
      const response = await fetch(
        `https://server-production-5a4b.up.railway.app/api/uploadstudents`,
        {
          method: "POST",
          body: formData,
        }
      );

      // const response = await fetch(`http://localhost:5000/api/uploadstudents`, {
      //   method: "POST",
      //   body: formData,
      // });
      console.log("File uploaded successfully.");
      console.log(response);
    } catch (error) {
      console.error("Error uploading the file.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="user-containter">
        <User />
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <h2 htmlFor="dataType">Vyberte, čo chcete vložiť:</h2>
          <select
            id="dataType"
            name="dataType"
            value={dataType}
            onChange={handleTypeChange}
            className="select-data-type"
          >
            <option value="">Vyberte</option>
            <option value="internat">Internát</option>
            <option value="student">Študent</option>
            <option value="izba">Izba</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="file"
            id="file"
            name="file"
            accept=".csv"
            onChange={handleFileChange}
            className="file-input"
          />
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
}
