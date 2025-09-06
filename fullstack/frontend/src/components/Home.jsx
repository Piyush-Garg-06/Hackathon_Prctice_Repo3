import React, { useState } from "react";
import "./Home.css";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">StudentPortal</div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Performance</a></li>
          <li><a href="#">Courses</a></li>
          <li><a href="#">Contact</a></li>
          <li><button className="login-btn">Logout</button></li>
        </ul>

        {/* Hamburger Menu */}
        <div 
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Home Section */}
      <section className="home-section">
        <h1>Welcome to Student Performance Portal</h1>
        <p>Track your progress, view performance reports, and explore courses to boost your skills.</p>
        <button className="explore-btn">Explore Now</button>
      </section>
    </div>
  );
}
