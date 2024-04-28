import React, { useEffect, useRef } from "react";
import "./certificate.css";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Certificate = () => {
  const { studentDetails, tableData, subjects, semester } =
    useLocation().state || {};

  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save("certificate.pdf");
    });
  };

  

  useEffect(() => {
    // Log studentDetails, tableData, and semester when the component mounts
    console.log(studentDetails);
    console.log(tableData);
    console.log(semester);
  }, [studentDetails, tableData, semester]);

  if (!studentDetails || tableData.length === 0) {
    return (
      <div>
        {/* Handle the case when studentDetails or tableData is not available */}
        Certificate data not available.
      </div>
    );
  }

  const sum = tableData.reduce(
    (total, currentValue) => total + currentValue,
    0
  );
  const average = sum / tableData.length;

  return (
    <>
      <div className="certi" id="certificate" ref={pdfRef}>
        <div className="body">
          <div className="certificate">
            <div className="container">
              <header>
                <div className="college">
                  <h1>NARASARAOPET ENGINEERING COLLEGE (AUTONOMOUS)</h1>
                  <h5>
                    Kotappakonda Road, Yellamanda (P, O) Narasaraopet-522 601,
                    Guntur District, AP.
                  </h5>
                  <h5>
                    Approved by AICTE, New Delhi & Permanently affiliated to
                    JNTUK, Kakinada. Code: 47.
                  </h5>
                </div>
              </header>

              <div className="t1">
                <table>
                  <tbody>
                    <tr>
                      <th>Hall Ticket No</th>
                      <td>:</td>
                      <td>{studentDetails.rollNumber}</td>
                    </tr>
                    <tr>
                      <th>Name Of The Student</th>
                      <td>:</td>
                      <td>{studentDetails.studentName}</td>
                    </tr>
                    <tr>
                      <th>Father Name</th>
                      <td>:</td>
                      <td>{studentDetails.parentName}</td>
                    </tr>
                    <tr>
                      <th>Examination</th>
                      <td>:</td>
                      <td>
                        {studentDetails.courses} &nbsp; {semester}
                      </td>
                    </tr>
                    <tr>
                      <th>Branch</th>
                      <td>:</td>
                      <td>{studentDetails.branch}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr />
              <h2>Marks Secured</h2>
              <div className="t2">
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Subject Title</th>
                      <th>Grade</th>
                      <th>Credits</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{subjects[index]}</td>
                        <td>{data}</td>
                        <td>3</td>
                        <td>{data > 5 ? "PASS" : "FAIL"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <hr />
              <div className="gpa">
                <h2>SGPA: {average} </h2>
                <p>&nbsp;&nbsp;&nbsp;</p>
                <h2> CGPA: {average}</h2>
              </div>

              <div className="sign">
                <p className="Signature">
                  Signature of Principal and College Seal
                </p>
                <p className="Controller-of-examiner">
                  Controller of Examinations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
                        
      <center>
        <button type="submit" className="btn btn-primary" onClick={downloadPDF}>Download as PDF</button>
      </center>
    </>
  );
};

export default Certificate;
