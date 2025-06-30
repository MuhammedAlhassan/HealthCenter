import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure icons load
import './FeaturesSection';

const FeaturesSection = () => {
  const features = [
    {
      icon: "fas fa-calendar-check",
      title: "Smart Appointments",
      description: "Never miss important antenatal visits with automated SMS reminders and easy scheduling.",
      color: "primary",
      items: ["SMS appointment reminders", "Easy rescheduling", "Provider availability"]
    },
    {
      icon: "fas fa-ambulance",
      title: "Emergency Response",
      description: "One-tap SOS feature to instantly connect with nearby clinics during emergencies.",
      color: "destructive",
      items: ["Instant location sharing", "Nearby clinic alerts", "Medical profile access"]
    },
    {
      icon: "fas fa-microphone",
      title: "Voice Health Check",
      description: "Report symptoms using voice commands and receive immediate health guidance.",
      color: "secondary",
      items: ["Voice symptom reporting", "Instant health advice", "Multiple language support"]
    },
    {
      icon: "fas fa-map-marker-alt",
      title: "Clinic Locator",
      description: "Find the nearest healthcare facilities with real-time availability and directions.",
      color: "accent",
      items: ["GPS-based location", "Real-time availability", "Facility information"]
    },
    {
      icon: "fas fa-book-medical",
      title: "Health Information",
      description: "Access essential pregnancy information optimized for low-bandwidth connections.",
      color: "purple",
      items: ["Low-bandwidth articles", "Video guides", "Expert advice"]
    },
    {
      icon: "fas fa-shield-alt",
      title: "Secure Profiles",
      description: "Safely share medical information with healthcare providers when needed.",
      color: "blue",
      items: ["Encrypted data sharing", "Provider verification", "Access control"]
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="features-header animate-fade-in">
          <h2 className="features-title">Comprehensive Care Features</h2>
          <p className="features-description">
            Everything you need for a healthy pregnancy journey, designed for mothers in Nigeria and beyond.
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`feature-card animate-bounce`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`feature-icon feature-icon-${feature.color}`}>
                <i className={feature.icon}></i>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-items">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;