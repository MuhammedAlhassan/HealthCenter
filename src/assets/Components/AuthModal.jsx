import React, { useState } from 'react';
import { FaTimes, FaHeart, FaSpinner } from 'react-icons/fa';
import './AuthModal';

const AuthModal = ({ isOpen, onClose, mode, onToggleMode, onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    userType: 'expectant-mother',
    dueDate: '',
    address: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Get users from localStorage
  const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  // Save user to localStorage
  const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (mode === 'register') {
        // Check if user already exists
        const users = getUsers();
        const userExists = users.some(
          user => user.email === formData.email || user.phone === formData.phone
        );

        if (userExists) {
          throw new Error('User already exists with this email or phone');
        }

        // Register new user
        const userData = {
          id: Date.now().toString(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          userType: formData.userType,
          DueDate: formData.dueDate, // Always save as DueDate for consistency
          address: formData.address,
          password: formData.password,
          createdAt: new Date().toISOString()
        };
        
        saveUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData)); // Keep profile in sync
        onAuthSuccess(userData);
      } else {
        // Login existing user
        const users = getUsers();
        const user = users.find(
          user => (user.email === formData.email || user.phone === formData.email) && 
                  user.password === formData.password
        );

        if (!user) {
          throw new Error('Invalid credentials. Please try again.');
        }

        onAuthSuccess(user);
      }
      
      onClose();
      resetForm();
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      userType: 'expectant-mother',
      dueDate: '',
      address: '',
      password: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="auth-modal animate-scale-in">
        <button onClick={onClose} className="modal-close-btn">
          <FaTimes className="close-icon" />
        </button>
        
        <div className="modal-header">
          <FaHeart className="modal-icon" />
          <h2 className="modal-title">
            {mode === 'login' ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p className="modal-subtitle">
            {mode === 'login' 
              ? 'Sign in to continue your health journey' 
              : 'Create your account for better maternal health'}
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label className="label">First Name</label>
                  <input
                    className="input"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="label">Last Name</label>
                  <input
                    className="input"
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Phone Number</label>
                  <input
                    className="input"
                    type="tel"
                    name="phone"
                    placeholder="+234 xxx xxx xxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
              </div>

              <div className="form-group">
                <label className="label">Email</label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">User Type</label>
                <select 
                  className="input" 
                  name="userType"
                  value={formData.userType} 
                  onChange={handleChange}
                  required
                >
                  <option value="expectant-mother">Expectant Mother</option>
                  <option value="healthcare-provider">Healthcare Provider</option>
                </select>
              </div>

              {formData.userType === 'expectant-mother' && (
                <>
                  <div className="form-group">
                    <label className="label">Expected Due Date</label>
                    <input
                      className="input"
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">Full Address</label>
                    <input
                      className="input"
                      type="text"
                      name="address"
                      placeholder="Your full address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </>
          )}

          {mode === 'login' && (
            <div className="form-group">
              <label className="label">Email or Phone</label>
              <input
                className="input"
                type="text"
                name="email"
                placeholder="Enter your email or phone"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder={mode === 'register' ? 'Create a password' : 'Enter your password'}
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="spinner-icon" /> Processing...
              </>
            ) : mode === 'login' ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              onClick={() => {
                resetForm();
                onToggleMode(mode === 'login' ? 'register' : 'login');
              }} 
              className="auth-toggle-btn"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;