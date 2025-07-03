import React from 'react';
import { FaHeart, FaBaby, FaCalendarAlt, FaUsers, FaWeight, FaMicrophoneAlt } from 'react-icons/fa';
import { MdFavorite, MdHealthAndSafety } from 'react-icons/md';

const FlyerCard = () => {
  return (
    <div className="pregvita-container">
      {/* Header with Love Logo */}
      <div className="pregvita-header">
        <div className="logo-container">
          <MdFavorite className="heart-logo" />
          <h1>PregVita</h1>
        </div>
        <p className="subtitle">caring for mothers, protecting life's</p>
      </div>

      {/* Content Space */}
      <div className="content-space">
        {/* Custom content section */}
        <div className="custom-content">
          <h2>Your Complete Pregnancy Companion</h2>
          
          <div className="content-row">
            <img 
              src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Happy pregnant woman" 
              className="content-img"
            />
            <p className="content-text">
              PregVita is designed to support you through every stage of your pregnancy journey. 
              From conception to delivery, our app provides personalized guidance, expert advice, 
              and a supportive community to ensure you have the healthiest pregnancy possible.
            </p>
          </div>
          
          <div className="content-row reverse">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="App screenshot" 
              className="content-img"
            />
            <p className="content-text">
              Track your baby's development with our week-by-week updates, 
              log your symptoms and milestones, and get reminders for important 
              prenatal appointments and tests.
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="pregvita-features">
          <div className="feature-card">
            <FaBaby className="feature-icon" />
            <h3>Pregnancy Tracking</h3>
            <p>Week-by-week development monitoring</p>
          </div>
          
          <div className="feature-card">
            <FaCalendarAlt className="feature-icon" />
            <h3>Appointment Reminders</h3>
            <p>Never miss important checkups</p>
          </div>
          
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Community Support</h3>
            <p>Connect with other expecting parents</p>
          </div>
          
          <div className="feature-card">
            <FaHeart className="feature-icon" />
            <h3>Health Monitoring</h3>
            <p>Track vital signs and symptoms</p>
          </div>

          <div className="feature-card">
            <FaMicrophoneAlt className="feature-icon" />
            <h3>Symptoms Voice Checker</h3>
            <p>Log symptoms hands-free with voice commands</p>
          </div>

          <div className="feature-card">
            <FaWeight className="feature-icon" />
            <h3>Weight Tracker</h3>
            <p>Monitor healthy weight gain during pregnancy</p>
          </div>
        </div>
        
        {/* Community section */}
        <div className="community-section">
          <h3>Join Our Supportive Community</h3>
          <div className="community-content">
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Community support" 
              className="community-img"
            />
            <p className="community-text">
              Connect with thousands of expecting parents in our private community. 
              Share experiences, ask questions, and get support from those who 
              understand exactly what you're going through.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyerCard;