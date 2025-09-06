import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you could send the data to a backend endpoint
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <Navbar />

      {/* Contact Section */}
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <div className="info-item">
              <span>📧</span>
              <p>support@studentperformance.com</p>
            </div>
            <div className="info-item">
              <span>📞</span>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-item">
              <span>📍</span>
              <p>123 Education Street, Academic City, AC 12345</p>
            </div>
          </div>

          <div className="contact-form">
            <h3>Send us a Message</h3>
            {submitted && (
              <div className="success-message">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>© 2025 Student Performance System | Designed by Innovation Ninjas</p>
      </footer>
    </div>
  );
};

export default Contact;
