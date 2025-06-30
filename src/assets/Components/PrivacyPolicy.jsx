import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: June 15, 2024</p>

        <div className="legal-section">
          <h2>1. Introduction</h2>
          <p>
            Pregvita Health Tracker ("we," "our," or "us") is committed to protecting your privacy in compliance with 
            Nigeria's NDPR (Nigeria Data Protection Regulation) 2019. This policy explains how we handle your 
            information when you use our pregvita health services via SMS, USSD, web, and mobile applications.
          </p>
        </div>

        <div className="legal-section">
          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Data</h3>
          <ul>
            <li>Basic identification (name, phone number)</li>
            <li>Pregnancy details (due date, risk factors)</li>
            <li>Appointment records with healthcare providers</li>
            <li>Emergency contact information</li>
          </ul>

          <h3>2.2 System Data</h3>
          <ul>
            <li>SMS interaction logs (for appointment reminders)</li>
            <li>Location data (only during emergency SOS activation)</li>
            <li>Device information (for app optimization)</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>3. How We Use Your Data</h2>
          <div className="usage-grid">
            <div className="usage-card">
              <h3>Core Services</h3>
              <p>Deliver SMS appointment reminders and health alerts</p>
            </div>
            <div className="usage-card">
              <h3>Emergency Response</h3>
              <p>Share critical information with clinics during SOS activation</p>
            </div>
            <div className="usage-card">
              <h3>Service Improvement</h3>
              <p>Analyze anonymized data to enhance low-bandwidth features</p>
            </div>
          </div>
        </div>

        <div className="legal-section">
          <h2>4. Data Sharing</h2>
          <p>
            We <strong>never</strong> sell your data. Limited sharing occurs with:
          </p>
          <ul>
            <li>Approved healthcare providers during emergencies</li>
            <li>Government health agencies (aggregated anonymized data only)</li>
            <li>Twilio for SMS delivery (message content not stored)</li>
            <li>When legally required by Nigerian authorities</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>5. Your Rights Under NDPR</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access all data we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Delete your account and associated data</li>
            <li>Opt-out of non-essential communications</li>
            <li>File complaints with Nigeria's NITDA</li>
          </ul>
          <p>
            Contact our Data Protection Officer at: <a href="mailto:dpo@maternalhealthtracker.ng">dpo@maternalhealthtracker.ng</a>
          </p>
        </div>

        <div className="legal-section">
          <h2>6. Security Measures</h2>
          <ul>
            <li>End-to-end encryption for all health data</li>
            <li>Regular penetration testing of our systems</li>
            <li>Minimal data collection policy</li>
            <li>Secure SMS transmission protocols</li>
            <li>Annual staff training on data protection</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>7. Data Retention</h2>
          <p>
            We retain your personal data:
          </p>
          <ul>
            <li>For active users: Throughout pregnancy + 6 months postpartum</li>
            <li>For inactive accounts: Maximum 1 year before anonymization</li>
            <li>Emergency SOS data: 30 days unless needed for ongoing care</li>
          </ul>
        </div>

        <div className="legal-actions">
          <Link to="/termsandconditions" className="btn btn-outline">
            View Terms & Conditions
          </Link>
          <button className="btn btn-primary" onClick={() => window.print()}>
            <i className="fas fa-print"></i> Print Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;