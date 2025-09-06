import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Activities.css";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      fetch(`http://localhost:5000/activities/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setActivities(data.activities || []);
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

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div>Error: {error}</div>;
  if (activities.length === 0) return <div>No activities found.</div>;

  return (
    <div>
      <Navbar />

      {/* Activities Section */}
      <div className="activities-container">
        <h2>My Activities</h2>
        <ul className="activities-list">
          {activities.map((activity, index) => (
            <li key={index} className="activity-item">
              <h3>{activity.name}</h3>
              <p>Date: {activity.date}</p>
              <p>Type: {activity.type}</p>
              <p>Description: {activity.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <footer>
        <p>© 2025 Student Performance System | Designed by Innovation Ninjas</p>
      </footer>
    </div>
  );
};

export default Activities;
