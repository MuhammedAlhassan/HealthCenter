import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AuthModal from './AuthModal';
import './Navbar';

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const checkAuthStatus = () => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setIsAuthenticated(!!parsedData.isAuthenticated);
        setUserData(parsedData);
      } catch (e) {
        console.error('Failed to parse userData', e);
      }
    } else {
      setIsAuthenticated(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleRegister = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (userData) => {
    const updatedUserData = { ...userData, isAuthenticated: true };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    setIsAuthenticated(true);
    setUserData(updatedUserData);
    setShowAuthModal(false);
    navigate('/dashboard');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <Link to="/" className="nav-brand">
            <i className="fas fa-heart"></i>
            <span>PregVita</span>
          </Link>
          
          {isAuthenticated && (
            <div className="nav-links">
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                Home
              </Link>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                Dashboard
              </Link>
              <Link to="/cliniclocator" className={`nav-link ${isActive('/cliniclocator') ? 'active' : ''}`}>
                Find Clinics
              </Link>
              <Link to="/healthhub" className={`nav-link ${isActive('/healthhub') ? 'active' : ''}`}>
                Health Hub
              </Link>
              <Link to="/emergency" className={`nav-link ${isActive('/emergency') ? 'active' : ''}`}>
                Emergency
              </Link>
            </div>
          )}
          
          <div className="nav-actions">
            {!isAuthenticated ? (
              <>
                <button onClick={handleLogin} className="nav-login-btn">
                  Login
                </button>
                <button onClick={handleRegister} className="btn btn-primary">
                  Get Started
                </button>
              </>
            ) : (
              <div className="user-menu">
                <span className="user-greeting">Hi, {userData?.firstName || 'User'}</span>
              </div>
            )}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-mobile-toggle"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
          
          {mobileMenuOpen && (
            <div className="nav-mobile-menu">
              <div className="nav-mobile-links">
                <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                {isAuthenticated && (
                  <>
                    <Link to="/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <Link to="/cliniclocator" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                      Find Clinics
                    </Link>
                    <Link to="/healthhub" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                      Health Hub
                    </Link>
                    <Link to="/emergency" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                      Emergency
                    </Link>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <button onClick={() => { handleLogin(); setMobileMenuOpen(false); }} className="nav-link">
                      Login
                    </button>
                    <button onClick={() => { handleRegister(); setMobileMenuOpen(false); }} className="nav-link">
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navbar;