import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate(); // Initialize the hook

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      // Show success message and then navigate
      showMessage('Login successful! Redirecting...', 'success');
      setTimeout(() => {
        navigate('/home'); // Redirect to the /home route
      }, 1500); // Wait 1.5 seconds before navigating
    } else {
      showMessage('Please fill in all fields.', 'error');
    }
  };

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  return (
    <div className="login-container">
      <div className="login-photo-section"></div>
      <div className="login-form-section">
        <h2>Welcome Back!</h2>
        <p>Enter your login details to continue.</p>

        <div className="user-type-tabs">
          <span
            className={`user-type-tab ${activeTab === 'student' ? 'active' : ''}`}
            onClick={() => handleTabClick('student')}
          >
            Student
          </span>
          <span
            className={`user-type-tab ${activeTab === 'parent' ? 'active' : ''}`}
            onClick={() => handleTabClick('parent')}
          >
            Parent
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">
              {activeTab === 'student' ? 'Student ID' : 'Email'}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder={activeTab === 'student' ? 'Enter your ID' : 'Enter your email'}
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
              name="password"
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

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;