import React, { useState } from "react";
import axios from "axios";
import './studentMarks.css'

function StudentMarksBySem() {
  const [rollNumber, setRollNumber] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("Semester 1");
  const [subjects, setSubjects] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleRollNumberChange = (e) => {
    setRollNumber(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const mapSemesterToBackendFormat = (frontendSemester) => {
    // Map frontend semester to backend format
    const semesterMap = {
      "Semester 1": "sem1",
      "Semester 2": "sem2",
      "Semester 3": "sem3",
      "Semester 4": "sem4",
      "Semester 5": "sem5",
      "Semester 6": "sem6",
      "Semester 7": "sem7",
      "Semester 8": "sem8",
      
    };

    return semesterMap[frontendSemester] || frontendSemester;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Map frontend semester to backend format
      const backendSemester = mapSemesterToBackendFormat(semester);

      // Assuming your backend is running at http://localhost:5000
      const response = await axios.get(
        `http://localhost:5000/marks/${rollNumber}/${backendSemester}`
      );

      // Fetch subjects based on the selected branch and semester
      const subjectsData = {
        CSE: {
          "Semester 1": ["Math", "Physics", "Chemistry", "subject1", "subject1", "subject1", "subject1", "subject1"],
          "Semester 2": ["Data Structures", "Algorithms", "Database"],
          "Semester 3": ["Math", "Physics", "Chemistry", "subject1", "subject1", "subject1", "subject1", "subject1"],
          "Semester 4": ["Data Structures", "Algorithms", "Database"],
          "Semester 5": ["Math", "Physics", "Chemistry", "subject1", "subject1", "subject1", "subject1", "subject1"],
          "Semester 6": ["Data Structures", "Algorithms", "Database"],
          "Semester 7": ["Math", "Physics", "Chemistry", "subject1", "subject1", "subject1", "subject1", "subject1"],
          "Semester 8": ["Data Structures", "Algorithms", "Database"],
          // Add more semesters as needed
        },
        ECE: {
          "Semester 1": ["Signals and Systems", "Electronics", "Digital Circuits"],
          "Semester 2": ["Communication Systems", "Control Systems", "VLSI"],
          // Add more semesters as needed
        },
        // Add more branches as needed
      };

      // Set subjects based on the selected branch and semester
      setSubjects(subjectsData[branch][semester] || []);

      // Set the fetched marks data to the table
      setTableData(response.data.marks);
    } catch (error) {
      console.error("Error fetching marks:", error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="marks">
        <h1 className="heading">Check Student Marks</h1>
        <form className="row gy-2 gx-3 align-items-center" onSubmit={handleSubmit}>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Roll No"
              value={rollNumber}
              onChange={handleRollNumberChange}
            />
          </div>
          <div className="col-auto">
            <label className="visually-hidden" htmlFor="branchSelect">
              Branch
            </label>
            <select
              className="form-select"
              id="branchSelect"
              value={branch}
              onChange={handleBranchChange}
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="CSE">IT</option>
              <option value="ECE">EEE</option>
              <option value="CSE">CSE-AI</option>
              <option value="ECE">CIVIL</option>
              <option value="CSE">MECH</option>
              
            </select>
          </div>
          <div className="col-auto">
            <label className="visually-hidden" htmlFor="semesterSelect">
              Semester
            </label>
            <select
              className="form-select"
              id="semesterSelect"
              value={semester}
              onChange={handleSemesterChange}
            >
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              <option value="Semester 3">Semester 3</option>
              <option value="Semester 4">Semester 4</option>
              <option value="Semester 5">Semester 5</option>
              <option value="Semester 6">Semester 6</option>
              <option value="Semester 7">Semester 7</option>
              <option value="Semester 8">Semester 8</option>
            </select>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Get
            </button>
          </div>
        </form>
        
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Subject</th>
              <th scope="col">Grades</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{subject}</td>
                <td>{tableData[index]}</td> {/* Display marks data here */}
              </tr>
            ))}
          </tbody>
        </table>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </>
  );
}

export default StudentMarksBySem;
