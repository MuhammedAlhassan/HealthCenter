import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../Components/HeroSection';
import FeaturesSection from '../Components/FeaturesSection';
import UserDashboards from '../Components/UserDashboards';
import AuthModal from '../Components/AuthModal'; // Import your AuthModal component
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Home';

const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('register'); // Default to signup
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('userData');

  const handleButtonClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault(); // Prevent default navigation
      setShowAuthModal(true);
    }
    // If authenticated, default behavior will proceed
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Optionally navigate to the intended page after successful auth
  };

  return (
    <div className="landing-page">
      <HeroSection 
        onButtonClick={!isAuthenticated ? handleButtonClick : null}
      />
      <FeaturesSection 
        onButtonClick={!isAuthenticated ? handleButtonClick : null}
      />
      <UserDashboards 
        onButtonClick={!isAuthenticated ? handleButtonClick : null}
      />

      <section className="emergency-section">
        <div className="container">
          {/* ... other emergency section content ... */}
          <div className="emergency-button-wrapper">
          <a href="http://localhost:5173/emergency">  <button 
              className="emergency-button emergency-pulse"
              onClick={!isAuthenticated ? handleButtonClick : null}
            >
              <i className="fas fa-ambulance"></i>
              <span>EMERGENCY SOS</span>
            </button></a>
            <p className="emergency-warning">Only use in case of genuine medical emergency</p>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Home;