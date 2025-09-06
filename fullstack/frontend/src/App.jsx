import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components from the dedicated folder
import Login from './components/Login';
import Dashboard from './components/Dashboard';

// Assuming you have a Home component you want to route to
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login page */}
        <Route path="/" element={<Login />} />
        
        {/* Route for the Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Route for the Home page (or any other page you create) */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;