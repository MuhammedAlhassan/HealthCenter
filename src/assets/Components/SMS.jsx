import React, { useState, useEffect } from 'react';
import './SMS';

const SMS = () => {
  const [formData, setFormData] = useState({
    countryCode: '+1',
    phoneNumber: '',
    message: '',
    sendDate: new Date().toISOString().slice(0, 16),
    isRecurring: false,
    frequency: 'daily'
  });

  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(formData.message.length);
  }, [formData.message]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Scheduling reminder:', formData);
    alert(`Reminder scheduled for ${new Date(formData.sendDate).toLocaleString()}`);
  };

  const formatPreviewDate = () => {
    try {
      return new Date(formData.sendDate).toLocaleString();
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className="sms-container">
      <div className="sms-card">
        <h1 className="sms-title">Schedule SMS Reminder</h1>
        
        <form className="sms-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Recipient Phone Number</label>
            <div className="phone-input-wrapper">
              <select 
                className="country-code-select"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
              >
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (AU)</option>
                <option value="+91">+234 (NIG)</option>
              </select>
              <input
                className="phone-input"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone number"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Reminder Message</label>
            <textarea
              className="message-textarea"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your reminder message here..."
              maxLength={160}
              required
            />
            <small className="char-count">{charCount}/160 characters</small>
          </div>
          
          <div className="form-group">
            <label className="form-label">Send Date & Time</label>
            <input
              className="datetime-input"
              type="datetime-local"
              name="sendDate"
              value={formData.sendDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="checkbox-group">
            <input
              className="checkbox"
              type="checkbox"
              id="recurring"
              name="isRecurring"
              checked={formData.isRecurring}
              onChange={handleChange}
            />
            <label className="checkbox-label" htmlFor="recurring">
              Make this a recurring reminder
            </label>
          </div>
          
          {formData.isRecurring && (
            <div className="form-group">
              <label className="form-label">Frequency</label>
              <select
                className="frequency-select"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}
          
          <button className="submit-button" type="submit">
            Schedule Reminder
          </button>
        </form>
        
        <div className="preview-card">
          <h3 className="preview-title">Preview</h3>
          <p className="preview-text">
            <strong>To:</strong> {formData.countryCode}{formData.phoneNumber || 'Not specified'}
          </p>
          <p className="preview-text">
            <strong>Message:</strong> {formData.message || 'No message entered'}
          </p>
          <p className="preview-text">
            <strong>Scheduled for:</strong> {formatPreviewDate()}
          </p>
          {formData.isRecurring && (
            <p className="preview-text">
              <strong>Repeats:</strong> {formData.frequency}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SMS;