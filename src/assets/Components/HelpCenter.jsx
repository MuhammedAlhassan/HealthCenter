import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './HelpCenter';

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  // FAQ categories and questions
  const faqCategories = [
    {
      id: 'general',
      name: 'General Questions',
      icon: 'fas fa-question-circle',
      questions: [
        {
          id: 1,
          question: 'What is MamaCare and how does it work?',
          answer: 'MamaCare is a digital platform designed to improve maternal health outcomes across Africa. We provide educational resources, telemedicine services, and community support for expecting and new mothers. Our platform connects women with healthcare professionals and provides personalized health information.'
        },
        {
          id: 2,
          question: 'Is MamaCare free to use?',
          answer: 'Yes, the basic version of MamaCare is completely free. We offer premium services like personalized consultations and advanced health tracking for a small fee. Some features may require payment depending on your healthcare provider.'
        },
        {
          id: 3,
          question: 'How do I create an account?',
          answer: 'You can create an account by downloading our mobile app or visiting our website. Click on "Sign Up" and follow the instructions. You\'ll need to provide basic information like your name, email address, and pregnancy status.'
        }
      ]
    },
    {
      id: 'technical',
      name: 'Technical Support',
      icon: 'fas fa-laptop-medical',
      questions: [
        {
          id: 4,
          question: 'The app keeps crashing. What should I do?',
          answer: 'First, try closing and reopening the app. If that doesn\'t work, check for updates in your app store. You can also try uninstalling and reinstalling the app. If the problem persists, contact our support team with details about your device and operating system.'
        },
        {
          id: 5,
          question: 'I forgot my password. How can I reset it?',
          answer: 'On the login screen, click "Forgot Password" and enter your registered email address. You\'ll receive a link to reset your password. If you don\'t see the email, check your spam folder.'
        },
        {
          id: 6,
          question: 'How do I update my personal information?',
          answer: 'Go to your profile page and click "Edit Profile". Make the necessary changes and save them. Some health information can only be updated by your healthcare provider.'
        }
      ]
    },
    {
      id: 'health',
      name: 'Health Information',
      icon: 'fas fa-heartbeat',
      questions: [
        {
          id: 7,
          question: 'How accurate is the health information provided?',
          answer: 'All health content on MamaCare is reviewed by qualified medical professionals and based on current medical guidelines. However, it should not replace professional medical advice. Always consult your healthcare provider for personal medical concerns.'
        },
        {
          id: 8,
          question: 'What should I do in a medical emergency?',
          answer: 'In case of emergency, call your local emergency number immediately. MamaCare is not a substitute for emergency care. After seeking emergency help, you can use our platform to inform your healthcare provider and access relevant health records.'
        },
        {
          id: 9,
          question: 'How do I schedule an appointment with a doctor?',
          answer: 'Go to the "Appointments" section in the app and select "Book Appointment". Choose your preferred healthcare provider, date, and time. You\'ll receive a confirmation with details about your virtual or in-person visit.'
        }
      ]
    },
    {
      id: 'account',
      name: 'Account & Payments',
      icon: 'fas fa-user-circle',
      questions: [
        {
          id: 10,
          question: 'How do I upgrade to premium services?',
          answer: 'Navigate to "Account Settings" and select "Upgrade to Premium". Choose your preferred subscription plan and payment method. You\'ll gain immediate access to premium features after payment confirmation.'
        },
        {
          id: 11,
          question: 'How do I cancel my subscription?',
          answer: 'Go to "Account Settings" > "Subscriptions" and select "Cancel Subscription". Your access to premium features will continue until the end of your current billing period.'
        },
        {
          id: 12,
          question: 'Is my payment information secure?',
          answer: 'Yes, we use industry-standard encryption for all financial transactions. MamaCare does not store your full payment details on our servers. All payments are processed through secure payment gateways.'
        }
      ]
    }
  ];

  // Popular articles
  const popularArticles = [
    {
      id: 101,
      title: 'How to track your pregnancy week by week',
      category: 'health'
    },
    {
      id: 102,
      title: 'Troubleshooting common app issues',
      category: 'technical'
    },
    {
      id: 103,
      title: 'Understanding your health dashboard',
      category: 'general'
    },
    {
      id: 104,
      title: 'Managing payment methods and subscriptions',
      category: 'account'
    }
  ];

  // Contact methods
  const contactMethods = [
    {
      id: 1,
      method: 'Email Support',
      details: 'support@mamacare.org',
      icon: 'fas fa-envelope',
      responseTime: 'Within 24 hours'
    },
    {
      id: 2,
      method: 'Live Chat',
      details: 'Available in the app',
      icon: 'fas fa-comment-dots',
      responseTime: 'Instant during business hours'
    },
    {
      id: 3,
      method: 'Phone Support',
      details: '+234 800 123 4567',
      icon: 'fas fa-phone-alt',
      responseTime: '9am - 5pm WAT, Mon-Fri'
    },
    {
      id: 4,
      method: 'Community Forum',
      details: 'Visit our community',
      icon: 'fas fa-users',
      responseTime: 'Peer responses vary'
    }
  ];

  // Filter questions based on search query
  const filteredQuestions = faqCategories
    .flatMap(category => category.questions)
    .filter(question => 
      question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Get current category questions
  const currentCategory = faqCategories.find(cat => cat.id === activeCategory);
  const categoryQuestions = currentCategory?.questions || [];

  return (
    <div className="help-center">
      {/* Hero Section */}
      <section className="help-hero">
        <div className="hero-content">
          <h1>How can we help you today?</h1>
          <p>Find answers to common questions or contact our support team for personalized assistance.</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="help-container">
        {/* Sidebar Navigation */}
        <aside className="help-sidebar">
          <h3>Help Categories</h3>
          <ul className="category-list">
            {faqCategories.map(category => (
              <li 
                key={category.id}
                className={activeCategory === category.id ? 'active' : ''}
                onClick={() => setActiveCategory(category.id)}
              >
                <i className={category.icon}></i>
                {category.name}
              </li>
            ))}
          </ul>

          <div className="popular-articles">
            <h3>Popular Articles</h3>
            <ul>
              {popularArticles.map(article => (
                <li key={article.id}>
                  <Link to={`/help/article/${article.id}`}>
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="help-main-content">
          {searchQuery ? (
            <div className="search-results">
              <h2>Search Results for "{searchQuery}"</h2>
              {filteredQuestions.length > 0 ? (
                <div className="faq-list">
                  {filteredQuestions.map(question => (
                    <div key={question.id} className="faq-item">
                      <h3>{question.question}</h3>
                      <p>{question.answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <i className="fas fa-search"></i>
                  <p>No results found for your search. Try different keywords or contact our support team.</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <h2>{currentCategory.name}</h2>
              <div className="faq-list">
                {categoryQuestions.map(question => (
                  <div key={question.id} className="faq-item">
                    <h3>{question.question}</h3>
                    <p>{question.answer}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Contact Support Section */}
      <section className="contact-support">
        <h2>Still need help? Contact our support team</h2>
        <div className="contact-methods">
          {contactMethods.map(method => (
            <div key={method.id} className="contact-card">
              <div className="contact-icon">
                <i className={method.icon}></i>
              </div>
              <h3>{method.method}</h3>
              <p className="contact-details">{method.details}</p>
              <p className="response-time">Response time: {method.responseTime}</p>
              <button className="contact-button">
                {method.method === 'Email Support' ? 'Send Email' : 
                 method.method === 'Live Chat' ? 'Start Chat' :
                 method.method === 'Phone Support' ? 'Call Now' : 'Visit Forum'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Notice */}
      <div className="emergency-notice">
        <i className="fas fa-exclamation-triangle"></i>
        <p>
          <strong>Medical Emergency:</strong> If you're experiencing a medical emergency, 
          please call your local emergency number immediately. MamaCare support cannot 
          respond to emergency medical situations.
        </p>
      </div>
    </div>
  );
};

export default HelpCenter;