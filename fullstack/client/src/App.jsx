import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Attendance from "./components/Attendance";
import Report from "./components/Report";
import Result from "./components/Result";
import Profile from "./components/Profile";
import Activities from "./components/Activities";
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/results" element={<Result />} />
        <Route path="/report" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
