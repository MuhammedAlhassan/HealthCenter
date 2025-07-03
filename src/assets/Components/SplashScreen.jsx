import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './SplashScreen'; // Ensure this file exists and is correctly named

const SplashScreen = ({ onComplete }) => {
  const [animate, setAnimate] = useState(false);
  const [hasNetwork, setHasNetwork] = useState(navigator.onLine);

  useEffect(() => {
    setAnimate(true);

    checkNetwork();

    const handleOnline = () => {
      setHasNetwork(true);
    };

    const handleOffline = () => {
      setHasNetwork(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Proceed after 3 seconds regardless of network status
    const timeout = setTimeout(() => {
      onComplete();
    }, 1000);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onComplete]);

  const checkNetwork = () => {
    setHasNetwork(navigator.onLine);
  };

  return (
    <div className="splash-screen">
      <div className={`splash-content ${animate ? 'animate-scale-in' : ''}`}>
        <div className="splash-logo animate-float">
          <i className="fas fa-heart animate-heartbeat"></i>
        </div>
        <h1 className="splash-title">PregVita</h1>
        <p className="splash-subtitle">Caring for Mothers, Protecting lives</p>

        {!hasNetwork && (
          <div className="network-error">
            <i className="fas fa-wifi-slash"></i>
            <p>No network connection</p>
          </div>
        )}

        <div className="splash-progress">
          <div className={`splash-progress-bar ${hasNetwork ? 'animate-pulse' : 'animate-pulse-slow'}`}></div>
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