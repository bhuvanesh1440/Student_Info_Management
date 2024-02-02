import "./studentDetails.css";
import { useState } from "react";
import StudentAdd from "./StudentAdd";
import StudentUpdate from "./StudentUpdate";
import StudentView from "./StudentView";

import { Link } from "react-router-dom";

function studentDetails() {
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
        <Link className="sideItems" onClick={()=>{handleClick("INSERT")}}>Add Student</Link>
          <Link className="sideItems" onClick={()=>{handleClick("GET")}}>
            view StudentDetails
          </Link>
          
          <Link className="sideItems" onClick={()=>{handleClick("UPDATE")}}>Update StudentDetails</Link>
          
        </div>
        <div>
          {
            get?<StudentView></StudentView>:null
          }
          {
            insert?<StudentAdd></StudentAdd>:null
          }
          {
            update?<StudentUpdate></StudentUpdate>:null
          }
        </div>
      </div>
    </>
  )
}

export default studentDetails;
