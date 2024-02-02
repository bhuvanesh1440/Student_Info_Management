import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

function Login() {
  const { login, isLoggedIn } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic (you can add authentication checks here)
    await login();
    setSubmitted(true);

    // Redirect to the main page
    navigate("/"); // Change this to the actual route you want to redirect to
  };

  return (
    <div className="login">
      {!submitted && !isLoggedIn ? (
        <form>
          <input type="text" placeholder="&nbsp; Username" />
          <input type="password" placeholder="&nbsp; Password" />
          <Link to="/" className="link" onClick={handleSubmit}>
            Submit
          </Link>
          <Link to="/" className="link">
            <p className="btn-cancel">Cancel</p>
          </Link>
        </form>
      ) : (
        <p>Login successful. Redirecting...</p>
        // You can add a redirect or any other UI for a successful login
      )}
    </div>
  );
}

export default Login;
