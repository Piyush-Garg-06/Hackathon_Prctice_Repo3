import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [userType, setUserType] = useState('student');
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    const handleTabClick = (type) => {
        setUserType(type);
        setFormData({ username: '', password: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => {
            setMessage({ text: '', type: '' });
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, userType }),
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('Login successful! Welcome.', 'success');
                // navigate('/dashboard'); 
            } else {
                showMessage(data.message, 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showMessage('An error occurred. Please try again.', 'error');
        }
    };

    return (
        <div className="login-container">
            <div className="login-photo-section"></div>
            <div className="login-form-section">
                <h2>Welcome Back!</h2>
                <p>Enter your login details to continue.</p>

                <div className="user-type-tabs">
                    <span
                        className={`user-type-tab ${userType === 'student' ? 'active' : ''}`}
                        onClick={() => handleTabClick('student')}
                    >
                        Student
                    </span>
                    <span
                        className={`user-type-tab ${userType === 'parent' ? 'active' : ''}`}
                        onClick={() => handleTabClick('parent')}
                    >
                        Parent
                    </span>
                </div>

                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">
                            {userType === 'student' ? 'Student ID' : 'Email'}
                        </label>
                        <input
                            type={userType === 'student' ? 'text' : 'email'}
                            id="username"
                            name="username"
                            placeholder={userType === 'student' ? 'Enter your ID' : 'Enter your email'}
                            value={formData.username}
                            onChange={handleChange}
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
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Log In</button>
                </form>

                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            </div>
        </div>
    );
};

export default Login;