import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Dashboard';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [pregnancyData, setPregnancyData] = useState({
    currentWeek: 0,
    totalWeeks: 40,
    nextAppointment: "",
    dueDate: "",
    daysRemaining: 0,
    weight: "65 kg",
    bloodPressure: "120/80"
  });

  const calculatePregnancyProgress = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalDays = 280; // 40 weeks
    const currentWeek = Math.floor((totalDays - diffDays) / 7);
    
    return {
      currentWeek: currentWeek > 0 ? currentWeek : 0,
      daysRemaining: diffDays > 0 ? diffDays : 0,
      formattedDueDate: due.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
  };

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      
      if (parsedData.userType === 'expectant-mother' && parsedData.dueDate) {
        const progress = calculatePregnancyProgress(parsedData.dueDate);
        setPregnancyData(prev => ({
          ...prev,
          currentWeek: progress.currentWeek,
          dueDate: progress.formattedDueDate,
          daysRemaining: progress.daysRemaining,
          nextAppointment: "March 15, 2024" // This would come from your backend
        }));
      }
    }
  }, []);

  if (!userData) {
    return <div className="dashboard-loading">Loading your dashboard...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-welcome animate-fade-in">
          <h1 className="dashboard-title">
            Welcome back, {userData.firstName}! 👋
          </h1>
          <p className="dashboard-subtitle">
            {userData.userType === 'expectant-mother' 
              ? "Here's your pregvita health overview" 
              : "Here's your healthcare provider dashboard"}
          </p>
        </div>

        {userData.userType === 'expectant-mother' ? (
          <>
            {/* Expectant Mother Dashboard */}
            <div className="dashboard-main-grid">
              <div className="pregnancy-progress-card">
                <div className="card-header">
                  <div className="card-title-with-icon">
                    <i className="fas fa-baby"></i>
                    <h2>Pregnancy Progress</h2>
                  </div>
                </div>
                <div className="card-content">
                  <div className="progress-info">
                    <div className="progress-week">
                      <span className="week-number">Week {pregnancyData.currentWeek}</span>
                      <span className="week-total">{pregnancyData.currentWeek}/{pregnancyData.totalWeeks} weeks</span>
                    </div>
                    <div className="progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${(pregnancyData.currentWeek / pregnancyData.totalWeeks) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="pregnancy-stats">
                    <div className="stat-item">
                      <p className="stat-label">Due Date</p>
                      <p className="stat-value">{pregnancyData.dueDate}</p>
                    </div>
                    <div className="stat-item">
                      <p className="stat-label">Days Remaining</p>
                      <p className="stat-value">{pregnancyData.daysRemaining} days</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="next-appointment-card">
                <div className="card-header">
                  <div className="card-title-with-icon">
                    <i className="fas fa-calendar"></i>
                    <h2>Next Appointment</h2>
                  </div>
                </div>
                <div className="card-content">
                  <div className="appointment-info">
                    <p className="appointment-date">
                      {pregnancyData.nextAppointment}
                    </p>
                    <p className="appointment-type">Routine Checkup</p>
                    <Link to="/appointments" className="btn btn-primary w-full">
                      Manage Appointments
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="health-metrics-grid">
              <div className="metric-card">
                <div className="metric-content">
                  <div className="metric-info">
                    <p className="metric-label">Weight</p>
                    <p className="metric-value">{pregnancyData.weight}</p>
                  </div>
                  <i className="fas fa-weight metric-icon accent"></i>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-content">
                  <div className="metric-info">
                    <p className="metric-label">Blood Pressure</p>
                    <p className="metric-value">{pregnancyData.bloodPressure}</p>
                  </div>
                  <i className="fas fa-heartbeat metric-icon destructive"></i>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-content">
                  <div className="metric-info">
                    <p className="metric-label">Heart Rate</p>
                    <p className="metric-value">75 bpm</p>
                  </div>
                  <i className="fas fa-heart metric-icon primary"></i>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-content">
                  <div className="metric-info">
                    <p className="metric-label">Sleep</p>
                    <p className="metric-value">8.5h</p>
                  </div>
                  <i className="fas fa-moon metric-icon secondary"></i>
                </div>
              </div>
            </div>

            <div className="quick-actions-grid">
              <Link to="/emergency" className="action-card emergency-action">
                <i className="fas fa-ambulance emergency-pulse"></i>
                <h3>Emergency SOS</h3>
                <p>Immediate help</p>
              </Link>

              <Link to="/clinicLocator" className="action-card clinic-action">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Find Clinics</h3>
                <p>Nearby facilities</p>
              </Link>

              <Link to="/healthhub" className="action-card health-action">
                <i className="fas fa-book-medical"></i>
                <h3>Health Hub</h3>
                <p>Information & tips</p>
              </Link>

              <Link to="/profile" className="action-card profile-action">
                <i className="fas fa-user"></i>
                <h3>Profile</h3>
                <p>Manage account</p>
              </Link>
            </div>

            <div className="recent-appointments-card">
              <div className="card-header">
                <div className="card-title-with-icon">
                  <i className="fas fa-history"></i>
                  <h2>Recent Appointments</h2>
                </div>
                <Link to="/appointments" className="btn btn-outline btn-sm">
                  View All
                </Link>
              </div>
            
            </div>
          </>
        ) : (
          <>
            {/* Healthcare Provider Dashboard */}
            <div className="dashboard-main-grid">
              <div className="provider-card">
                <div className="card-header">
                  <div className="card-title-with-icon">
                    <i className="fas fa-user-md"></i>
                    <h2>Your Patients</h2>
                  </div>
                </div>
                <div className="card-content">
                  <div className="provider-stats">
                    <div className="stat-item">
                      <p className="stat-label">Active Patients</p>
                      <p className="stat-value">24</p>
                    </div>
                    <div className="stat-item">
                      <p className="stat-label">Appointments Today</p>
                      <p className="stat-value">5</p>
                    </div>
                  </div>
                  <Link to="/patients" className="btn btn-primary w-full">
                    View All Patients
                  </Link>
                </div>
              </div>

              <div className="next-appointment-card">
                <div className="card-header">
                  <div className="card-title-with-icon">
                    <i className="fas fa-calendar"></i>
                    <h2>Today's Schedule</h2>
                  </div>
                </div>
                <div className="card-content">
                  <div className="appointments-list">
                    <div className="appointment-item">
                      <div className="appointment-info">
                        <p className="appointment-title">Prenatal Checkup</p>
                        <p className="appointment-time">10:00 AM</p>
                      </div>
                      <span className="badge badge-warning">Upcoming</span>
                    </div>
                    <div className="appointment-item">
                      <div className="appointment-info">
                        <p className="appointment-title">Ultrasound</p>
                        <p className="appointment-time">11:30 AM</p>
                      </div>
                      <span className="badge badge-warning">Upcoming</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="quick-actions-grid">
              <Link to="/emergency" className="action-card emergency-action">
                <i className="fas fa-ambulance emergency-pulse"></i>
                <h3>Emergency Cases</h3>
                <p>Urgent attention</p>
              </Link>

              <Link to="/clinics" className="action-card clinic-action">
                <i className="fas fa-clinic-medical"></i>
                <h3>Clinic Resources</h3>
                <p>Equipment & supplies</p>
              </Link>

              <Link to="/healthhub" className="action-card health-action">
                <i className="fas fa-book-medical"></i>
                <h3>Medical Library</h3>
                <p>References & guides</p>
              </Link>

              <Link to="/profile" className="action-card profile-action">
                <i className="fas fa-user-md"></i>
                <h3>Provider Profile</h3>
                <p>Manage account</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;