import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import "./Profile.css";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      fetch(`https://hackathon-prctice-repo3.onrender.com/profile/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setProfileData(data);
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
  if (!profileData) return <div>No profile data available</div>;

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Profile Section */}
      <div className="profile-container">
        <div className="profile-card">
          <img
            src="/student-photo.jpg"
            alt="Student"
          />
          <h2>{JSON.parse(localStorage.getItem('user'))?.name || 'Student'}</h2>
          <p>🎓 B.Tech - 3rd Year</p>

          <div className="info">
            <p>
              📧 <span>Email:</span> {profileData.profile.email}
            </p>
            <p>
              📞 <span>Phone:</span> {profileData.profile.phone}
            </p>
          </div>
        </div>
      </div>

      <footer>
        <p>© 2025 Student Performance System</p>
        <p className="designer">Designed by Innovation Ninjas</p>
      </footer>
    </div>
  );
}
