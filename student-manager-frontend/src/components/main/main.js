import React from "react";
import "./main.css";
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

function Main() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <div className="main">
        <div className="greet">
          <h1>Welcome to Student Manager</h1>
          {isLoggedIn ? (
            <p>
              Welcome back! Explore the features of our student management
              portal to stay informed about your academic progress, track
              performance trends, and access personalized feedback, all in one
              centralized hub.
            </p>
          ) : (
            <p>
              Welcome to our student management portal, where academic
              excellence meets seamless organization. Our user-friendly
              interface empowers faculty to effortlessly navigate through the
              vast realm of academic data.
            </p>
          )}
          {isLoggedIn ? (<Link className="btnn" >Explore..</Link>) : (
            <Link to="/login" className="btnn">
              Login
            </Link>
          )}
        </div>
        <div className="animation">
          <Spline scene="https://prod.spline.design/Ev5uq7jEw1Ue7tK8/scene.splinecode" />
        </div>
      </div>
    </>
  );
}

export default Main;
