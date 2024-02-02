import { useState } from "react";
import "./studentMarks.css";
import StudentMarksGet from "./studentMarksGet";
import { Link } from "react-router-dom";

import StudentMarksBySem from "./studentMarksBysem"
import StudentMarksPut from "./studentMarksPut";
import StudentMarksInsert from "./studentMarksInsert";

function studentMarks() {
  const [get,setGet]=useState(false);
  const [insert,setInsert]=useState(false);
  const [update,setUpdate]=useState(false);

  const handleClick =(x)=>{
    if (x==="GET"){
      setGet(true);
      setInsert(false);
      setUpdate(false);
    }
    else if (x==="INSERT"){
      setInsert(true);
      setGet(false);
      setUpdate(false);
    }
    else if(x=="UPDATE"){
      setUpdate(true);
      setGet(false);
      setInsert(false);
    }
  }
  
  return (
    <>
      <div className="thisPage">
        <div className="sidebar">
          <Link className="sideItems" onClick={()=>{handleClick("GET")}}>
            Get Marks
          </Link>
          <Link className="sideItems" onClick={()=>{handleClick("INSERT")}}>Enter Marks</Link>
          <Link className="sideItems" onClick={()=>{handleClick("UPDATE")}}>Update Marks</Link>
          
        </div>
        <div>
          {
            get?<StudentMarksBySem></StudentMarksBySem>:null
          }
          {
            insert?<StudentMarksInsert></StudentMarksInsert>:null
          }
          {
            update?<StudentMarksPut></StudentMarksPut>:null
          }
        </div>
      </div>
    </>
  );
}

export default studentMarks;
