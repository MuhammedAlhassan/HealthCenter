import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './AboutUs';
import AuthModal from './AuthModal';

// Team member data with Nigerian professionals
const team = [
  {
    id: 1,
    name: 'Dr. Adebayo Oke',
    role: 'Lead Maternal Health Specialist',
    bio: '15+ years experience reducing maternal mortality in rural Nigeria through innovative health tech solutions.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    name: 'Nneka Eze',
    role: 'Community Health Coordinator',
    bio: 'Specializes in adapting maternal health education for low-literacy communities across Northern Nigeria.',
    photo: 'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    name: 'Emeka Ibrahim',
    role: 'Low-Bandwidth Tech Lead',
    bio: 'Develops SMS/USSD solutions for maternal health access in Nigeria\'s most remote areas.',
    photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  }
];

const AboutUs = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleJoinClick = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const handleSignUpFreeClick = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const handleAskMidwivesClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  return (
    <div className="about-page">
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Saving Mothers' Lives Across Nigeria</h1>
          <p>
            Maternal Health Tracker is a Nigerian-developed solution providing critical 
            pregnancy support through SMS reminders, emergency SOS, and low-bandwidth 
            health information.
          </p>
         
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1604881991720-f91add269bed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Nigerian mother receiving antenatal care" 
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-card">
          <i className="fas fa-bullseye mission-icon"></i>
          <h2>Our Mission</h2>
          <p>
            Reduce Nigeria's maternal mortality rate by 50% through accessible 
            digital tools that work without internet, reaching every pregnant woman 
            even in rural communities.
          </p>
        </div>
        <div className="mission-card">
          <i className="fas fa-eye mission-icon"></i>
          <h2>Our Vision</h2>
          <p>
            A Nigeria where no woman dies from preventable pregnancy complications, 
            enabled by timely reminders, emergency response, and quality health 
            information at her fingertips.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <h2>Our Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-year">2020</div>
            <div className="timeline-content">
              <h3>Pilot in Kano State</h3>
              <p>
                Launched SMS appointment reminders with 10 clinics, reducing missed 
                antenatal visits by 45% in pilot communities.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2022</div>
            <div className="timeline-content">
              <h3>Emergency SOS Feature</h3>
              <p>
                Integrated one-tap emergency alerts connecting women directly to 
                nearby clinics during complications.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2024</div>
            <div className="timeline-content">
              <h3>National Scale-Up</h3>
              <p>
                Partnered with Nigeria's Federal Ministry of Health to deploy across 
                36 states with support from UNICEF and WHO.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Our Nigerian Health Experts</h2>
        <p className="team-subtitle">
          Our team combines medical expertise with deep understanding of Nigeria's 
          maternal health challenges in both urban and rural settings.
        </p>
        <div className="team-grid">
          {team.map(member => (
            <div key={member.id} className="team-card">
              <div className="team-photo">
                <img src={member.photo} alt={member.name} />
                <div className="photo-overlay">
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="cta-content">
          <h2>Take Charge of Your Maternal Health Today</h2>
          <div className="cta-buttons">
          
            <a href="http://localhost:5173/Cliniclocator"> 
              <button className="btn btn-outline">
                Find Nearby Clinics
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;