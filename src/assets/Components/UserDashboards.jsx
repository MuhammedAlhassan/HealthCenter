import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './UserDashboards';

const UserDashboards = ({ onButtonClick }) => {
  // Handle button clicks based on authentication
  const handleClick = (e, path) => {
    if (onButtonClick) {
      e.preventDefault();
      onButtonClick(e, path);
    }
    // Otherwise, the default Link behavior will proceed
  };

  return (
    <section className="dashboards-section">
      <div className="container">
        <div className="dashboards-header">
          <h2 className="dashboards-title">Tailored Dashboards</h2>
          <p className="dashboards-description">Different interfaces for different needs</p>
        </div>

        <div className="dashboards-grid">
          {/* Pregnant Woman Dashboard */}
          <div className="dashboard-card expectant-mother animate-slide-left">
            <div className="dashboard-header">
              <div className="dashboard-avatar expectant-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="dashboard-info">
                <h3>Expectant Mother</h3>
                <p>Personal health companion</p>
              </div>
            </div>
            
            <div className="dashboard-content">
              <div className="dashboard-item">
                <div className="dashboard-item-info">
                  <p className="dashboard-item-title">Next Appointment</p>
                  <p className="dashboard-item-detail">March 15, 2024</p>
                </div>
                <i className="fas fa-calendar dashboard-item-icon"></i>
              </div>
              
              <div className="dashboard-item">
                <div className="dashboard-item-info">
                  <p className="dashboard-item-title">Pregnancy Week</p>
                  <p className="dashboard-item-detail">Week 24</p>
                </div>
                <i className="fas fa-baby dashboard-item-icon"></i>
              </div>
              
              <Link 
                to="/emergency" 
                className="btn btn-destructive w-full emergency-btn"
                onClick={(e) => handleClick(e, '/emergency')}
              >
                <i className="fas fa-exclamation-triangle mr-2"></i>
                Emergency SOS
              </Link>
            </div>
          </div>

          {/* Healthcare Provider Dashboard */}
          <div className="dashboard-card provider animate-bounce" style={{ animationDelay: '0.2s' }}>
            <div className="dashboard-header">
              <div className="dashboard-avatar provider-avatar">
                <i className="fas fa-stethoscope"></i>
              </div>
              <div className="dashboard-info">
                <h3>Healthcare Provider</h3>
                <p>Patient management system</p>
              </div>
            </div>
            
            <div className="dashboard-content">
              <div className="dashboard-item">
                <div className="dashboard-item-info">
                  <p className="dashboard-item-title">Today's Appointments</p>
                  <div className="dashboard-badge">12</div>
                </div>
                <p className="dashboard-item-detail">8 confirmed, 4 pending</p>
              </div>
              
              <div className="dashboard-item">
                <div className="dashboard-item-info">
                  <p className="dashboard-item-title">Emergency Alerts</p>
                  <div className="dashboard-badge emergency-badge">2</div>
                </div>
                <p className="dashboard-item-detail">Immediate attention required</p>
              </div>
              
              <Link 
                to="/dashboard" 
                className="btn btn-primary w-full"
                onClick={(e) => handleClick(e, '/dashboard')}
              >
                View All Patients
              </Link>
            </div>
          </div>

          {/* Voice Health Check Dashboard */}
          <div className="dashboard-card admin animate-slide-right">
            <div className="dashboard-header">
              <div className="dashboard-avatar admin-avatar">
                <i className="fas fa-microphone-alt"></i>
              </div>
              <div className="dashboard-info">
                <h3>Voice Health Check</h3>
                <p>Symptom analysis via voice</p>
              </div>
            </div>
            
            <div className="dashboard-content">
              <div className="dashboard-item">
                <div className="dashboard-item-info">
                  <p className="dashboard-item-title">Supported Languages</p>
                  <p className="dashboard-item-value">3</p>
                </div>
                <p className="dashboard-item-detail">English, Yoruba, Hausa</p>
              </div>
              
              <div className="dashboard-item">
                <div className="dashboard-item-info">
                  <p className="dashboard-item-title">Last Checkup</p>
                  <div className="dashboard-badge success-badge">5 min ago</div>
                </div>
                <p className="dashboard-item-detail">No urgent symptoms</p>
              </div>
              
              <Link 
                to="/voice" 
                className="btn btn-secondary w-full"
                onClick={(e) => handleClick(e, '/voice')}
              >
                Start Voice Check
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboards;