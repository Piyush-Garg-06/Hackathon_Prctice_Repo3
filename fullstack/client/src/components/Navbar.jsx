import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSignin = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/profile">
          <h1>Student Performance</h1>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/results">Results</Link>
        <Link to="/report">Reports</Link>
        <Link to="/contact">Contact</Link>
        {user ? (
          <>
            <button onClick={handleLogout} className="auth-btn logout-btn">
              Logout ({user.name})
            </button>
          </>
        ) : (
          <button onClick={handleSignin} className="auth-btn signin-btn">
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
