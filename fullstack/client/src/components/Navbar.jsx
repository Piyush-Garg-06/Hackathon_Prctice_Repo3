import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSignin = () => {
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}></div>
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/profile">
            <h1>Student Performance</h1>
          </Link>
        </div>

        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/attendance" onClick={() => setMenuOpen(false)}>Attendance</Link>
          <Link to="/results" onClick={() => setMenuOpen(false)}>Results</Link>
          <Link to="/report" onClick={() => setMenuOpen(false)}>Reports</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          {user ? (
            <>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="auth-btn logout-btn">
                Logout ({user.name})
              </button>
            </>
          ) : (
            <button onClick={() => { handleSignin(); setMenuOpen(false); }} className="auth-btn signin-btn">
              Sign In
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
