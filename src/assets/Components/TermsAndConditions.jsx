import React from 'react';
import { Link } from 'react-router-dom';
import './TermsAndConditions';

const TermsAndConditions = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Terms & Conditions</h1>
        <p className="last-updated">Effective: June 15, 2024</p>

        <div className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using pregvita Health Tracker's services (via web, mobile app, SMS, or USSD), 
            you agree to these legally binding terms under Nigerian law. Continued use constitutes 
            acceptance of any revisions.
          </p>
        </div>

        <div className="legal-section">
          <h2>2. Service Description</h2>
          <p>
            Maternal Health Tracker provides:
          </p>
          <ul>
            <li>SMS-based antenatal appointment reminders</li>
            <li>Emergency SOS feature with clinic notification</li>
            <li>Low-bandwidth pregnancy health information</li>
            <li>Voice-based symptom assessment tool</li>
            <li>Clinic locator service</li>
          </ul>
          <p className="disclaimer">
            <i className="fas fa-exclamation-triangle"></i> <strong>Not a medical emergency service</strong> - 
            For life-threatening situations, please contact your nearest hospital immediately.
          </p>
        </div>

        <div className="legal-section">
          <h2>3. User Responsibilities</h2>
          <h3>3.1 Account Security</h3>
          <p>
            You must:
          </p>
          <ul>
            <li>Keep your registered phone number secure</li>
            <li>Report unauthorized access within 24 hours to <a href="mailto:support@maternalhealthtracker.ng">support@maternalhealthtracker.ng</a></li>
            <li>Update your pregnancy status when changes occur</li>
          </ul>

          <h3>3.2 Prohibited Actions</h3>
          <ul>
            <li>Misusing the emergency SOS feature</li>
            <li>Sharing false medical information</li>
            <li>Attempting to compromise our SMS gateway</li>
            <li>Harassing healthcare providers through our platform</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>4. SMS/USSD Terms</h2>
          <p>
            By using our services, you consent to:
          </p>
          <ul>
            <li>Receive automated SMS messages for appointments and alerts</li>
            <li>Standard carrier charges may apply for SMS/USSD usage</li>
            <li>Emergency SMS may be sent without prior consent when SOS is activated</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>5. Intellectual Property</h2>
          <p>
            All system content (including health algorithms, clinic databases, and educational materials) 
            is owned by Maternal Health Tracker or licensed partners. Personal use is permitted; 
            commercial reuse requires written authorization.
          </p>
        </div>

        <div className="legal-section">
          <h2>6. Limitation of Liability</h2>
          <p>
            Maternal Health Tracker is not liable for:
          </p>
          <ul>
            <li>Network failures preventing SMS delivery</li>
            <li>Clinical decisions made by third-party providers</li>
            <li>User-provided information accuracy</li>
            <li>Service interruptions during network outages</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>7. Termination</h2>
          <p>
            We may suspend accounts for:
          </p>
          <ul>
            <li>Abuse of emergency features</li>
            <li>Violation of Nigerian telecommunications laws</li>
            <li>Fraudulent activity</li>
            <li>Non-compliance with these terms</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>8. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the Federal 
            Republic of Nigeria. Disputes shall be subject to the exclusive jurisdiction of the courts 
            in Abuja FCT.
          </p>
        </div>

        <div className="legal-section">
          <h2>9. Changes to Terms</h2>
          <p>
            We will notify users of material changes via SMS or in-app notifications. Continued use 
            after changes constitutes acceptance of the new terms.
          </p>
        </div>

        <div className="legal-actions">
          <Link to="/privacypolicy" className="btn btn-outline">
            View Privacy Policy
          </Link>
          <button className="btn btn-primary" onClick={() => window.print()}>
            <i className="fas fa-print"></i> Print Terms
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;