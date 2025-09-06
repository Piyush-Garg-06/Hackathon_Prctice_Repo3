import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import "./Attendance.css";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      fetch(`http://localhost:5000/attendance/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setAttendanceData(data);
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

  useEffect(() => {
    if (attendanceData) {
      const ctx = document.getElementById("attendanceChart");

      // Destroy existing chart if any
      if (Chart.getChart("attendanceChart")) {
        Chart.getChart("attendanceChart").destroy();
      }

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(attendanceData.subjects || {}),
          datasets: [
            {
              label: "Attendance %",
              data: Object.values(attendanceData.subjects || {}),
              backgroundColor: ["#4A90E2", "#8E2DE2", "#4A90E2", "#8E2DE2"],
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, max: 100 },
          },
        },
      });
    }
  }, [attendanceData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!attendanceData) return <div>No attendance data available</div>;

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Attendance Content */}
      <div className="container">
        <h2>My Subject-wise Attendance</h2>

        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Total Classes</th>
              <th>Attended</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(attendanceData.subjects || {}).map(([subject, percentage]) => (
              <tr key={subject}>
                <td>{subject}</td>
                <td>{attendanceData.totalClasses[subject]}</td>
                <td>{Math.round((percentage / 100) * attendanceData.totalClasses[subject])}</td>
                <td className={percentage >= 75 ? "good-attendance" : "low-attendance"}>{percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="chart-card">
          <h3>Attendance Chart (Subject-wise %)</h3>
          <div style={{ height: "400px" }}>
            <canvas id="attendanceChart"></canvas>
          </div>
        </div>
      </div>

      <footer>
        <p>© 2025 Student Performance System | Designed with ❤️ by Nitin</p>
      </footer>
    </div>
  );
}
