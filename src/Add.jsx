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
        case "Študent":
          endpoint = "upload-students";
          break;
        default:
          alert("Vybrali ste neplatnú možnosť.");
          return;
      }

      await axios.post(
        `https://server-production-5a4b.up.railway.app/api/${endpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Súbor úspešne nahraný!");
    } catch (error) {
      console.error("Chyba pri nahrávaní súboru:", error);
      alert("Pri nahrávaní súboru sa vyskytla chyba.");
    }
  };

  return (
    <div className="add-container">
      <User />
      <div className="upload-section">
        <h2>Vyberte, čo chcete nahrať:</h2>
        <div>
          <label>
            <input
              type="radio"
              value="študent"
              checked={selectedOption === "Študent"}
              onChange={() => handleOptionChange("Študent")}
            />
            Študent
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
