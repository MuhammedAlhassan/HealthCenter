import React, { useState } from 'react';

import './Admin';

const Admin = () => {
  const [activeView, setActiveView] = useState('overview');

  const stats = {
    totalUsers: 2847,
    activeToday: 432,
    emergencyCalls: 23,
    appointmentsToday: 156,
    systemUptime: 99.9,
    dataUsage: 1.2
  };

  const recentAlerts = [
    { id: 1, type: 'emergency', message: 'Emergency call from Victoria Island', time: '2 minutes ago', severity: 'high' },
    { id: 2, type: 'system', message: 'High server load detected', time: '15 minutes ago', severity: 'medium' },
    { id: 3, type: 'user', message: 'Spike in new registrations', time: '1 hour ago', severity: 'low' }
  ];

  const userGrowth = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1450 },
    { month: 'Mar', users: 1680 },
    { month: 'Apr', users: 1920 },
    { month: 'May', users: 2250 },
    { month: 'Jun', users: 2560 },
    { month: 'Jul', users: 2847 }
  ];

  const topClinics = [
    { name: 'Lagos University Teaching Hospital', users: 450, rating: 4.8 },
    { name: 'First City Hospital', users: 320, rating: 4.7 },
    { name: 'Reddington Hospital', users: 280, rating: 4.6 },
    { name: 'Maternal Health Center Ikeja', users: 210, rating: 4.5 }
  ];

  return (
    <div className="admin-dashboard-page">
  
      
      <div className="admin-dashboard-container">
        <div className="admin-header">
          <h1 className="admin-title">System Administration</h1>
          <p className="admin-subtitle">Monitor and manage the maternal health platform</p>
        </div>

        <div className="admin-nav">
          <button 
            onClick={() => setActiveView('overview')}
            className={`admin-nav-btn ${activeView === 'overview' ? 'active' : ''}`}
          >
            <i className="fas fa-chart-line mr-2"></i>
            Overview
          </button>
          <button 
            onClick={() => setActiveView('users')}
            className={`admin-nav-btn ${activeView === 'users' ? 'active' : ''}`}
          >
            <i className="fas fa-users mr-2"></i>
            Users
          </button>
          <button 
            onClick={() => setActiveView('clinics')}
            className={`admin-nav-btn ${activeView === 'clinics' ? 'active' : ''}`}
          >
            <i className="fas fa-hospital mr-2"></i>
            Clinics
          </button>
          <button 
            onClick={() => setActiveView('system')}
            className={`admin-nav-btn ${activeView === 'system' ? 'active' : ''}`}
          >
            <i className="fas fa-server mr-2"></i>
            System
          </button>
        </div>

        {activeView === 'overview' && (
          <div className="overview-section">
            {/* Key Metrics */}
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon users">
                  <i className="fas fa-users"></i>
                </div>
                <div className="metric-content">
                  <h3 className="metric-value">{stats.totalUsers.toLocaleString()}</h3>
                  <p className="metric-label">Total Users</p>
                  <span className="metric-change positive">+12% this month</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon active">
                  <i className="fas fa-user-check"></i>
                </div>
                <div className="metric-content">
                  <h3 className="metric-value">{stats.activeToday}</h3>
                  <p className="metric-label">Active Today</p>
                  <span className="metric-change positive">+5% vs yesterday</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon emergency">
                  <i className="fas fa-ambulance"></i>
                </div>
                <div className="metric-content">
                  <h3 className="metric-value">{stats.emergencyCalls}</h3>
                  <p className="metric-label">Emergency Calls</p>
                  <span className="metric-change neutral">Today</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon appointments">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="metric-content">
                  <h3 className="metric-value">{stats.appointmentsToday}</h3>
                  <p className="metric-label">Appointments</p>
                  <span className="metric-change positive">+8% vs last week</span>
                </div>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="alerts-section">
              <h2 className="section-title">Recent Alerts</h2>
              <div className="alerts-list">
                {recentAlerts.map(alert => (
                  <div key={alert.id} className={`alert-item ${alert.severity}`}>
                    <div className="alert-icon">
                      <i className={`fas ${alert.type === 'emergency' ? 'fa-exclamation-triangle' : 
                                           alert.type === 'system' ? 'fa-server' : 'fa-info-circle'}`}></i>
                    </div>
                    <div className="alert-content">
                      <p className="alert-message">{alert.message}</p>
                      <span className="alert-time">{alert.time}</span>
                    </div>
                    <button className="alert-action">
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* User Growth Chart */}
            <div className="chart-section">
              <h2 className="section-title">User Growth Trend</h2>
              <div className="chart-container">
                <div className="chart-bars">
                  {userGrowth.map((data, index) => (
                    <div key={index} className="chart-bar-group">
                      <div 
                        className="chart-bar"
                        style={{ height: `${(data.users / 3000) * 200}px` }}
                      ></div>
                      <span className="chart-label">{data.month}</span>
                      <span className="chart-value">{data.users}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'users' && (
          <div className="users-section">
            <div className="users-stats">
              <div className="stat-card">
                <h3>User Distribution</h3>
                <div className="user-types">
                  <div className="user-type">
                    <span className="type-label">Expectant Mothers</span>
                    <span className="type-count">2,456 (86%)</span>
                  </div>
                  <div className="user-type">
                    <span className="type-label">Healthcare Providers</span>
                    <span className="type-count">298 (10%)</span>
                  </div>
                  <div className="user-type">
                    <span className="type-label">System Admins</span>
                    <span className="type-count">93 (4%)</span>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <h3>Geographic Distribution</h3>
                <div className="geo-stats">
                  <div className="geo-item">
                    <span>Lagos State</span>
                    <span>1,824 users</span>
                  </div>
                  <div className="geo-item">
                    <span>Abuja FCT</span>
                    <span>456 users</span>
                  </div>
                  <div className="geo-item">
                    <span>Kano State</span>
                    <span>298 users</span>
                  </div>
                  <div className="geo-item">
                    <span>Rivers State</span>
                    <span>269 users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'clinics' && (
          <div className="clinics-section">
            <div className="clinics-stats">
              <div className="stat-card">
                <h3>Top Performing Clinics</h3>
                <div className="clinics-list">
                  {topClinics.map((clinic, index) => (
                    <div key={index} className="clinic-item">
                      <div className="clinic-info">
                        <h4>{clinic.name}</h4>
                        <p>{clinic.users} active users</p>
                      </div>
                      <div className="clinic-rating">
                        <i className="fas fa-star"></i>
                        <span>{clinic.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="stat-card">
                <h3>Clinic Network Status</h3>
                <div className="network-stats">
                  <div className="network-item">
                    <span>Total Registered Clinics</span>
                    <span className="status-badge active">127</span>
                  </div>
                  <div className="network-item">
                    <span>Active This Week</span>
                    <span className="status-badge active">119</span>
                  </div>
                  <div className="network-item">
                    <span>Emergency-Ready</span>
                    <span className="status-badge active">98</span>
                  </div>
                  <div className="network-item">
                    <span>Pending Verification</span>
                    <span className="status-badge warning">8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'system' && (
          <div className="system-section">
            <div className="system-stats">
              <div className="stat-card">
                <h3>System Health</h3>
                <div className="health-metrics">
                  <div className="health-item">
                    <span>Uptime</span>
                    <span className="health-value good">{stats.systemUptime}%</span>
                  </div>
                  <div className="health-item">
                    <span>Response Time</span>
                    <span className="health-value good">142ms</span>
                  </div>
                  <div className="health-item">
                    <span>Error Rate</span>
                    <span className="health-value good">0.02%</span>
                  </div>
                  <div className="health-item">
                    <span>Data Usage</span>
                    <span className="health-value warning">{stats.dataUsage}TB</span>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <h3>Server Status</h3>
                <div className="server-list">
                  <div className="server-item">
                    <div className="server-info">
                      <h4>Web Server 1</h4>
                      <p>Lagos Data Center</p>
                    </div>
                    <span className="server-status online">Online</span>
                  </div>
                  <div className="server-item">
                    <div className="server-info">
                      <h4>Database Server</h4>
                      <p>Primary Instance</p>
                    </div>
                    <span className="server-status online">Online</span>
                  </div>
                  <div className="server-item">
                    <div className="server-info">
                      <h4>Emergency Gateway</h4>
                      <p>SMS/Voice Services</p>
                    </div>
                    <span className="server-status online">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;