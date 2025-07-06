import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './FAQ';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const categories = [
    {
      id: 'general',
      name: 'General',
      icon: 'fas fa-question-circle'
    },
    {
      id: 'account',
      name: 'Account',
      icon: 'fas fa-user-circle'
    },
    {
      id: 'tracking',
      name: 'Pregnancy Tracking',
      icon: 'fas fa-baby'
    },
    {
      id: 'appointments',
      name: 'Appointments',
      icon: 'fas fa-calendar-alt'
    },
    {
      id: 'safety',
      name: 'Privacy & Safety',
      icon: 'fas fa-shield-alt'
    },
    {
      id: 'premium',
      name: 'Premium Features',
      icon: 'fas fa-crown'
    }
  ];

  const questions = {
    general: [
      {
        id: 'gen1',
        question: 'Is pregvita available outside Nigeria?',
        answer: 'Currently, MamaCare primarily serves users in Nigeria. However, our tracking features can be used anywhere, while provider connections are limited to our Nigerian network.'
      },
      {
        id: 'gen2',
        question: 'How accurate is the pregnancy tracker?',
        answer: 'Our tracker uses medical guidelines for fetal development but should not replace professional medical advice. Accuracy depends on correct due date input - consult your doctor for precise assessments.'
      },
      {
        id: 'gen3',
        question: 'Can I use pregvita  without internet?',
        answer: 'Basic tracking features work offline, but you\'ll need internet to  receive updates. We compress data to minimize usage.'
      }
    ],
    account: [
      {
        id: 'acc1',
        question: 'How do I reset my password?',
        answer: 'Go to Login > Forgot Password. Enter your registered email or phone number to receive a secure reset link valid for 2 hours.'
      },
      {
        id: 'acc2',
        question: 'Can I change my due date later?',
        answer: 'No!  .'
      }
    ],
    tracking: [
      {
        id: 'tr1',
        question: 'How does the kick counter work?',
        answer: 'Tap the + button each time you feel movement. After 10 kicks, the app records duration. Abnormal patterns trigger alerts to contact your provider.'
      },
      {
        id: 'tr2',
        question: 'how do i know if my calculator i already counting?',
        answer: 'when it start counting ,u will see the line getting filled up little by little '
      }
    ],
    appointments: [
      {
        id: 'app1',
        question: 'How do virtual consultations work?',
        answer: 'After booking and you already see your  booking in the history ,then it is already booked and dilivered to us '
      },
      {
        id: 'app2',
        question: 'Can I reschedule appointments?',
        answer: 'Yes, up to 24 hours before. Late cancellations may incur fees depending on your provider\'s policy.'
      }
    ],
    safety: [
      {
        id: 'safe1',
        question: 'Who can see my health data?',
        answer: 'Only you and healthcare providers you authorize. We never sell data. All information is encrypted following Nigeria\'s NDPR guidelines.'
      },
      {
        id: 'safe2',
        question: 'How do I delete my account?',
        answer: 'Settings > Account > Delete Account. Data is permanently erased within 30 days, except records required by law.'
      }
    ],
    premium: [
      {
        id: 'prem1',
        question: 'What\'s included in the free trial?',
        answer: 'it is all free ,no chages needed .'
      },
      {
        id: 'prem2',
        question: 'How does the emergency response work?',
        answer: 'Premium users can trigger an alert that simultaneously notifies your designated provider and nearby hospitals with your medical summary and location.'
      }
    ]
  };

  // Combine all questions for search functionality
  const allQuestions = useMemo(() => {
    return Object.values(questions).flat();
  }, [questions]);

  // Filter questions based on search query
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) {
      return questions[activeCategory];
    }

    const query = searchQuery.toLowerCase();
    return allQuestions.filter(
      q => q.question.toLowerCase().includes(query) || 
           q.answer.toLowerCase().includes(query)
    );
  }, [searchQuery, activeCategory, allQuestions]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled reactively as the user types
  };

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="hero-content">
          <h1>Frequently Asked Questions</h1>
          <p>
            Quick answers to common questions about MamaCare. Can't find what you need?{' '}
          
          </p>
          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search questions..."
              aria-label="Search FAQ questions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </section>

      {/* Main Content */}
      <div className="faq-container">
        {/* Categories - Hidden when searching */}
        {!searchQuery && (
          <nav className="faq-categories">
            <ul>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={activeCategory === category.id ? 'active' : ''}
                >
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    aria-current={activeCategory === category.id}
                  >
                    <i className={category.icon}></i>
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Questions */}
        <div className="faq-questions">
          {searchQuery ? (
            <>
              <h2>
                <i className="fas fa-search"></i>
                Search Results for "{searchQuery}"
              </h2>
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((item) => (
                  <div
                    key={item.id}
                    className={`faq-item ${openQuestion === item.id ? 'open' : ''}`}
                  >
                    <button
                      className="faq-question"
                      onClick={() => toggleQuestion(item.id)}
                      aria-expanded={openQuestion === item.id}
                      aria-controls={`answer-${item.id}`}
                    >
                      <span>{item.question}</span>
                      <i className={`fas fa-chevron-${openQuestion === item.id ? 'up' : 'down'}`}></i>
                    </button>
                    <div
                      id={`answer-${item.id}`}
                      className="faq-answer"
                      aria-hidden={openQuestion !== item.id}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <i className="fas fa-search-minus"></i>
                  <p>No results found for "{searchQuery}"</p>
                  <button onClick={() => setSearchQuery('')} className="btn btn-primary">
                    Clear search
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <h2>
                <i className={categories.find(c => c.id === activeCategory).icon}></i>
                {categories.find(c => c.id === activeCategory).name} Questions
              </h2>
              
              {filteredQuestions.map((item) => (
                <div
                  key={item.id}
                  className={`faq-item ${openQuestion === item.id ? 'open' : ''}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleQuestion(item.id)}
                    aria-expanded={openQuestion === item.id}
                    aria-controls={`answer-${item.id}`}
                  >
                    <span>{item.question}</span>
                    <i className={`fas fa-chevron-${openQuestion === item.id ? 'up' : 'down'}`}></i>
                  </button>
                  <div
                    id={`answer-${item.id}`}
                    className="faq-answer"
                    aria-hidden={openQuestion !== item.id}
                  >
                    <p>{item.answer}</p>
                    {item.id === 'gen2' && (
                      <Link to="/tracking-guide" className="learn-more">
                       
                      </Link>
                    )}
                    {item.id === 'safe1' && (
                      <Link to="/privacy" className="learn-more">
                  
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Still Need Help? */}
          <div className="still-help">
            <div className="help-icon">
              <i className="fas fa-hands-helping"></i>
            </div>
            <div className="help-content">
              <h3>Still need help?</h3>
              <p>
                Our support team is available 24/7 to assist you with any questions.
              </p>
              <div className="help-buttons">
                <Link to="/contactus" className="btn btn-primary">
                  Contact Us
                </Link>
                <a href="tel:08167769208" className="btn btn-whatsapp">Call 0816 776 9208</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;