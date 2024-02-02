import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function StudentUpdate() {
  const [rollNumber, setRollNumber] = useState("");
  const [studentDetails, setStudentDetails] = useState({
    studentName: "",
    rollNumber: "",
    email: "",
    dateOfBirth: null,
    address: "",
    courses: "",
    branch: "",
    phoneNumber: "",
    parentName: "",
    parentPhoneNumber: "",
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isRollNumberValid, setIsRollNumberValid] = useState(true);

  const handleRollNumberChange = (e) => {
    setRollNumber(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setStudentDetails((prevDetails) => ({ ...prevDetails, dateOfBirth: date }));
  };

  const clearMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/student/${rollNumber}`);
      const fetchedStudentDetails = response.data;
      const dateOfBirth = fetchedStudentDetails.dateOfBirth
        ? new Date(fetchedStudentDetails.dateOfBirth)
        : null;

      setStudentDetails({
        studentName: fetchedStudentDetails.studentName,
        rollNumber: fetchedStudentDetails.rollNumber,
        email: fetchedStudentDetails.email,
        dateOfBirth: dateOfBirth,
        address: fetchedStudentDetails.address,
        courses: fetchedStudentDetails.courses,
        branch: fetchedStudentDetails.branch,
        phoneNumber: fetchedStudentDetails.phoneNumber,
        parentName: fetchedStudentDetails.parentName,
        parentPhoneNumber: fetchedStudentDetails.parentPhoneNumber,
      });

      setSelectedDate(dateOfBirth);
      setIsRollNumberValid(true);
      setSuccessMessage(null);
    } catch (error) {
      console.error("Error fetching student details:", error.response.data.message);
      setErrorMessage(error.response.data.message);
      setStudentDetails({
        studentName: "",
        rollNumber: "",
        email: "",
        dateOfBirth: null,
        address: "",
        courses: "",
        branch: "",
        phoneNumber: "",
        parentName: "",
        parentPhoneNumber: "",
      });

      // Clear messages after 3 seconds
      setTimeout(clearMessages, 3000);

      // Set roll number validation to false
      setIsRollNumberValid(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedStudent = await axios.patch(`http://localhost:5000/student/${rollNumber}`, studentDetails);

      // Update success
      setSuccessMessage("Student details updated successfully!");
      setErrorMessage(null);

      // Clear the form
      setRollNumber("");
      setStudentDetails({
        studentName: "",
        rollNumber: "",
        email: "",
        dateOfBirth: null,
        address: "",
        courses: "",
        branch: "",
        phoneNumber: "",
        parentName: "",
        parentPhoneNumber: "",
      });

      // Clear messages after 3 seconds
      setTimeout(clearMessages, 3000);
    } catch (error) {
      console.error("Error updating student details:", error.response.data.message);
      setErrorMessage(error.response.data.message);
      setSuccessMessage(null);

      // Clear messages after 3 seconds
      setTimeout(clearMessages, 3000);
    }
  };

  return (
    <div className="details">
      <h1 className="heading">Update Student Details</h1>
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
      </form>
      <br />

      {/* Conditionally render the update form based on roll number validation */}
      {studentDetails.studentName ? (
        <form onSubmit={handleUpdateSubmit} className="details">
          {/* Student details form similar to StudentAdd.js */}
          {/* Student Name field */}
          <div className="row mb-3">
            <label htmlFor="studentName" className="label col-sm-2 col-form-label">
              Student Name
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                id="studentName"
                name="studentName"
                value={studentDetails.studentName}
                onChange={(e) => setStudentDetails((prevDetails) => ({ ...prevDetails, studentName: e.target.value }))}
              />
            </div>
          </div>
          {/* Continue adding the rest of the fields */}
          {/* Email field */}
          <div className="row mb-3">
            <label htmlFor="email" className="label col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={studentDetails.email}
                onChange={(e) => setStudentDetails((prevDetails) => ({ ...prevDetails, email: e.target.value }))}
              />
            </div>
          </div>
          {/* Date of Birth field with DatePicker */}
          <div className="row mb-3">
            <label htmlFor="dateOfBirth" className="label col-sm-2 col-form-label">
              Date of Birth
            </label>
            <div className="col-sm-3">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="DD/MM/YYYY"
              />
            </div>
          </div>
          {/* Address field */}
          <div className="row mb-3">
            <label htmlFor="address" className="label col-sm-2 col-form-label">
              Address
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={studentDetails.address}
                onChange={(e) => setStudentDetails((prevDetails) => ({ ...prevDetails, address: e.target.value }))}
              />
            </div>
          </div>
          {/* Continue adding the rest of the fields */}
          {/* Courses field */}
          <div className="row mb-3">
            <label htmlFor="courses" className="label col-sm-2 col-form-label">
              Courses
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                id="courses"
                name="courses"
                value={studentDetails.courses}
                onChange={(e) => setStudentDetails((prevDetails) => ({ ...prevDetails, courses: e.target.value }))}
              />
            </div>
          </div>
          {/* Branch field */}
          <div className="row mb-3">
            <label htmlFor="branch" className="label col-sm-2 col-form-label">
              Branch
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                id="branch"
                name="branch"
                value={studentDetails.branch}
                onChange={(e) => setStudentDetails((prevDetails) => ({ ...prevDetails, branch: e.target.value }))}
              />
            </div>
          </div>
          {/* Phone Number field */}
          <div className="row mb-3">
            <label htmlFor="phoneNumber" className="label col-sm-2 col-form-label">
              Phone Number
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={studentDetails.phoneNumber}
                onChange={(e) => setStudentDetails((prevDetails) => ({ ...prevDetails, phoneNumber: e.target.value }))}
              />
            </div>
          </div>
          {/* Parent Name field */}
          <div className="row mb-3">
            <label htmlFor="parentName" className="label col-sm-2 col-form-label">
              Parent Name
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                id="parentName"
                name="parentName"
                value={studentDetails.parentName}
                onChange={(e) => setStudentDetails((prevDetails) => ({ ...prevDetails, parentName: e.target.value }))}
              />
            </div>
          </div>
          {/* Parent Phone Number field */}
          <div className="row mb-3">
            <label htmlFor="parentPhoneNumber" className="label col-sm-2 col-form-label">
              Parent Phone Number
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                id="parentPhoneNumber"
                name="parentPhoneNumber"
                value={studentDetails.parentPhoneNumber}
                onChange={(e) => setStudentDetails((prevDetails) => ({ ...prevDetails, parentPhoneNumber: e.target.value }))}
              />
            </div>
          </div>
          {/* Update button */}
          <div className="row mb-3">
            <div className="col-sm-3"></div>
            <div className="col-sm-3">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p></p>
      )}
      <p className="error-message">{errorMessage} </p>
      <p className="success-message">{successMessage}</p>
    </div>
  );
}

export default StudentUpdate;
