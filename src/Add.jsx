import React, { useState } from "react";
import User from "./User";
import "./App.css";

export default function Add() {
  const [file, setFile] = useState(null);
  const [dataType, setDataType] = useState("");

  const handleTypeChange = (event) => {
    setDataType(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      console.log("Nahraný súbor", selectedFile);
    } else {
      alert("Prosím, vložte csv súbor.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!dataType) {
      alert("Prosím, vyberte typ súboru.");
      return;
    }

    const formData = new FormData();
    formData.append("dataType", dataType);
    formData.append("myCSVFile", file);

    let uploadEndpoint;

    switch (dataType) {
      case "student":
        uploadEndpoint = "uploadstudents";
        break;
      case "izba":
        uploadEndpoint = "uploadroom";
        break;
      default:
        alert("Zvolili ste nesprávny typ dát.");
        return;
    }

    try {
      const response = await fetch(
        `https://server-production-5a4b.up.railway.app/api/${uploadEndpoint}`,
        {
          method: "POST",
          body: formData,
        }
      );
      alert("Súbor bol úspešne nahraný.");
      console.log("Súbor bol úspešne nahraný.");
      console.log(response);
    } catch (error) {
      console.error("Vyskytla sa chyba pri nahrávaní súboru.");
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
