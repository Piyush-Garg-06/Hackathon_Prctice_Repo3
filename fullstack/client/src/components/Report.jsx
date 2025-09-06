import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import { Chart } from "chart.js/auto";
import emailjs from "emailjs-com";
import "./Report.css";

const Report = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      fetch(`http://localhost:5000/report/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setReportData(data);
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
    if (reportData) {
      const academic = reportData.averageMarks || 0;
      const activities = (reportData.activities || 0) * 10; // Assuming activities score
      const overall = Math.round((academic + activities) / 2);

      // Update text values
      document.getElementById("percentText").innerText = isNaN(overall) ? "0%" : overall + "%";
      document.getElementById("academicText").innerText = isNaN(academic) ? "0%" : academic + "%";
      document.getElementById("activityText").innerText = isNaN(activities) ? "0%" : activities + "%";

      // Progress bar animation
      document.getElementById("academicBar").style.width = isNaN(academic) ? "0%" : academic + "%";
      document.getElementById("activityBar").style.width = isNaN(activities) ? "0%" : activities + "%";

      // Destroy old chart instance
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create Doughnut Chart
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Performance", "Remaining"],
          datasets: [
            {
              data: [overall, 100 - overall],
              backgroundColor: ["#4A90E2", "#e0e0e0"],
              cutout: "75%",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
        },
      });

      // Warning + Email
      const warningMsg = document.getElementById("warningMsg");
      if (overall < 50) {
        warningMsg.innerText =
          "⚠️ Overall Performance below 50%! Email sent to Parents.";

        emailjs
          .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            student_name: reportData.name,
            parent_email: "parent@gmail.com",
            overall_score: overall,
          })
          .then(() => console.log("Email sent"))
          .catch((err) => console.log("Email failed:", err));
      }

      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }
  }, [reportData]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Reports Section */}
      <div className="container">
        <div className="card">
          <h2>Overall Performance</h2>
          <div className="circle-chart">
            <canvas id="performanceChart" ref={chartRef}></canvas>
            <div className="center-text" id="percentText"></div>
          </div>

          {/* Progress Bars */}
          <div className="progress-section">
            <div>
              <p className="progress-label">
                📘 Academic Performance (<span id="academicText"></span>)
              </p>
              <div className="progress-bar">
                <div id="academicBar" className="progress-fill academic"></div>
              </div>
            </div>
            <div>
              <p className="progress-label">
                🎭 Other Activities (<span id="activityText"></span>)
              </p>
              <div className="progress-bar">
                <div id="activityBar" className="progress-fill activities"></div>
              </div>
            </div>
          </div>

          <p id="warningMsg" className="warning"></p>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>© 2025 Student Performance System | Designed by Innovation Ninjas</p>
      </footer>
    </>
  );
};

export default Report;
