// StudentMarksGet.js
import React, { useState } from "react";
import axios from "axios";

function StudentMarksGet() {
  const [rollNumber, setRollNumber] = useState("");
  const [marksData, setMarksData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.get(
        `http://localhost:5000/marks/${rollNumber}`
      );

      // Handle success
      setMarksData(response.data);
    } catch (error) {
      // Handle error
      console.error("Error fetching marks:", error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  const renderMarksTable = () => {
    if (!marksData) {
      return null;
    }
  
    const { studentName, rollNumber, ...semesters } = marksData;
  
    return (
      <div className="marks-table">
        <h3>Marks for {studentName} (Roll Number: {rollNumber}):</h3>
        <table>
          <thead>
            <tr>
              <th>Semester</th>
              <th>Subject 1</th>
              <th>Subject 2</th>
              <th>Subject 3</th>
              {/* Add more subject columns as needed */}
            </tr>
          </thead>
          <tbody>
            {Object.keys(semesters).map((semester) => (
              <tr key={semester}>
                <td>{semester}</td>
                {Array.isArray(semesters[semester]) ? (
                  semesters[semester].map((mark, index) => (
                    <td key={index}>{mark}</td>
                  ))
                ) : (
                  <td>{semesters[semester]}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  
  return (
    <div className="marks-get-form">
      <h2>Get Student Marks</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Roll Number:
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </label>
        <button type="submit">Get Marks</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {renderMarksTable()}
    </div>
  );
}

export default StudentMarksGet;
