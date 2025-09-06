import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <nav className="navbar">
        <h1>Student Performance</h1>
        <div className="nav-links">
          <Link to="/">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          <a href="#">Attendance</a>
          <a href="#">Results</a>
          <a href="#">Reports</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <section className="dashboard">
        <h2>Welcome, Nitin 👋</h2>

        <div className="stats">
          <div className="card">
            <h3>Attendance</h3>
            <p>85%</p>
          </div>
          <div className="card">
            <h3>Average Marks</h3>
            <p>82%</p>
          </div>
          <div className="card">
            <h3>Activities</h3>
            <p>5 Events</p>
          </div>
        </div>

        <div className="charts">
          <div className="chart-card">
            <h3>Academic Performance</h3>
            <p>Chart data will be displayed here.</p>
          </div>
          <div className="chart-card">
            <h3>Activity Participation</h3>
            <p>Chart data will be displayed here.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Student Performance System | Designed by Nitin</p>
      </footer>
    </div>
  );
};

export default Dashboard;