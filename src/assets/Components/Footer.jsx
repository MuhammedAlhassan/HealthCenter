import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure icons load
import './Footer';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <i className="fas fa-heart"></i>
              <h3>PregVita</h3>
            </div>
            <p className="footer-description">
              Empowering every mother's journey with comprehensive health support, emergency response, and expert guidance accessible even with low bandwidth connectivity.
            </p>
            <div className="footer-social">
            
              <a href="https://x.com/Al20681Muhammed?t=Z107EJ7Z069OgkHMDahc3A&s=09" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/pfp_paapaa?igsh=MWlpbzB0cWl0amMzOA==" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
                <a href="" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/AboutUs">About Us</a></li>

              <li><a href="/PrivacyPolicy">Privacy Policy</a></li>
              <li><a href="/TermsAndConditions">Terms And Conditions</a></li>
              <li><a href="/Accessibility">Accessibility</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><a href="/ContactUs">Contact Us</a></li>
           
              <li><a href="/Services">Services</a></li>
              <li><a href="/Blog">Blog</a></li>
              <li><a href="/FAQ">Faq</a></li>
            </ul>
          </div>
        </div>
        
        {/* Emergency Contact */}
        <div className="footer-emergency">
          <div className="emergency-alert">
            <p className="emergency-text">
              <i className="fas fa-phone"></i>
              24/7 Emergency Hotline: +234-816-776-9208
            </p>
            <p className="emergency-disclaimer">
              For immediate medical emergencies, call your local emergency services first
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 pregvita health Care. All rights reserved. Made with ❤️ for Nigerian mothers.</p>
        </div>
        <div id="wet"><h1>created by </h1></div>
      </div>
    </footer>
  );
};

export default Footer;