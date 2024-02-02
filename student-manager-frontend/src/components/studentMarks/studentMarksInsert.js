import React, { useState } from "react";
import axios from "axios";
import "./studentMarks.css";

function StudentMarksInsert() {
  const [rollNumber, setRollNumber] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("sem1");
  const [subjects, setSubjects] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [insertBtn, setInsertBtn] = useState(false);

  const handleRollNumberChange = (e) => {
    setRollNumber(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const clearMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming your backend is running at http://localhost:5000
      const response = await axios.get(
        `http://localhost:5000/marks/${rollNumber}/${semester}`
      );

      // If marks are already entered for the semester, display an error message
      if (response.data.marks && response.data.marks.length > 0) {
        setErrorMessage("Marks are already entered for this semester.");
        setSuccessMessage(null);

        // Clear messages after 3 seconds
        setTimeout(clearMessages, 3000);
        return;
      }

      // Fetch subjects based on the selected branch and semester
      const subjectsData = {
        CSE: {
            "sem1": ["Math", "Physics", "Chemistry", "subject1", "subject1", "subject1", "subject1", "subject1"],
            "sem2": ["Data Structures", "Algorithms", "Database"],
            "sem3": ["Math", "Physics", "Chemistry", "subject1", "subject1", "subject1", "subject1", "subject1"],
            "sem4": ["Data Structures", "Algorithms", "Database"],
            "sem5": ["Math", "Physics", "Chemistry", "subject1", "subject1", "subject1", "subject1", "subject1"],
            "sem6": ["Data Structures", "Algorithms", "Database"],
            "sem7": ["Math", "Physics", "Chemistry", "subject1", "subject1", "subject1", "subject1", "subject1"],
            "sem8": ["Data Structures", "Algorithms", "Database"],
          // Add more semesters as needed
        },
        ECE: {
          "sem1": ["Signals and Systems", "Electronics", "Digital Circuits"],
          "sem2": ["Communication Systems", "Control Systems", "VLSI"],
          // Add more semesters as needed
        },
        // Add more branches as needed
      };

      // Set subjects based on the selected branch and semester
      setSubjects(subjectsData[branch][semester] || []);

      // Set the fetched marks data to the table
      setTableData(response.data.marks || []);
      setSuccessMessage(null); // Clear success message
      setInsertBtn(true); // Enable the Insert button
    } catch (error) {
      console.error("Error fetching marks:", error.response.data.message);
      setErrorMessage(error.response.data.message);

      // Clear messages after 3 seconds
      setTimeout(clearMessages, 3000);
    }
  };

  const handleInsertSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming your backend is running at http://localhost:5000
      await axios.post(
        `http://localhost:5000/marks/${rollNumber}/update/${semester}`,
        { marks: tableData }
      );

      // Insert success
      setSuccessMessage("Marks Entered successfully!");
      setErrorMessage(null); // Clear error message

      // Clear the form
      setRollNumber("");
      setBranch("CSE");
      setSemester("sem1");
      setSubjects([]);
      setTableData([]);
      setInsertBtn(false); // Disable the Insert button

      // Clear messages after 3 seconds
      setTimeout(clearMessages, 3000);
    } catch (error) {
      console.error("Error inserting marks:", error.response.data.message);
      setErrorMessage(error.response.data.message);
      setSuccessMessage(null); // Clear success message

      // Clear messages after 3 seconds
      setTimeout(clearMessages, 3000);
    }
  };

  return (
    <>
      <div className="marks">
        <h1 className="heading">Enter Student Marks</h1>
        <form
          className="row gy-2 gx-3 align-items-center"
          onSubmit={handleSubmit}
        >
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
              <option value="sem1">Semester 1</option>
              <option value="sem2">Semester 2</option>
              <option value="sem3">Semester 3</option>
              <option value="sem4">Semester 4</option>
              <option value="sem5">Semester 5</option>
              <option value="sem6">Semester 6</option>
              <option value="sem7">Semester 7</option>
              <option value="sem8">Semester 8</option>
            </select>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Get
            </button>
          </div>
        </form>
        <br />
        <br />
        <form
          className="row gy-2 gx-3 align-items-center"
          onSubmit={handleInsertSubmit}
        >
          {subjects.map((subject, index) => (
            <React.Fragment key={index}>
              <div className="col-3">
                <label
                  htmlFor={`inputMarks-${index}`}
                  className="col-form-label text-white"
                >
                  {subject}
                </label>
              </div>
              <div className="col-2">
                <input
                  type="text"
                  className="form-control"
                  id={`inputMarks-${index}`}
                  placeholder={subject}
                  value={tableData[index] || ""}
                  onChange={(e) =>
                    setTableData((prevData) => {
                      const newData = [...prevData];
                      newData[index] = e.target.value;
                      return newData;
                    })
                  }
                />
              </div>
            </React.Fragment>
          ))}
          <div className="col-12">
            {insertBtn && rollNumber ? (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            ) : null}
          </div>
        </form>
        <p className="error-message">{errorMessage}</p>
        <p className="success-message">{successMessage}</p>
      </div>
    </>
  );
}

export default StudentMarksInsert;
