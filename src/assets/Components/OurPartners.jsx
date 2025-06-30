import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './OurPartners';

const OurPartners = () => {
  // Partner categories data with mixed icons and images
  const partnerCategories = [
    {
      id: 1,
      title: "Healthcare Providers",
      description: "Hospitals and clinics providing maternal care services",
      icon: "fas fa-hospital",
      partners: [
        {
          id: 1,
          name: "City Maternal Hospital",
          contribution: "Prenatal and postnatal care programs",
          type: "image",
          logo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200"
        },
        {
          id: 2,
          name: "Community Health Clinics Network",
          contribution: "Accessible care in underserved areas",
          type: "icon",
          icon: "fas fa-clinic-medical"
        },
        {
          id: 3,
          name: "National Midwives Association",
          contribution: "Skilled birth attendance training",
          type: "image",
          logo: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=200"
        }
      ]
    },
    {
      id: 2,
      title: "Technology Partners",
      description: "Innovators improving maternal health through technology",
      icon: "fas fa-microchip",
      partners: [
        {
          id: 4,
          name: "HealthTech Solutions",
          contribution: "Mobile health monitoring platform",
          type: "image",
          logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200"
        },
        {
          id: 5,
          name: "Telemedicine Network",
          contribution: "Virtual consultations for rural mothers",
          type: "icon",
          icon: "fas fa-laptop-medical"
        },
        {
          id: 6,
          name: "Data Analytics Group",
          contribution: "Pregnancy outcome predictions",
          type: "image",
          logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200"
        }
      ]
    },
    {
      id: 3,
      title: "Community Organizations",
      description: "Grassroots groups supporting mothers locally",
      icon: "fas fa-hands-helping",
      partners: [
        {
          id: 7,
          name: "Mothers' Support Collective",
          contribution: "Peer counseling and education",
          type: "image",
          logo: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=200"
        },
        {
          id: 8,
          name: "Rural Health Advocates",
          contribution: "Transportation to medical facilities",
          type: "icon",
          icon: "fas fa-bus"
        },
        {
          id: 9,
          name: "Cultural Birth Workers",
          contribution: "Culturally-sensitive care practices",
          type: "image",
          logo: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=200"
        }
      ]
    }
  ];

  // Testimonials with images
  const testimonials = [
    {
      id: 1,
      quote: "Our partnership has enabled us to reach 40% more expectant mothers in rural communities.",
      author: "Dr. Amina Diallo",
      role: "Medical Director, City Maternal Hospital",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200"
    },
    {
      id: 2,
      quote: "The mobile health platform has revolutionized how we monitor high-risk pregnancies.",
      author: "Sarah Johnson",
      role: "CEO, HealthTech Solutions",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200"
    },
    {
      id: 3,
      quote: "Cultural sensitivity training has dramatically improved our service delivery.",
      author: "Maria Gutierrez",
      role: "Director, Mothers' Support Collective",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200"
    }
  ];

  // Impact metrics
  const impactMetrics = [
    {
      id: 1,
      value: "250+",
      label: "Healthcare Facilities",
      icon: "fas fa-hospital"
    },
    {
      id: 2,
      value: "1.2M",
      label: "Mothers Reached",
      icon: "fas fa-baby"
    },
    {
      id: 3,
      value: "85%",
      label: "Satisfaction Rate",
      icon: "fas fa-smile"
    },
    {
      id: 4,
      value: "42",
      label: "Countries Served",
      icon: "fas fa-globe-africa"
    }
  ];

  return (
    <div className="partners-container">
      {/* Hero Section */}
      <section className="partners-hero">
        <div className="hero-content">
          <h1>Our Collaborative Network</h1>
          <p className="hero-subtitle">
            Partnering with healthcare providers, technologists, and community organizations to transform maternal health outcomes worldwide.
          </p>
          <div className="hero-cta">
            <Link to="/contact" className="btn btn-primary">
              Become a Partner
            </Link>
            <Link to="/impact" className="btn btn-secondary">
              See Our Impact
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800" 
            alt="Healthcare professionals collaborating"
            className="hero-img"
          />
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <h2 className="section-title">Our Collective Impact</h2>
        <div className="metrics-grid">
          {impactMetrics.map(metric => (
            <div key={metric.id} className="metric-card">
              <div className="metric-icon">
                <i className={metric.icon}></i>
              </div>
              <h3>{metric.value}</h3>
              <p>{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partner Categories */}
      <section className="partners-section">
        <h2 className="section-title">Our Partner Ecosystem</h2>
        {partnerCategories.map(category => (
          <div key={category.id} className="partner-category">
            <div className="category-header">
              <div className="category-icon">
                <i className={category.icon}></i>
              </div>
              <div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            </div>
            <div className="partners-grid">
              {category.partners.map(partner => (
                <div key={partner.id} className="partner-card">
                  <div className="partner-logo">
                    {partner.type === "image" ? (
                      <img src={partner.logo} alt={partner.name} />
                    ) : (
                      <i className={partner.icon}></i>
                    )}
                  </div>
                  <h4>{partner.name}</h4>
                  <p className="partner-contribution">
                    <i className="fas fa-check-circle"></i> {partner.contribution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">Partner Voices</h2>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <i className="fas fa-quote-left quote-icon"></i>
                <p>{testimonial.quote}</p>
              </div>
              <div className="testimonial-author">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="author-image"
                />
                <div>
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="partnership-cta">
        <div className="cta-content">
          <h2>Join Our Mission</h2>
          <p>
            Whether you're a healthcare provider, technology innovator, or community leader, we invite you to collaborate with us in creating better maternal health outcomes.
          </p>
          <Link to="/contact" className="btn btn-primary btn-large">
            Explore Partnership Opportunities
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OurPartners;