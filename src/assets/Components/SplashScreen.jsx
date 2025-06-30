import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure icons load
import './SplashScreen'; // Ensure this path is correct and has .css

const SplashScreen = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);

    const timeout = setTimeout(() => {
      window.location.href = '/'; // Navigate using href after 3 seconds
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="splash-screen">
      <div className={`splash-content ${animate ? 'animate-scale-in' : ''}`}>
        <div className="splash-logo animate-float">
          <i className="fas fa-heart animate-heartbeat"></i>
        </div>
        <h1 className="splash-title">PregVita</h1>
        <p className="splash-subtitle">Caring for Mothers, Protecting lives</p>
        <div className="splash-progress">
          <div className="splash-progress-bar animate-pulse"></div>
        </div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
