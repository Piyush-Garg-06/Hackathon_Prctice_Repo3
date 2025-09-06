import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [userType, setUserType] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate();

  const handleTabSwitch = (type) => {
    setUserType(type);
    setUsername("");
    setPassword("");
    setMessage({ text: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage({
        text: "Please fill in all fields.",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch('https://hackathon-prctice-repo3.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, userType }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage({
          text: `Login successful! Welcome ${data.user.name}.`,
          type: "success",
        });
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home'); // Redirect to home page on successful login
      } else {
        setMessage({
          text: data.message,
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Error logging in. Please try again.",
        type: "error",
      });
    }

    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  return (
    <div className="login-container">
      {/* Photo Section */}
      <div className="login-photo-section">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_5Jno2e0icKHYjl0po1-hyhBAXxYJjs_iIw&s"
          alt="Student studying"
          className="login-image"
        />
      </div>

      {/* Form Section */}
      <div className="login-form-section">
        <h2>Welcome Back!</h2>
        <p>Enter your login details to continue.</p>

        {/* Tabs */}
        <div className="user-type-tabs">
          <span
            className={`user-type-tab ${userType === "student" ? "active" : ""}`}
            onClick={() => handleTabSwitch("student")}
          >
            Student
          </span>
          <span
            className={`user-type-tab ${userType === "parent" ? "active" : ""}`}
            onClick={() => handleTabSwitch("parent")}
          >
            Parent
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">
              {userType === "student" ? "Student ID" : "Email"}
            </label>
            <input
              type={userType === "student" ? "text" : "email"}
              id="username"
              placeholder={
                userType === "student"
                  ? "Enter your ID"
                  : "Enter your email"
              }
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        {/* Message */}
        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
      </div>
    </div>
  );
};

export default Login;
