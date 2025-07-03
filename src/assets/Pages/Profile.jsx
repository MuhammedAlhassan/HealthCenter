import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Profile';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    DueDate: '',  // This will come from signup and be unchangeable
    address: ''
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('userData'));
    if (savedData) {
      setProfileData(prev => ({
        ...prev,
        ...savedData
      }));
    }
  }, []);

  const handleSave = () => {
    // Don't allow changing DueDate through editing
    const savedDueDate = JSON.parse(localStorage.getItem('userData'))?.DueDate;
    const dataToSave = {
      ...profileData,
      DueDate: savedDueDate || profileData.DueDate  // Preserve original DueDate
    };
    
    localStorage.setItem('userData', JSON.stringify(dataToSave));
    setIsEditing(false);
    console.log('Profile data saved:', dataToSave);
  };

  const handleCancel = () => {
    const savedData = JSON.parse(localStorage.getItem('userData'));
    if (savedData) {
      setProfileData(savedData);
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoggingOut(true);
      localStorage.removeItem('userData');
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
  };

  const updateProfileData = (field, value) => {
    // Prevent updating DueDate if it's being edited
    if (field === 'DueDate' && !isEditing) return;
    
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <i className="fas fa-user"></i>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">
              {profileData.firstName} {profileData.lastName}
            </h1>
            <p className="profile-email">{profileData.email}</p>
            <div className="profile-status">
              <span className="status-badge active">Active Account</span>
            </div>
          </div>
          <div className="profile-actions">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="btn btn-primary"
              >
                <i className="fas fa-edit mr-2"></i>
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button 
                  onClick={handleSave}
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
                <button 
                  onClick={handleCancel}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-content">
          <div className="personal-info-section">
            <div className="section-card">
              <h3 className="section-title">Basic Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="label">First Name</label>
                  <input
                    className={`input ${!isEditing ? 'readonly' : ''}`}
                    value={profileData.firstName}
                    onChange={(e) => updateProfileData('firstName', e.target.value)}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Last Name</label>
                  <input
                    className={`input ${!isEditing ? 'readonly' : ''}`}
                    value={profileData.lastName}
                    onChange={(e) => updateProfileData('lastName', e.target.value)}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Email</label>
                  <input
                    className={`input ${!isEditing ? 'readonly' : ''}`}
                    value={profileData.email}
                    onChange={(e) => updateProfileData('email', e.target.value)}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Phone Number</label>
                  <input
                    className={`input ${!isEditing ? 'readonly' : ''}`}
                    value={profileData.phone}
                    onChange={(e) => updateProfileData('phone', e.target.value)}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Due Date</label>
                  <input
                    type="date"
                    className="input readonly"
                    value={profileData.DueDate}
                    readOnly={true}
                  />
                </div>
                <div className="form-group full-width">
                  <label className="label">Address</label>
                  <input
                    className={`input ${!isEditing ? 'readonly' : ''}`}
                    value={profileData.address}
                    onChange={(e) => updateProfileData('address', e.target.value)}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
            </div>
            
            <button 
              className="logout-btn"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Logging out...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;