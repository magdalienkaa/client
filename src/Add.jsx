import React from "react";
import User from "./User";
import "./App.css";

export default function Add() {
  const [file, setFile] = React.useState(null);

  // spracovanie nahrania suboru
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // CSV validacia, nie je potrebna podla mna, lebo v inpute su zvolene len .csv koncovky
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      console.log("File uploaded:", selectedFile);
    } else {
      alert("Please select a valid CSV file.");
    }
  };

  // odoslanie suboru na server
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    // tu je to myCSVFile oznacenie, co sa pouziva na serveri
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

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            id="file"
            name="file"
            accept=".csv" // CSV subory
            onChange={handleFileChange}
          />
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
}
