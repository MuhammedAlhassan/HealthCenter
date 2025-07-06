import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Emergency';

const Emergency = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [countdown, setCountdown] = useState(5);
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleEmergencyPress = () => {
    setIsCountingDown(true);
    setCountdown(5);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCountingDown(false);
          setEmergencyActive(true);
          // Emergency call will be initiated through the tel: link
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelEmergency = () => {
    setIsCountingDown(false);
    setCountdown(5);
  };

  const nearbyFacilities = [
    { name: "Lagos University Teaching Hospital", distance: "2.3 km", phone: "+234-1-xxx-xxxx", type: "Hospital" },
    { name: "Maternal Health Center Ikeja", distance: "3.8 km", phone: "+234-1-xxx-xxxx", type: "Clinic" },
    { name: "First City Hospital", distance: "5.1 km", phone: "+234-1-xxx-xxxx", type: "Hospital" }
  ];

  return (
    <div className="emergency-page">
      <div className="emergency-container">
        <div className="emergency-header">
          <h1 className="emergency-title">Emergency SOS</h1>
          <p className="emergency-description">
            Immediate help when you need it most. Your location and medical profile will be shared with nearby healthcare facilities.
          </p>
        </div>

        <div className="emergency-main">
          {!emergencyActive && !isCountingDown && (
            <div className="emergency-standby">
              <button 
                onClick={handleEmergencyPress}
                className="emergency-button animate-heartbeat"
              >
                <i className="fas fa-exclamation-triangle"></i>
                <span>EMERGENCY</span>
                <span className="emergency-button-subtitle">Press & Hold</span>
              </button>
              
              <div className="emergency-instructions">
                <h3>How it works:</h3>
                <ul>
                  <li>Press the emergency button</li>
                  <li>Your location will be shared automatically</li>
                  <li>Nearest facilities will be alerted</li>
                  <li>You'll receive immediate callback</li>
                </ul>
              </div>
            </div>
          )}

          {isCountingDown && (
            <div className="emergency-countdown">
              <div className="countdown-circle">
                <span className="countdown-number">{countdown}</span>
              </div>
              <p className="countdown-text">Emergency will be activated in {countdown} seconds</p>
              <button onClick={cancelEmergency} className="btn btn-outline">
                Cancel
              </button>
            </div>
          )}

          {emergencyActive && (
            <div className="emergency-active">
              <div className="emergency-status">
                <i className="fas fa-check-circle"></i>
                <h2>Emergency Activated</h2>
                <p>Help is on the way. Stay calm and stay on the line.</p>
              </div>
              
              <div className="emergency-actions">
                <a href="tel:08167769208" className="btn btn-primary btn-lg">
                  <i className="fas fa-phone mr-2"></i>
                  Call Emergency Line
                </a>
                <a href="/ContactUs" className="btn btn-outline btn-lg">
                  <i className="fas fa-comments mr-2"></i>
                  Text Support
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="emergency-contacts">
          <h2 className="contacts-title">Emergency Contacts</h2>
          <div className="contacts-grid">
            <div className="contact-card">
              <div className="contact-icon emergency-icon">
                <i className="fas fa-ambulance"></i>
              </div>
              <h3>National Emergency</h3>
              <p className="contact-number">199</p>
              <a href="tel:08167769208" className="btn btn-destructive w-full">Call Now</a>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon maternal-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Maternal Hotline</h3>
              <p className="contact-number">+234-800-MATERNAL</p>
              <a href="tel:08167769208" className="btn btn-primary w-full">Call Now</a>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon support-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h3>24/7 Support</h3>
              <p className="contact-number">+234-1-HELP-NOW</p>
              <a href="tel:08167769208" className="btn btn-secondary w-full">Call Now</a>
            </div>
          </div>
        </div>

        <div className="safety-tips">
          <h2 className="tips-title">Safety Tips</h2>
          <div className="tips-grid">
            <div className="tip-item">
              <div className="tip-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>Stay Calm</h4>
              <p>Take deep breaths and remain as calm as possible</p>
            </div>
            
            <div className="tip-item">
              <div className="tip-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h4>Share Location</h4>
              <p>Make sure your location services are enabled</p>
            </div>
            
            <div className="tip-item">
              <div className="tip-icon">
                <i className="fas fa-user-friends"></i>
              </div>
              <h4>Contact Family</h4>
              <p>Inform a trusted family member or friend</p>
            </div>
            
            <div className="tip-item">
              <div className="tip-icon">
                <i className="fas fa-file-medical"></i>
              </div>
              <h4>Medical Info</h4>
              <p>Have your medical information readily available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;