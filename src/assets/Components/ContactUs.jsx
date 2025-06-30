  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import './ContactUs';

  const ContactUs = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: '',
      urgency: 'normal'
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n\n` +
        `Email: ${formData.email}\n\n` +
        `Urgency: ${formData.urgency}\n\n` +
        `Message:\n${formData.message}`
      );
      
      // Open user's default email client with pre-filled data
      window.location.href = `mailto:muhammedalhassan815@gmail.com?subject=${subject}&body=${body}`;
      
      // Reset form and reload page after submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          urgency: 'normal'
        });
        window.location.reload();
      }, 1000);
    };

    const contactMethods = [
      {
        icon: 'fas fa-envelope',
        title: 'General Inquiries',
        value: 'muhammedalhassan815@gmail.com',
        link: 'https://mail.google.com/mail/?view=cm&fs=1&to=muhammedalhassan815@gmail.com'
      },
      {
        icon: 'fas fa-headset',
        title: 'Support Hotline',
        value: '+234 816 776 9208',
        link: 'tel:+2348167769208'
      },
      {
        icon: 'fas fa-map-marker-alt',
        title: 'Head Office',
        value: '12 Medical Drive, Victoria Island, Lagos, Nigeria',
        link: 'https://maps.google.com/?q=12+Medical+Drive,+Victoria+Island,+Lagos'
      },
      {
        icon: 'fab fa-whatsapp',
        title: 'WhatsApp Support',
        value: '+234 816 776 9208',
        link: 'https://wa.me/2348167769208'
      }
    ];

    const departments = [
      {
        name: 'Medical Support',
        email: 'muhammedalhassan815@gmail.com',
        desc: 'Pregnancy-related questions, appointment issues'
      },
      {
        name: 'Technical Support',
        email: 'muhammedalhassan815@gmail.com',
        desc: 'App troubleshooting, account problems'
      },
      {
        name: 'Partnerships',
        email: 'muhammedalhassan815@gmail.com',
        desc: 'Clinic integrations, corporate programs'
      },
      {
        name: 'Media Inquiries',
        email: 'muhammedalhassan815@gmail.com',
        desc: 'Interview requests, press materials'
      }
    ];

    return (
      <div className="contact-page">
        {/* Hero Section */}
   

        {/* Contact Methods */}
        <section className="contact-methods">
          <h2 className="section-title">Quick Contact Options</h2>
          <div className="method-grid">
            {contactMethods.map((method, index) => (
              <div key={index} className="method-card">
                <div className="method-icon">
                  <i className={method.icon}></i>
                </div>
                <h3>{method.title}</h3>
                <a 
                  href={method.link} 
                  className="method-value"
                  aria-label={`${method.title}: ${method.value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {method.value}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-form-section">
          <div className="form-container">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject*</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="urgency">Urgency Level</label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  aria-describedby="urgencyHelp"
                >
                  <option value="low">Low (General Inquiry)</option>
                  <option value="normal">Normal (Response within 24hrs)</option>
                  <option value="high">High (Urgent Medical Question)</option>
                </select>
                <small id="urgencyHelp">
                  For medical emergencies, please call your local hospital immediately.
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message*</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                ></textarea>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="departments-container">
            <h3>Contact Specific Departments</h3>
            <div className="departments-grid">
              {departments.map((dept, index) => (
                <div key={index} className="department-card">
                  <h4>{dept.name}</h4>
                  <a 
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${dept.email}`}
                    className="dept-email"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dept.email}
                  </a>
                  <p>{dept.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ CTA */}
        <section className="faq-cta">
          <div className="faq-content">
            <h2>Need Immediate Help?</h2>
            <p>
              Check our <Link to="/faq">Frequently Asked Questions</Link> for quick 
              answers to common questions about pregnancy tracking, appointments, 
              and account management.
            </p>
            <a href="/faq" className="btn btn-outline">
              Visit FAQ Center
            </a>
          </div>
        </section>
      </div>
    );
  };

  export default ContactUs;