import React from 'react';
import { Link } from 'react-router-dom';
import './Accessibility';

const Accessibility = () => {
  return (
    <div className="accessibility-page">
      <div className="accessibility-container">
        <header className="accessibility-header">
          <h1>Accessibility Commitment</h1>
          <p className="last-updated">Last Updated: June 15, 2024</p>
          <div className="accessibility-badge">
            <i className="fas fa-universal-access"></i>
            <span>Designed for Low-Bandwidth Accessibility</span>
          </div>
        </header>

        <section className="accessibility-statement">
          <h2>Our Promise</h2>
          <p>
            Maternal Health Tracker is designed to serve <strong>all</strong> Nigerian women, 
            including those with disabilities and in low-connectivity areas. We prioritize:
          </p>
          <div className="user-groups">
            <div className="user-card">
              <i className="fas fa-mobile-alt"></i>
              <h3>Basic Phone Users</h3>
              <p>Full functionality via SMS/USSD</p>
            </div>
            <div className="user-card">
              <i className="fas fa-eye"></i>
              <h3>Visual Impairments</h3>
              <p>Screen reader support & voice navigation</p>
            </div>
            <div className="user-card">
              <i className="fas fa-network-wired"></i>
              <h3>Low-Bandwidth</h3>
              <p>Operates on 2G networks</p>
            </div>
            <div className="user-card">
              <i className="fas fa-language"></i>
              <h3>Language Needs</h3>
              <p>Available in Hausa, Yoruba, and Igbo</p>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2>Accessibility Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-sms"></i>
              </div>
              <h3>SMS/USSD Access</h3>
              <ul>
                <li>All core features via text messages</li>
                <li>No smartphone required</li>
                <li>Simple numeric menu system</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-volume-up"></i>
              </div>
              <h3>Voice Interface</h3>
              <ul>
                <li>Voice-based symptom checker</li>
                <li>Audio health information</li>
                <li>Spoken appointment reminders</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-text-width"></i>
              </div>
              <h3>Text Optimization</h3>
              <ul>
                <li>Simplified health information</li>
                <li>Large tap targets</li>
                <li>High contrast mobile view</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3>Location Services</h3>
              <ul>
                <li>Text-based clinic directions</li>
                <li>Accessible emergency SOS</li>
                <li>Transport guidance</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="how-to-section">
          <h2>Using Our Accessible Features</h2>
          <div className="how-to-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Via Basic Phone</h3>
                <p>
                  Dial <strong>*347*8#</strong> to access:
                </p>
                <ul>
                  <li>Appointment reminders</li>
                  <li>Emergency contacts</li>
                  <li>Health tips</li>
                </ul>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Voice Commands</h3>
                <p>
                  On the mobile app, say "Health Assistant" to:
                </p>
                <ul>
                  <li>Report symptoms</li>
                  <li>Hear health information</li>
                  <li>Find nearby clinics</li>
                </ul>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Emergency Access</h3>
                <p>
                  For users with disabilities:
                </p>
                <ul>
                  <li>Press power button 3x to trigger SOS</li>
                  <li>Shake phone for emergency call</li>
                  <li>Text "HELP" to 3432</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="feedback-section">
          <h2>Help Us Improve</h2>
          <div className="feedback-card">
            <p>
              Facing accessibility challenges? We want to know:
            </p>
            <form className="feedback-form">
              <div className="form-group">
                <label htmlFor="issue">Describe the issue*</label>
                <textarea 
                  id="issue" 
                  rows="4" 
                  aria-required="true"
                  placeholder="E.g., 'I cannot use the USSD menu with my screen reader'"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="contact">Contact (optional)</label>
                <input 
                  type="text" 
                  id="contact"
                  placeholder="Phone number preferred"
                  aria-label="Contact information"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit via SMS
              </button>
            </form>
            <div className="alternative-contact">
              <p>Alternative contact methods:</p>
              <p>
                <i className="fas fa-sms"></i> Text: <a href="sms:+2348001234567">+234 816 776 9208</a>
              </p>
              <p>
                <i className="fas fa-phone-alt"></i> Voice call: <a href="tel:+2348001234567">+234 816 776 9208</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Accessibility;