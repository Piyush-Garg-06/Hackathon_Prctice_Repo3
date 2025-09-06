import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Home Content */}
      <section className="home">
        <h2>Welcome to Student Performance Portal 🎓</h2>
        <p>
          Track your academic journey, attendance records, and activity
          participation in one simple dashboard.
        </p>

        {/* Feature Cards */}
        <div className="cards">
          <div className="card">
            <h3>📊 Academic Progress</h3>
            <p>Check your MTT1, MTT2, and RTU exam results all in one place.</p>
            <Link to="/dashboard" className="btn">
              View Dashboard
            </Link>
          </div>

          <div className="card">
            <h3>🕒 Attendance</h3>
            <p>Monitor subject-wise attendance to avoid shortages.</p>
            <Link to="/attendance" className="btn">
              Check Attendance
            </Link>
          </div>

          <div className="card">
            <h3>🎭 Activities</h3>
            <p>Record and celebrate your extracurricular achievements.</p>
            <Link to="/activities" className="btn">
              See Activities
            </Link>
          </div>

          <div className="card">
            <h3>📧 Smart Reports</h3>
            <p>Parents get notified if overall performance is below 50%.</p>
            <Link to="/report" className="btn">
              Generate Report
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Student Performance System</p>
        <p className="designer">Designed by Innovation Ninjas</p>
      </footer>
    </>
  );
};

export default Home;
