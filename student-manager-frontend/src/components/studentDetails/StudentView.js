import React, { useState } from "react";
import axios from "axios";

function StudentView() {
  const [rollNumber, setRollNumber] = useState("");
  const [studentDetails, setStudentDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const handleRollNumberChange = (e) => {
    setRollNumber(e.target.value);
  };

  const clearMessages = () => {
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/student/${rollNumber}`);
      setStudentDetails(response.data);
      console.log(studentDetails);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error fetching student details:", error.response.data.message);
      setErrorMessage(error.response.data.message);

      // Clear error message after 3 seconds
      setTimeout(clearMessages, 3000);
    }
  };

  return (
    <center>
      <div className="details">
      <h1 className="heading">Student Details</h1>
      <form className="row gy-2 gx-3 align-items-center" onSubmit={handleSubmit}>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            id="autoSizingInput"
            placeholder="Roll No"
            value={rollNumber}
            onChange={handleRollNumberChange}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">
            Get
          </button>
        </div>
        <br />
      </form>
      <br />

      {Object.keys(studentDetails).length > 0 && (
        <table className="table table-success table-striped" id="table">
          <tbody>
            {Object.entries(studentDetails).map(([key, value]) => key !== "__v" && key !== "_id" &&(
              <tr key={key}>
                <th scope="row">{key.toUpperCase()}</th>
                <td>{key === "dateOfBirth" ? value.split("T")[0] : value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    </center>
  );
}

export default StudentView;
