import React, { useState } from "react";
import User from "./User";
import "./App.css";

const Help = () => {
  const [formData, setFormData] = useState({
    email: "",
    questionName: "",
    questionDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to backend)
    console.log("Form submitted:", formData);
    // Clear form after submission
    setFormData({
      email: "",
      questionName: "",
      questionDescription: "",
    });
  };

  return (
    <div className="help-container">
      <User />
      <div className="question-box">
        <h2>Ask a Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="questionName">Name:</label>
            <input
              type="text"
              id="questionName"
              name="questionName"
              value={formData.questionName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="questionDescription">Question Description:</label>
            <textarea
              id="questionDescription"
              name="questionDescription"
              value={formData.questionDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="button-container">
            {" "}
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Help;
