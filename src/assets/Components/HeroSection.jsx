import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './HeroSection';

const HeroSection = ({ onButtonClick }) => {
  // Check if we should handle clicks (when onButtonClick is provided)
  const handleClick = (e, path) => {
    if (onButtonClick) {
      e.preventDefault();
      onButtonClick(e, path);
    }
    // Otherwise, the default Link behavior will proceed
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content animate-slide-up">
            <h1 className="hero-title">
              Empowering <span className="hero-accent">Every Mother's</span> Journey
            </h1>
            <p className="hero-description">
              Comprehensive pregvita health support with appointment reminders, emergency response, and expert guidance ... - all accessible even with low bandwidth.
            </p>
            <div className="hero-actions">
              <Link 
                to="/dashboard" 
                className="btn btn-primary btn-lg hero-cta"
                onClick={(e) => handleClick(e, '/dashboard')}
              >
                Start Your Journey
              </Link>
              <Link 
                to="/emergency" 
                className="btn btn-outline btn-lg hero-emergency"
                onClick={(e) => handleClick(e, '/emergency')}
              >
                Emergency SOS
              </Link>
            </div>
          </div>
          <div className="hero-image animate-float">
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Pregnant woman using mobile health app" 
                className="hero-img"
              />
              <div className="hero-badge">
                <i className="fas fa-shield-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bottom-fade"></div>
    </section>
  );
};

export default HeroSection;