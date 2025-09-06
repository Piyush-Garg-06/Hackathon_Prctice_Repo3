import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import Chart from "chart.js/auto";
import "./Result.css";

const Result = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [resultsData, setResultsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      fetch(`https://hackathon-prctice-repo3.onrender.com/results/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setResultsData(data);
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
    if (resultsData && resultsData.results) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      const subjects = resultsData.results.map(r => r.subject);
      const mtt1 = resultsData.results.map(r => r.mtt1);
      const mtt2 = resultsData.results.map(r => r.mtt2);
      const rtu = resultsData.results.map(r => r.rtu);

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: subjects,
          datasets: [
            {
              label: "MTT-1",
              data: mtt1,
              backgroundColor: "#4A90E2",
              borderRadius: 8,
            },
            {
              label: "MTT-2",
              data: mtt2,
              backgroundColor: "#8E2DE2",
              borderRadius: 8,
            },
            {
              label: "RTU Result",
              data: rtu,
              backgroundColor: "#2ecc71",
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });

      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }
  }, [resultsData]);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="container">
        <h2>My Academic Results</h2>
        {loading && <p>Loading results...</p>}
        {error && <p>Error: {error}</p>}
        {resultsData && resultsData.results && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>MTT-1 (20)</th>
                  <th>MTT-2 (20)</th>
                  <th>RTU Result (100)</th>
                </tr>
              </thead>
              <tbody>
                {resultsData.results.map((result, index) => (
                  <tr key={index}>
                    <td>{result.subject}</td>
                    <td>{result.mtt1}</td>
                    <td>{result.mtt2}</td>
                    <td>{result.rtu}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="chart-card">
              <h3>Performance Chart</h3>
              <canvas ref={chartRef} id="resultChart"></canvas>
            </div>
          </>
        )}
      </div>

      <footer>
        <p>© 2025 Student Performance System | Designed with ❤️ by Nitin</p>
      </footer>
    </div>
  );
};

export default Result;
