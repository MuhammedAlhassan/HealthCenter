import React from 'react';
import './Services';

const Services = () => {
  // Service categories
  const serviceCategories = [
    {
      id: 1,
      title: "Prenatal Monitoring",
      icon: "fas fa-baby",
      description: "Essential pregnancy support accessible via SMS and mobile app",
      services: [
        {
          name: "SMS Appointment Reminders",
          detail: "Automated text reminders for antenatal visits and vaccinations"
        },
        {
          name: "Pregnancy Health Alerts",
          detail: "Weekly updates on fetal development and warning signs"
        },
        {
          name: "Voice Symptom Checker",
          detail: "Interactive voice system to assess pregnancy concerns"
        },
        {
          name: "Risk Factor Screening",
          detail: "Early identification of potential complications"
        }
      ]
    },
    {
      id: 2,
      title: "Emergency Support",
      icon: "fas fa-ambulance",
      description: "Immediate assistance when you need it most",
      services: [
        {
          name: "One-Tap SOS",
          detail: "Instant alert to nearby clinics with your location"
        },
        {
          name: "Emergency Transport Coordination",
          detail: "Help arranging transportation to health facilities"
        },
        {
          name: "24/7 Emergency Hotline",
          detail: "Direct access to trained maternal health responders"
        },
        {
          name: "Blood Donor Network",
          detail: "Rapid connection to blood banks when needed"
        }
      ]
    },
    {
      id: 3,
      title: "Clinic Connections",
      icon: "fas fa-clinic-medical",
      description: "Access to quality healthcare providers",
      services: [
        {
          name: "Clinic Locator",
          detail: "Find nearby facilities with maternal services"
        },
        {
          name: "Provider Profiles",
          detail: "Information on qualified OB-GYNs and midwives"
        },
        {
          name: "Appointment Scheduling",
          detail: "Book antenatal visits via SMS or app"
        },
        {
          name: "Medical Record Sharing",
          detail: "Securely share your health history with providers"
        }
      ]
    },
    {
      id: 4,
      title: "Health Education",
      icon: "fas fa-book-medical",
      description: "Critical knowledge for safe pregnancy",
      services: [
        {
          name: "Low-Bandwidth Tutorials",
          detail: "Text and audio-based health lessons"
        },
        {
          name: "Danger Sign Alerts",
          detail: "Recognize emergency symptoms early"
        },
        {
          name: "Traditional Birth Attendant Training",
          detail: "Certification for community midwives"
        },
        {
          name: "Postpartum Care Guides",
          detail: "Essential information for after delivery"
        }
      ]
    }
  ];

  // Stats about services
  const serviceStats = [
    { value: "36", label: "States Covered" },
    { value: "2,400+", label: "Partner Clinics" },
    { value: "850K+", label: "Women Served" },
    { value: "58%", label: "Reduced Missed Appointments" }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-content">
          <h1>Pregvita Health Tracker Services</h1>
          <p>
            Life-saving support for Nigerian mothers through innovative, low-bandwidth 
            solutions that work on any mobile phone.
          </p>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Nigerian mother with baby" 
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="services-stats">
        {serviceStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Services Grid */}
      <section className="services-grid">
        {serviceCategories.map(category => (
          <div key={category.id} className="service-category">
            <div className="category-header">
              <i className={category.icon}></i>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </div>
            <ul className="service-list">
              {category.services.map((service, index) => (
                <li key={index}>
                  <h4>{service.name}</h4>
                  <p>{service.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Specialized Programs Section */}
      <section className="specialized-care">
        <h2>Specialized Initiatives</h2>
        <div className="care-programs">
          <div className="program-card">
            <div className="program-icon">
              <i className="fas fa-sms"></i>
            </div>
            <h3>SMS Health Network</h3>
            <p>
              Critical maternal health information delivered via text message, 
              requiring no smartphone or internet access.
            </p>
          </div>
          <div className="program-card">
            <div className="program-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Emergency Response Mapping</h3>
            <p>
              Real-time coordination with clinics and transport services during 
              obstetric emergencies.
            </p>
          </div>
          <div className="program-card">
            <div className="program-icon">
              <i className="fas fa-language"></i>
            </div>
            <h3>Multilingual Support</h3>
            <p>
              Services available in Hausa, Yoruba, and Igbo to ensure comprehension 
              across Nigeria's diverse communities.
            </p>
          </div>
        </div>
      </section>

      {/* Service Commitment */}
      <section className="service-commitment">
        <h2>Our Service Principles</h2>
        <div className="commitment-points">
          <div className="commitment-card">
            <i className="fas fa-mobile-alt"></i>
            <h3>Low-Bandwidth First</h3>
            <p>
              Designed to function on basic phones and 2G networks, ensuring access 
              in rural areas.
            </p>
          </div>
          <div className="commitment-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Secure Data</h3>
            <p>
              All health information encrypted and protected under Nigeria's NDPR regulations.
            </p>
          </div>
          <div className="commitment-card">
            <i className="fas fa-users"></i>
            <h3>Community-Based</h3>
            <p>
              Developed with input from Nigerian mothers, midwives, and healthcare providers.
            </p>
          </div>
          <div className="commitment-card">
            <i className="fas fa-bullhorn"></i>
            <h3>Emergency Focused</h3>
            <p>
              Priority given to preventing and responding to obstetric emergencies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;