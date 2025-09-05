import React, { useState } from 'react';
import './Login.css'; // Importing the CSS file

const Login = () => {
  const [userType, setUserType] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (username && password) {
      const displayUserType = userType === 'student' ? 'Student' : 'Parent';
      setMessage(`Login successful! Welcome ${displayUserType}.`);
      setMessageType('success');
    } else {
      setMessage('Please fill in both fields.');
      setMessageType('error');
    }

    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleUserTypeSwitch = (type) => {
    setUserType(type);
    setUsername('');
    setPassword('');
  };

  const usernamePlaceholder = userType === 'student' ? 'Student ID' : 'Parent Email';
  const userIconClass = userType === 'student' ? 'fas fa-user' : 'fas fa-envelope';

  return (
    <div className="login-container">
      <div className="login-photo-section"></div>
      
      <div className="login-form-section">
        {/* The logo image is a base64 string, so it's best to keep it in the component. */}
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABVlBMVEX///8ZP2P4kB/5jR72kR/zqh/2kx71oB/0nCD1mR77///3lx/zpR3zoh3zpx3//v////v66dfwngAANV73///2qUcbP2EALFX+/vgAMVv6/vv1nTMANl8ANlv7//kAKlL2nhL2kwD7hwDw9vgAMF0AKVIaQF7wpQD0pi6LnK6xvsrX3uUWPWaElqPj6e3H0Nn4yYCbq7f47c3yqjn758v48+L3kQD4x4z2qVs4UWkMOFkjSGdGX3hRaYJcc4ttfZV3iJuotMEAHFC5yNIAKVkuS2RUcIMqTnNkeo3f5u+jqa/c2dd4jaQ4V3eMn7RYZ3vz2ary0pn4wmbtsR73vm3rxmr85L37u" 
          alt="Student Performance Logo" 
          className="logo"
        />
        <h2>Welcome Back!</h2>
        <p>Log in to your account.</p>

        <div className="user-type-tabs">
          <span 
            className={`user-type-tab ${userType === 'student' ? 'active' : ''}`} 
            onClick={() => handleUserTypeSwitch('student')}
          >
            Student
          </span>
          <span 
            className={`user-type-tab ${userType === 'parent' ? 'active' : ''}`} 
            onClick={() => handleUserTypeSwitch('parent')}
          >
            Parent
          </span>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <i className={`${userIconClass} input-icon`}></i>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder={usernamePlaceholder} 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <i className="fas fa-lock input-icon"></i>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="login-btn">Log In</button>
        </form>

        <div className={`message ${messageType}`}>{message}</div>
      </div>
    </div>
  );
};

export default Login;