import React, { useState } from "react";
import axios from "axios";
import "../studentMarks/studentMarks.css";
import "./studentDetails.css";

function StudentAdd() {
  const [studentDetails, setStudentDetails] = useState({
    studentName: "",
    rollNumber: "",
    email: "",
    dateOfBirth: "",
    address: "",
    courses: "",
    branch: "",
    phoneNumber: "",
    parentName: "",
    parentPhoneNumber: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setStudentDetails({
      studentName: "",
      rollNumber: "",
      email: "",
      dateOfBirth: "",
      address: "",
      courses: "",
      branch: "",
      phoneNumber: "",
      parentName: "",
      parentPhoneNumber: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if all required fields are filled
    const requiredFields = [
      "studentName",
      "rollNumber",
      "email",
      "dateOfBirth",
      "address",
      "courses",
      "branch",
      "phoneNumber",
      "parentName",
      "parentPhoneNumber",
    ];
  
    const missingFields = requiredFields.filter((field) => !studentDetails[field]);
  
    if (missingFields.length > 0) {
      setErrorMessage(`Please fill in all the required fields: ${missingFields.join(", ")}`);
      // Clear error message after 3 seconds
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/student/add",
        studentDetails
      );

      const entryDetails={
      
        "studentName": response.data.studentName,
        "rollNumber": response.data.rollNumber,

    }

    const entry = await axios.post(
      "http://localhost:5000/marks/add",
      entryDetails
    );
  
    console.log(entryDetails);
      if (response && response.data) {
        setSuccessMessage("Student details submitted successfully!");
        setErrorMessage(null);
  
        // Clear the form after successful submission
        clearForm();
  
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        // Handle the case where response or response.data is undefined
        setErrorMessage("Unexpected response from the server. Please try again.");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error submitting student details:", error.response?.data?.message || error.message);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
  
      // Clear error message after 3 seconds
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };
  


  return (
    <div className="details">
      <h1 className="heading">Enter Student Details</h1>
      <center>{successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}</center>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="studentName" className="label col-sm-3 col-form-label">
            Student Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="studentName"
              name="studentName"
              value={studentDetails.studentName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="rollNumber" className="label col-sm-3 col-form-label">
            Roll Number
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="rollNumber"
              name="rollNumber"
              value={studentDetails.rollNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="email" className="label col-sm-3 col-form-label">
            Email
          </label>
          <div className="col-sm-4">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={studentDetails.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="phoneNumber" className="label col-sm-3 col-form-label">
            Phone Number
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={studentDetails.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="dateOfBirth" className="label col-sm-3 col-form-label">
            Date of Birth
          </label>
          <div className="col-sm-4">
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={studentDetails.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="address" className="label col-sm-3 col-form-label">
            Address
          </label>
          <div className="col-sm-4">
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={studentDetails.address}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="course" className="label col-sm-3 col-form-label">
            Course
          </label>
          <div className="col-sm-4">
            <select
              className="form-select"
              id="courses"
              name="courses"
              value={studentDetails.courses}
              onChange={handleInputChange}
              required
            >
              <option value="">Choose...</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MBA">MBA</option>
              <option value="McA">McA</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="branch" className="label col-sm-3 col-form-label">
            Branch
          </label>
          <div className="col-sm-4">
            <select
              className="form-select"
              id="branch"
              name="branch"
              value={studentDetails.branch}
              onChange={handleInputChange}
              required
            >
              <option value="">Choose...</option>
              <option value="Computer Science and Engineering">Computer Science and Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="parentName" className="label col-sm-3 col-form-label">
            Parent Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="parentName"
              name="parentName"
              value={studentDetails.parentName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="parentPhoneNumber" className="label col-sm-3 col-form-label">
            Parent Phone Number
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="parentPhoneNumber"
              name="parentPhoneNumber"
              value={studentDetails.parentPhoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <span className="col-sm-8">
          <label htmlFor="inputEmail3" className="label col-sm-3 col-form-label">
            &nbsp;
          </label>
        </span>
        <button type="button" className="btn btn-secondary" onClick={clearForm}>
          Clear
        </button>
      </form>
      
    </div>
  );
}

export default StudentAdd;
