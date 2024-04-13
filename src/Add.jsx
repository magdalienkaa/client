import React, { useState } from "react";
import axios from "axios";
import User from "./User";
import "./App.css";

const Add = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedOption) {
      alert("Prosím, vyberte súbor a možnosť.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("csv", selectedFile);

      let endpoint;
      switch (selectedOption) {
        case "internát":
          endpoint = "/upload-interns";
          break;
        case "študent":
          endpoint = "/upload-students";
          break;
        case "izba":
          endpoint = "/upload-rooms";
          break;
        default:
          alert("Vybrali ste neplatnú možnosť.");
          return;
      }

      await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Súbor úspešne nahraný!");
    } catch (error) {
      console.error("Chyba pri nahrávaní súboru:", error);
      alert("Pri nahrávaní súboru sa vyskytla chyba.");
    }
  };

  return (
    <div className="add-container">
      {" "}
      <User />
      <div className="upload-section">
        <h2>Vyberte, čo chcete nahrať:</h2>
        <div>
          <label>
            <input
              type="radio"
              value="internát"
              checked={selectedOption === "internát"}
              onChange={() => handleOptionChange("internát")}
            />
            Internát
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="študent"
              checked={selectedOption === "študent"}
              onChange={() => handleOptionChange("študent")}
            />
            Študent
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="izba"
              checked={selectedOption === "izba"}
              onChange={() => handleOptionChange("izba")}
            />
            Izba
          </label>
        </div>
        <div className="file-upload">
          <input type="file" onChange={handleFileChange} />
          <button className="upload-button" onClick={handleUpload}>
            Nahraj súbor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
