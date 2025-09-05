import React, { useState } from "react";
import "./StudentLogin.css"; // Import CSS file

export default function StudentLogin() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", form);
    // API integration can be added here
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Student Performance Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="register-link">
          Don’t have an account? <a href="#">Register</a>
        </p>
      </div>
    </div>
  );
}
