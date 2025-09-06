import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "./Dashboard.css";

// Chart.js register
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      fetch(`https://hackathon-prctice-repo3.onrender.com/dashboard/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setError('User not logged in');
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  // Academic Performance Chart Data
  const marksData = {
    labels: Object.keys(data.marks),
    datasets: [
      {
        label: "Marks (%)",
        data: Object.values(data.marks),
        backgroundColor: ["#4A90E2", "#8E2DE2", "#FF7F50", "#3CB371", "#FFD700"],
      },
    ],
  };

  const marksOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Academic Performance",
        font: { size: 16 },
        color: "#4A90E2",
      },
    },
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };

  // Activity Participation Chart Data
  const activityData = {
    labels: Object.keys(data.activityParticipation),
    datasets: [
      {
        data: Object.values(data.activityParticipation),
        backgroundColor: ["#4A90E2", "#8E2DE2", "#3CB371", "#FFD700"],
        borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
        borderWidth: 2,
      },
    ],
  };

  const activityOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Activity Participation",
        font: { size: 16 },
        color: "#4A90E2",
      },
    },
  };

  return (
    <div className="dashboard-body">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard */}
      <main className="dashboard-container">
        <h2>Welcome, {JSON.parse(localStorage.getItem('user'))?.name || 'User'} 👋</h2>

        {/* Quick Stats */}
        <section className="stats">
          <div className="card">
            <h3>Attendance</h3>
            <p>{typeof data.attendance === 'object' ? JSON.stringify(data.attendance) : data.attendance + '%'}</p>
          </div>
          <div className="card">
            <h3>Average Marks</h3>
            <p>{typeof data.averageMarks === 'object' ? JSON.stringify(data.averageMarks) : data.averageMarks + '%'}</p>
          </div>
          <div className="card">
            <h3>Activities</h3>
            <p>{typeof data.activities === 'object' ? JSON.stringify(data.activities) : data.activities + ' Events'}</p>
          </div>
        </section>

        {/* Charts */}
        <section className="charts">
          <div className="chart-card">
            <Bar options={marksOptions} data={marksData} />
          </div>
          <div className="chart-card">
            <Pie options={activityOptions} data={activityData} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <p>© 2025 Student Performance System</p>
        <p className="designer">Designed by Innovation Ninjas</p>
      </footer>
    </div>
  );
};

export default Dashboard;
