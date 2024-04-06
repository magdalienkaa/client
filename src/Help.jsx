import React, { useState } from "react";
import User from "./User";
import "./App.css";

const Help = () => {
  const [formData, setFormData] = useState({
    email: "",
    description: "",
  });

  const [validEmails] = useState([
    "spfmv@euba.sk",
    "spof@euba.sk",
    "spfhi@euba.sk",
    "spnhf@euba.sk",
    "spfaj@euba.sk",
    "spfpm@euba.sk",
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validEmails.includes(formData.email)) {
      console.log("Form submitted:", formData);
      setFormData({
        email: "",
        description: "",
      });
    } else {
      alert("Zadajte prosím platný email.");
    }
  };

  return (
    <div className="help-container">
      <User />
      <div className="question-box">
        <h2>Opýtaj sa otázku</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <select
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Vyberte email
              </option>
              {validEmails.map((email) => (
                <option key={email} value={email}>
                  {email}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Otázka:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="button">
            <button type="submit">Odoslať</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Help;
