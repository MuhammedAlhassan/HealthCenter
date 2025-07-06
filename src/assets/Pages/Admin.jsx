import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes, FaHeart, FaSpinner, FaEye, FaTrash, FaUser, FaBell, FaSignOutAlt, FaCog, FaSearch, FaBars, FaChevronDown, FaChevronUp, FaHome, FaChartLine, FaUsers, FaCalendarCheck, FaNewspaper, FaQuestionCircle, FaBook, FaExclamationTriangle, FaCogs, FaUserPlus, FaBaby, FaCalendarAlt, FaFlask, FaDownload, FaUserSlash, FaCalendarTimes, FaRedo, FaPlus, FaEdit, FaSave, FaEyeSlash, FaCalendarPlus, FaArrowUp, FaArrowDown, FaChartArea, FaFileMedical, FaBellSlash, FaCheck } from 'react-icons/fa';
import Blog from '../Components/Blog';

// Utility functions
const apiRequest = async (method, endpoint, data = null) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Authentication functions
const loginUser = async (credentials) => {
  // First check local users
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(
    user => (user.email === credentials.email || user.phone === credentials.email) && 
            user.password === credentials.password
  );

  if (user) {
    const token = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Add login notification for admin
    if (user.role === 'admin') {
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      notifications.unshift({
        id: Date.now(),
        title: "Admin Login",
        message: `Admin ${user.firstName} ${user.lastName} logged in`,
        time: new Date().toISOString(),
        unread: true,
        icon: 'user'
      });
      localStorage.setItem('adminNotifications', JSON.stringify(notifications));
    }
    
    return { 
      token, 
      user: {
        ...user,
        avatar: user.avatar || "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
      }
    };
  }

  // Check hardcoded admin credentials
  if ((credentials.email === 'admin@pregvita.com' && credentials.password === 'admin123') || 
      (credentials.email === 'muhammedalhassan815@gmail.com' && credentials.password === 'hajji815')) {
    const token = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('token', token);
    const adminUser = {
      id: 'admin-1',
      firstName: 'Admin',
      lastName: 'User',
      email: credentials.email,
      role: 'admin',
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
    };
    localStorage.setItem('currentUser', JSON.stringify(adminUser));
    
    // Add login notification
    const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    notifications.unshift({
      id: Date.now(),
      title: "Admin Login",
      message: `Admin ${adminUser.firstName} ${adminUser.lastName} logged in`,
      time: new Date().toISOString(),
      unread: true,
      icon: 'user'
    });
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
    
    return { 
      token, 
      user: adminUser
    };
  }

  throw new Error('Invalid credentials');
};

const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
};

const checkAuth = () => {
  return !!localStorage.getItem('token');
};

const registerUser = async (userData) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Check if user already exists
  const userExists = users.some(
    user => user.email === userData.email || user.phone === userData.phone
  );

  if (userExists) {
    throw new Error('User already exists with this email or phone');
  }

  const newUser = {
    id: Date.now().toString(),
    ...userData,
    createdAt: new Date().toISOString(),
    status: 'active',
    lastLogin: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  // Add registration notification for admin
  const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
  notifications.unshift({
    id: Date.now(),
    title: "New User Registration",
    message: `${userData.firstName} ${userData.lastName} (${userData.userType}) registered`,
    time: new Date().toISOString(),
    unread: true,
    icon: 'user-plus'
  });
  localStorage.setItem('adminNotifications', JSON.stringify(notifications));

  return newUser;
};

// Data fetching functions
const fetchStats = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const appointments = fetchAppointments();
  const today = new Date().toISOString().split('T')[0];
  return {
    totalPatients: users.filter(u => u.role === 'patient').length,
    activePregnancies: users.filter(u => u.userType === 'expectant-mother' && u.status === 'active').length,
    todayAppointments: appointments.filter(a => a.date === today).length,
    emergencyAlerts: JSON.parse(localStorage.getItem('emergencyLogs') || '[]').filter(e => e.status === 'pending').length,
    newRegistrations: users.filter(u => {
      const regDate = new Date(u.createdAt).toISOString().split('T')[0];
      return regDate === today;
    }).length,
    messages: 7
  };
};

const fetchUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

const fetchAppointments = () => {
  const data = JSON.parse(localStorage.getItem('adminAppointments') || '[]');
  return Array.isArray(data) ? data : [];
};

const fetchBlogPosts = () => {
  return JSON.parse(localStorage.getItem('blogPosts') || '[]');
};

const fetchFAQs = () => {
  return JSON.parse(localStorage.getItem('faqs') || '[]');
};

const fetchSMSReminders = () => {
  return JSON.parse(localStorage.getItem('smsReminders') || '[]');
};

const fetchEmergencyLogs = () => {
  return JSON.parse(localStorage.getItem('emergencyLogs') || '[]');
};

const fetchNotifications = () => {
  return JSON.parse(localStorage.getItem('adminNotifications') || '[]');
};

const fetchSettings = () => {
  const defaults = {
    clinicName: "Pregvita",
    address: "789 Health Ave, Suite 100, New York, NY 10005",
    phone: "+1 212-555-3000",
    email: "info@pregvita.com",
    workingHours: "Monday to Friday: 8:00 AM - 6:00 PM",
    smsNotifications: true,
    emailNotifications: true,
    appointmentReminderHours: 24,
    emergencyContact: "+1 212-555-9111"
  };
  
  const saved = JSON.parse(localStorage.getItem('settings') || '{}');
  return { ...defaults, ...saved };
};

// Initialize sample data if empty
const initializeSampleData = () => {
  if (!localStorage.getItem('users')) {
    const sampleUsers = [
      {
        id: 1,
        firstName: "Maria",
        lastName: "Rodriguez",
        email: "maria@example.com",
        phone: "+1 555-123-4567",
        userType: "expectant-mother",
        role: "patient",
        dueDate: "2023-11-15",
        address: "123 Main St, New York, NY",
        password: "password123",
        status: "active",
        createdAt: "2023-05-15T10:30:00Z",
        lastLogin: "2023-05-20T08:45:00Z"
      },
      {
        id: 2,
        firstName: "Jennifer",
        lastName: "Kim",
        email: "jennifer@example.com",
        phone: "+1 555-987-6543",
        userType: "expectant-mother",
        role: "patient",
        dueDate: "2023-10-20",
        address: "456 Oak Ave, New York, NY",
        password: "password123",
        status: "active",
        createdAt: "2023-05-14T14:20:00Z",
        lastLogin: "2023-05-19T14:30:00Z"
      },
      {
        id: 3,
        firstName: "Sarah",
        lastName: "Thompson",
        email: "sarah@example.com",
        phone: "+1 555-456-7890",
        userType: "expectant-mother",
        role: "patient",
        dueDate: "2023-12-05",
        address: "789 Pine Rd, New York, NY",
        password: "password123",
        status: "active",
        createdAt: "2023-05-12T09:15:00Z",
        lastLogin: "2023-05-18T10:15:00Z"
      },
      {
        id: 4,
        firstName: "Emily",
        lastName: "Davis",
        email: "emily@example.com",
        phone: "+1 555-789-0123",
        userType: "expectant-mother",
        role: "patient",
        dueDate: "2023-09-30",
        address: "321 Elm St, New York, NY",
        password: "password123",
        status: "inactive",
        createdAt: "2023-05-10T16:45:00Z",
        lastLogin: "2023-05-15T11:20:00Z"
      },
      {
        id: 5,
        firstName: "Jessica",
        lastName: "Wilson",
        email: "jessica@example.com",
        phone: "+1 555-234-5678",
        userType: "expectant-mother",
        role: "patient",
        dueDate: "2024-01-15",
        address: "654 Maple Dr, New York, NY",
        password: "password123",
        status: "active",
        createdAt: "2023-05-08T11:20:00Z",
        lastLogin: "2023-05-20T09:30:00Z"
      },
      {
        id: 6,
        firstName: "Michael",
        lastName: "Chen",
        email: "michael@example.com",
        phone: "+1 555-345-6789",
        userType: "healthcare-provider",
        role: "doctor",
        password: "password123",
        status: "active",
        createdAt: "2023-04-20T09:00:00Z",
        lastLogin: "2023-05-20T07:45:00Z"
      },
      {
        id: 7,
        firstName: "Lisa",
        lastName: "Wong",
        email: "lisa@example.com",
        phone: "+1 555-456-7890",
        userType: "healthcare-provider",
        role: "doctor",
        password: "password123",
        status: "active",
        createdAt: "2023-04-18T10:15:00Z",
        lastLogin: "2023-05-19T16:30:00Z"
      },
      {
        id: 8,
        firstName: "Amanda",
        lastName: "Smith",
        email: "amanda@example.com",
        phone: "+1 555-567-8901",
        userType: "healthcare-provider",
        role: "nurse",
        password: "password123",
        status: "active",
        createdAt: "2023-04-15T14:30:00Z",
        lastLogin: "2023-05-20T08:15:00Z"
      }
    ];
    localStorage.setItem('users', JSON.stringify(sampleUsers));
  }

  if (!localStorage.getItem('blogPosts')) {
    const sampleBlogPosts = [
      {
        id: 1,
        title: "Pregnancy Nutrition: What to Eat for a Healthy Baby",
        author: "Dr. Sarah Johnson",
        date: "2023-05-15",
        category: "Nutrition",
        status: "published",
        views: 1245,
        content: "Proper nutrition during pregnancy is essential for the health of both mother and baby. This article covers the key nutrients needed during each trimester."
      },
      {
        id: 2,
        title: "Exercise During Pregnancy: Safe Workouts for Each Trimester",
        author: "Dr. Michael Chen",
        date: "2023-05-10",
        category: "Fitness",
        status: "published",
        views: 987,
        content: "Staying active during pregnancy has numerous benefits. Learn which exercises are safe and recommended for each stage of pregnancy."
      },
      {
        id: 3,
        title: "Understanding Prenatal Vitamins",
        author: "Dr. Lisa Wong",
        date: "2023-05-05",
        category: "Health",
        status: "draft",
        views: 0,
        content: "Prenatal vitamins play a crucial role in filling nutritional gaps. This guide explains what to look for in a prenatal vitamin."
      },
      {
        id: 4,
        title: "Preparing for Labor: What to Expect",
        author: "Nurse Amanda Smith",
        date: "2023-04-28",
        category: "Labor & Delivery",
        status: "published",
        views: 1567,
        content: "A comprehensive guide to the stages of labor, pain management options, and what to pack in your hospital bag."
      }
    ];
    localStorage.setItem('blogPosts', JSON.stringify(sampleBlogPosts));
  }

  if (!localStorage.getItem('faqs')) {
    const sampleFAQs = [
      {
        id: 1,
        question: "When should I schedule my first prenatal visit?",
        answer: "You should schedule your first prenatal visit as soon as you know you're pregnant, typically around 8 weeks.",
        category: "Prenatal Care",
        status: "published"
      },
      {
        id: 2,
        question: "What are the danger signs during pregnancy?",
        answer: "Severe abdominal pain, heavy bleeding, sudden swelling, severe headaches, and decreased fetal movement are all danger signs that require immediate medical attention.",
        category: "Pregnancy Health",
        status: "published"
      },
      {
        id: 3,
        question: "How much weight should I gain during pregnancy?",
        answer: "Weight gain recommendations vary based on your pre-pregnancy BMI. Generally, 25-35 pounds for normal weight women, 15-25 for overweight, and 28-40 for underweight.",
        category: "Nutrition",
        status: "published"
      },
      {
        id: 4,
        question: "Can I travel during pregnancy?",
        answer: "Most women can travel safely until close to their due date, but it's best to avoid long trips after 36 weeks. Always consult with your doctor before traveling.",
        category: "Lifestyle",
        status: "draft"
      }
    ];
    localStorage.setItem('faqs', JSON.stringify(sampleFAQs));
  }

  if (!localStorage.getItem('smsReminders')) {
    const sampleSMSReminders = [
      {
        id: 1,
        patientId: 1,
        patientName: "Maria Rodriguez",
        phone: "+1 555-123-4567",
        message: "Reminder: Your prenatal appointment is tomorrow at 9:30 AM",
        status: "delivered",
        dateSent: new Date().toISOString()
      },
      {
        id: 2,
        patientId: 2,
        patientName: "Jennifer Kim",
        phone: "+1 555-987-6543",
        message: "Reminder: Your ultrasound is scheduled for tomorrow at 10:45 AM",
        status: "delivered",
        dateSent: new Date().toISOString()
      },
      {
        id: 3,
        patientId: 3,
        patientName: "Sarah Thompson",
        phone: "+1 555-456-7890",
        message: "Reminder: Please take your prenatal vitamins today",
        status: "failed",
        dateSent: new Date().toISOString()
      },
      {
        id: 4,
        patientId: 4,
        patientName: "Emily Davis",
        phone: "+1 555-789-0123",
        message: "Reminder: Your postnatal checkup is tomorrow at 3:00 PM",
        status: "scheduled",
        dateSent: new Date(Date.now() + 86400000).toISOString()
      }
    ];
    localStorage.setItem('smsReminders', JSON.stringify(sampleSMSReminders));
  }

  if (!localStorage.getItem('emergencyLogs')) {
    const sampleEmergencyLogs = [
      {
        id: 1,
        patientId: 3,
        patientName: "Sarah Thompson",
        date: new Date().toISOString(),
        type: "Severe Cramping",
        status: "resolved",
        notes: "Patient reported severe cramping at 20 weeks. Recommended immediate evaluation."
      },
      {
        id: 2,
        patientId: 5,
        patientName: "Jessica Wilson",
        date: new Date(Date.now() - 86400000 * 3).toISOString(),
        type: "Decreased Fetal Movement",
        status: "resolved",
        notes: "Patient reported no fetal movement for 12 hours. Recommended kick count monitoring."
      },
      {
        id: 3,
        patientId: 1,
        patientName: "Maria Rodriguez",
        date: new Date(Date.now() - 86400000 * 6).toISOString(),
        type: "Vaginal Bleeding",
        status: "pending",
        notes: "Patient reported light spotting. Scheduled for ultrasound."
      }
    ];
    localStorage.setItem('emergencyLogs', JSON.stringify(sampleEmergencyLogs));
  }

  if (!localStorage.getItem('adminNotifications')) {
    const sampleNotifications = [
      {
        id: 1,
        title: "New Patient Registration",
        message: "Maria Rodriguez has registered as a new patient",
        time: new Date(Date.now() - 600000).toISOString(),
        icon: "user-plus",
        unread: true
      },
      {
        id: 2,
        title: "Appointment Reminder",
        message: "Jennifer Kim has an appointment tomorrow at 9:30 AM",
        time: new Date(Date.now() - 1500000).toISOString(),
        icon: "calendar-check",
        unread: true
      },
      {
        id: 3,
        title: "Emergency Alert",
        message: "High priority emergency case reported by Sarah Thompson",
        time: new Date(Date.now() - 3600000).toISOString(),
        icon: "exclamation-triangle",
        unread: true
      },
      {
        id: 4,
        title: "Lab Results Ready",
        message: "Lab results for Emily Davis are ready for review",
        time: new Date(Date.now() - 7200000).toISOString(),
        icon: "flask",
        unread: false
      },
      {
        id: 5,
        title: "System Update",
        message: "New system update available for installation",
        time: new Date(Date.now() - 18000000).toISOString(),
        icon: "download",
        unread: false
      }
    ];
    localStorage.setItem('adminNotifications', JSON.stringify(sampleNotifications));
  }

  // Only initialize adminAppointments if missing or empty
  if (!localStorage.getItem('adminAppointments') || JSON.parse(localStorage.getItem('adminAppointments') || '[]').length === 0) {
    const sampleAppointments = [
      // You can add a few sample appointments here if desired, or leave as empty array
      // Example:
      // {
      //   id: 1,
      //   patientId: 1,
      //   patientName: "Maria Rodriguez",
      //   doctorId: 2,
      //   doctorName: "Dr. Michael Chen",
      //   date: "2023-07-10",
      //   time: "09:30",
      //   type: "Prenatal Checkup",
      //   status: "scheduled",
      //   notes: "First visit."
      // }
    ];
    localStorage.setItem('adminAppointments', JSON.stringify(sampleAppointments));
  }
};

// Initialize data on first load
initializeSampleData();

// Login Modal Component
const LoginModal = ({ onLogin, onClose }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await onLogin(credentials);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ali-modal-overlay">
      <div className="ali-auth-modal">
        <div className="ali-modal-header">
          <button className="ali-modal-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
          <h2>Admin Login</h2>
        </div>
        <div className="ali-modal-body">
          <form onSubmit={handleSubmit}>
            <div className="ali-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ali-form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="ali-error-message">{error}</div>}
            <button 
              type="submit" 
              className="ali-btn ali-btn-primary"
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner className="ali-spinner" /> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Analytics Page Component
const AnalyticsPage = () => {
  const { data: stats } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchStats,
  });

  const [timeRange, setTimeRange] = useState('monthly');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Generate mock chart data based on time range
    const generateChartData = () => {
      if (timeRange === 'weekly') {
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          patientData: [120, 190, 150, 220],
          appointmentData: [80, 120, 90, 140]
        };
      } else if (timeRange === 'monthly') {
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          patientData: [320, 290, 350, 420, 380, 450],
          appointmentData: [280, 320, 290, 340, 310, 380]
        };
      } else {
        return {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          patientData: [920, 1090, 1150, 1220],
          appointmentData: [780, 920, 890, 1040]
        };
      }
    };

    setChartData(generateChartData());
  }, [timeRange]);

  return (
    <div className="ali-page-content">
      <div className="ali-page-header">
        <h2>Analytics Dashboard</h2>
        <div className="ali-page-subtitle">
          View and analyze key metrics and performance indicators
        </div>
      </div>

      <div className="ali-analytics-tools">
        <div className="ali-filter-group">
          <label>Time Range:</label>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
        <button className="ali-btn ali-btn-primary">
          <FaDownload />
          Export Data
        </button>
      </div>

      <div className="ali-analytics-grid">
        <div className="ali-analytics-card ali-wide">
          <h3>Patient Growth</h3>
          <div className="ali-chart-container">
            {chartData && (
              <div className="ali-chart">
                <div className="ali-chart-legend">
                  <div className="ali-legend-item">
                    <span className="ali-legend-color ali-patient"></span>
                    <span>New Patients</span>
                  </div>
                  <div className="ali-legend-item">
                    <span className="ali-legend-color ali-appointment"></span>
                    <span>Appointments</span>
                  </div>
                </div>
                <div className="ali-chart-bars">
                  {chartData.labels.map((label, index) => (
                    <div key={index} className="ali-chart-bar-group">
                      <div className="ali-chart-label">{label}</div>
                      <div className="ali-chart-bars-container">
                        <div 
                          className="ali-chart-bar ali-patient" 
                          style={{ height: `${chartData.patientData[index] / 20}%` }}
                          title={`${chartData.patientData[index]} patients`}
                        ></div>
                        <div 
                          className="ali-chart-bar ali-appointment" 
                          style={{ height: `${chartData.appointmentData[index] / 20}%` }}
                          title={`${chartData.appointmentData[index]} appointments`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ali-analytics-card">
          <h3>Appointment Types</h3>
          <div className="ali-chart-container">
            <div className="ali-pie-chart">
              <div className="ali-pie-slice" style={{ '--percentage': '40%', '--color': '#4e73df' }}></div>
              <div className="ali-pie-slice" style={{ '--percentage': '25%', '--color': '#1cc88a' }}></div>
              <div className="ali-pie-slice" style={{ '--percentage': '15%', '--color': '#36b9cc' }}></div>
              <div className="ali-pie-slice" style={{ '--percentage': '20%', '--color': '#f6c23e' }}></div>
              <div className="ali-pie-center">
                <div className="ali-pie-total">100%</div>
              </div>
            </div>
            <div className="ali-pie-legend">
              <div className="ali-legend-item">
                <span className="ali-legend-color" style={{ backgroundColor: '#4e73df' }}></span>
                <span>Prenatal (40%)</span>
              </div>
              <div className="ali-legend-item">
                <span className="ali-legend-color" style={{ backgroundColor: '#1cc88a' }}></span>
                <span>Ultrasound (25%)</span>
              </div>
              <div className="ali-legend-item">
                <span className="ali-legend-color" style={{ backgroundColor: '#36b9cc' }}></span>
                <span>Emergency (15%)</span>
              </div>
              <div className="ali-legend-item">
                <span className="ali-legend-color" style={{ backgroundColor: '#f6c23e' }}></span>
                <span>Other (20%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ali-analytics-card">
          <h3>Engagement Metrics</h3>
          <div className="ali-metrics-grid">
            <div className="ali-metric-item">
              <div className="ali-metric-value">{stats?.totalPatients || 0}</div>
              <div className="ali-metric-label">Total Patients</div>
            </div>
            <div className="ali-metric-item">
              <div className="ali-metric-value">{stats?.activePregnancies || 0}</div>
              <div className="ali-metric-label">Active Pregnancies</div>
            </div>
            <div className="ali-metric-item">
              <div className="ali-metric-value">{stats?.todayAppointments || 0}</div>
              <div className="ali-metric-label">Today's Appointments</div>
            </div>
            <div className="ali-metric-item">
              <div className="ali-metric-value">{stats?.emergencyAlerts || 0}</div>
              <div className="ali-metric-label">Emergency Alerts</div>
            </div>
          </div>
        </div>

        <div className="ali-analytics-card ali-wide">
          <h3>Content Performance</h3>
          <div className="ali-content-stats">
            <table>
              <thead>
                <tr>
                  <th>Content Type</th>
                  <th>Published</th>
                  <th>Views</th>
                  <th>Engagement Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Blog Posts</td>
                  <td>12</td>
                  <td>5,432</td>
                  <td>72%</td>
                </tr>
                <tr>
                  <td>FAQs</td>
                  <td>24</td>
                  <td>8,765</td>
                  <td>81%</td>
                </tr>
                <tr>
                  <td>SMS Reminders</td>
                  <td>N/A</td>
                  <td>1,234</td>
                  <td>92%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// User Management Page Component
const UserManagementPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userType: 'expectant-mother',
    role: 'patient',
    password: '',
    dueDate: '',
    address: '',
    status: 'active'
  });
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.filter(user => user.id !== userId);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Add notification
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      const deletedUser = users.find(u => u.id === userId);
      if (deletedUser) {
        notifications.unshift({
          id: Date.now(),
          title: "User Deleted",
          message: `${deletedUser.firstName} ${deletedUser.lastName} (${deletedUser.role}) was removed from the system`,
          time: new Date().toISOString(),
          unread: true,
          icon: 'user-slash'
        });
        localStorage.setItem('adminNotifications', JSON.stringify(notifications));
      }
      
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  const addUserMutation = useMutation({
    mutationFn: (userData) => registerUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setIsAddingUser(false);
      setUserForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        userType: 'expectant-mother',
        role: 'patient',
        password: '',
        dueDate: '',
        address: '',
        status: 'active'
      });
    },
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This will also log them out if they are currently logged in.')) {
      deleteUserMutation.mutate(userId);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    addUserMutation.mutate(userForm);
  };

  const viewUserDashboard = (userId) => {
    navigate(`/user/${userId}`);
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="ali-page-content">
        <div className="ali-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="ali-page-content">
      <div className="ali-page-header">
        <h2>User Management</h2>
        <div className="ali-page-subtitle">
          Manage all system users including patients, doctors, and staff
        </div>
      </div>

      <div className="ali-user-management-tools">
        <div className="ali-search-filter">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch />
        </div>

        <div className="ali-filter-group">
          <label>Role:</label>
          <select value={roleFilter} onChange={handleRoleFilter}>
            <option value="all">All Roles</option>
            <option value="patient">Patients</option>
            <option value="doctor">Doctors</option>
            <option value="nurse">Nurses</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        <div className="ali-filter-group">
          <label>Status:</label>
          <select value={statusFilter} onChange={handleStatusFilter}>
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button 
          className="ali-btn ali-btn-primary"
          onClick={() => setIsAddingUser(true)}
        >
          <FaUserPlus />
          Add New User
        </button>
      </div>

      {isAddingUser && (
        <div className="ali-add-user-form">
          <h3>Add New User</h3>
          <form onSubmit={handleAddUserSubmit}>
            <div className="ali-form-row">
              <div className="ali-form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={userForm.firstName}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="ali-form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={userForm.lastName}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

            <div className="ali-form-row">
              <div className="ali-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userForm.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="ali-form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={userForm.phone}
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <div className="ali-form-row">
              <div className="ali-form-group">
                <label>User Type</label>
                <select
                  name="userType"
                  value={userForm.userType}
                  onChange={handleFormChange}
                >
                  <option value="expectant-mother">Expectant Mother</option>
                  <option value="healthcare-provider">Healthcare Provider</option>
                </select>
              </div>
              <div className="ali-form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={userForm.role}
                  onChange={handleFormChange}
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="ali-form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={userForm.status}
                  onChange={handleFormChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {userForm.userType === 'expectant-mother' && (
              <div className="ali-form-row">
                <div className="ali-form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={userForm.dueDate}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="ali-form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={userForm.address}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            )}

            <div className="ali-form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={userForm.password}
                onChange={handleFormChange}
                required
                minLength="6"
              />
            </div>

            <div className="ali-form-actions">
              <button 
                type="submit" 
                className="ali-btn ali-btn-primary"
                disabled={addUserMutation.isLoading}
              >
                {addUserMutation.isLoading ? <FaSpinner className="ali-spinner" /> : 'Save User'}
              </button>
              <button 
                type="button" 
                className="ali-btn ali-btn-secondary"
                onClick={() => setIsAddingUser(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="ali-user-table-container">
        <table className="ali-user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="ali-user-info">
                    <div className="ali-user-avatar">
                      {user.firstName?.charAt(0) || ''}{user.lastName?.charAt(0) || ''}
                    </div>
                    <div className="ali-user-details">
                      <div className="ali-user-name">{user.firstName} {user.lastName}</div>
                      <div className="ali-user-phone">{user.phone || 'N/A'}</div>
                      <div className="ali-user-role-status">
                        <span className={`ali-role-badge ${user.role || 'unknown'}`}>{user.role || 'N/A'}</span>
                        <span className={`ali-status-badge ${user.status || 'unknown'}`}>{user.status || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`ali-role-badge ${user.role || 'unknown'}`}>{user.role || 'N/A'}</span>
                </td>
                <td>
                  <span className={`ali-status-badge ${user.status || 'unknown'}`}>{user.status || 'N/A'}</span>
                </td>
                <td>
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                </td>
                <td>
                  <div className="ali-action-buttons">
                    <button 
                      className="ali-btn ali-btn-icon" 
                      title="View Dashboard"
                      onClick={() => viewUserDashboard(user.id)}
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="ali-btn ali-btn-icon ali-danger" 
                      title="Delete"
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={deleteUserMutation.isLoading}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers?.length === 0 && (
          <div className="ali-no-results">
            <FaUserSlash />
            <p>No users found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Appointments Page Component
const AppointmentsPage = () => {
  const queryClient = useQueryClient();
  const [dateFilter, setDateFilter] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: 'Prenatal Checkup',
    notes: ''
  });
  
  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: (appointmentId) => {
      const appointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');
      const updatedAppointments = appointments.filter(a => a.id !== appointmentId);
      localStorage.setItem('adminAppointments', JSON.stringify(updatedAppointments));
      // Add notification for deletion
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      notifications.unshift({
        id: Date.now(),
        title: 'Appointment Deleted',
        message: 'An appointment was deleted by admin.',
        time: new Date().toISOString(),
        unread: true,
        icon: 'calendar-times'
      });
      localStorage.setItem('adminNotifications', JSON.stringify(notifications));
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
    },
  });

  const addAppointmentMutation = useMutation({
    mutationFn: (appointmentData) => {
      const appointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');
      const newAppointment = {
        id: Date.now(),
        ...appointmentData,
        status: 'scheduled',
        patientName: users?.find(u => u.id.toString() === appointmentData.patientId)?.firstName + ' ' + 
                    users?.find(u => u.id.toString() === appointmentData.patientId)?.lastName,
        doctorName: users?.find(u => u.id.toString() === appointmentData.doctorId)?.firstName + ' ' + 
                   users?.find(u => u.id.toString() === appointmentData.doctorId)?.lastName
      };
      appointments.push(newAppointment);
      localStorage.setItem('adminAppointments', JSON.stringify(appointments));
      // Add notification for new appointment
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      notifications.unshift({
        id: Date.now(),
        title: 'New Appointment Booked',
        message: `Appointment booked for ${newAppointment.patientName} with ${newAppointment.doctorName} on ${newAppointment.date} at ${newAppointment.time}`,
        time: new Date().toISOString(),
        unread: true,
        icon: 'calendar-plus'
      });
      localStorage.setItem('adminNotifications', JSON.stringify(notifications));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      setIsAddingAppointment(false);
      setAppointmentForm({
        patientId: '',
        doctorId: '',
        date: '',
        time: '',
        type: 'Prenatal Checkup',
        notes: ''
      });
    },
  });

  const updateAppointmentMutation = useMutation({
    mutationFn: ({ id, status }) => {
      const appointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');
      const updatedAppointments = appointments.map(a => 
        a.id === id ? { ...a, status } : a
      );
      localStorage.setItem('adminAppointments', JSON.stringify(updatedAppointments));
      
      // Add notification
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      const appointment = appointments.find(a => a.id === id);
      if (appointment) {
        notifications.unshift({
          id: Date.now(),
          title: `Appointment ${status === 'confirmed' ? 'Confirmed' : status === 'cancelled' ? 'Cancelled' : 'Completed'}`,
          message: `Appointment for ${appointment.patientName} on ${appointment.date} has been ${status}`,
          time: new Date().toISOString(),
          unread: true,
          icon: status === 'confirmed' ? 'calendar-check' : status === 'cancelled' ? 'calendar-times' : 'calendar-alt'
        });
        localStorage.setItem('adminNotifications', JSON.stringify(notifications));
      }
      
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
    },
  });

  const handleDateFilter = (e) => {
    setDateFilter(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDoctorFilter = (e) => {
    setDoctorFilter(e.target.value);
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointmentMutation.mutate(appointmentId);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAppointmentSubmit = (e) => {
    e.preventDefault();
    addAppointmentMutation.mutate(appointmentForm);
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    updateAppointmentMutation.mutate({ id: appointmentId, status: newStatus });
  };

  const filteredAppointments = appointments?.filter(appointment => {
    const today = new Date().toISOString().split('T')[0];
    const matchesDate = dateFilter === 'all' || 
                      (dateFilter === 'today' && appointment.date === today) ||
                      (dateFilter === 'upcoming' && appointment.date >= today);
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesDoctor = doctorFilter === 'all' || appointment.doctorId.toString() === doctorFilter;
    
    return matchesDate && matchesStatus && matchesDoctor;
  });

  if (isLoading) {
    return (
      <div className="ali-page-content">
        <div className="ali-loading-spinner"></div>
      </div>
    );
  }

  const doctors = users?.filter(user => user.role === 'doctor');
  const patients = users?.filter(user => user.role === 'patient');

  return (
    <div className="ali-page-content">
      <div className="ali-page-header">
        <h2>Appointment Management</h2>
        <div className="ali-page-subtitle">
          View and manage all patient appointments
        </div>
      </div>

      <div className="ali-appointment-management-tools">
        <div className="ali-filter-group">
          <label>Date:</label>
          <select value={dateFilter} onChange={handleDateFilter}>
            <option value="today">Today</option>
            <option value="upcoming">Upcoming</option>
            <option value="all">All Dates</option>
          </select>
        </div>

        <div className="ali-filter-group">
          <label>Status:</label>
          <select value={statusFilter} onChange={handleStatusFilter}>
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="ali-filter-group">
          <label>Doctor:</label>
          <select value={doctorFilter} onChange={handleDoctorFilter}>
            <option value="all">All Doctors</option>
            {doctors?.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.firstName} {doctor.lastName}</option>
            ))}
          </select>
        </div>

        <button 
          className="ali-btn ali-btn-primary"
          onClick={() => setIsAddingAppointment(true)}
        >
          <FaCalendarPlus />
          New Appointment
        </button>
      </div>

      {isAddingAppointment && (
        <div className="ali-add-appointment-form">
          <h3>Schedule New Appointment</h3>
          <form onSubmit={handleAddAppointmentSubmit}>
            <div className="ali-form-row">
              <div className="ali-form-group">
                <label>Patient</label>
                <select
                  name="patientId"
                  value={appointmentForm.patientId}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select Patient</option>
                  {patients?.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ali-form-group">
                <label>Doctor</label>
                <select
                  name="doctorId"
                  value={appointmentForm.doctorId}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors?.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="ali-form-row">
              <div className="ali-form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={appointmentForm.date}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="ali-form-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={appointmentForm.time}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="ali-form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={appointmentForm.type}
                  onChange={handleFormChange}
                >
                  <option value="Prenatal Checkup">Prenatal Checkup</option>
                  <option value="Ultrasound">Ultrasound</option>
                  <option value="Emergency Consultation">Emergency Consultation</option>
                  <option value="Postnatal Checkup">Postnatal Checkup</option>
                  <option value="Routine Checkup">Routine Checkup</option>
                </select>
              </div>
            </div>
            <div className="ali-form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={appointmentForm.notes}
                onChange={handleFormChange}
              />
            </div>
            <div className="ali-form-actions">
              <button 
                type="submit" 
                className="ali-btn ali-btn-primary"
                disabled={addAppointmentMutation.isLoading}
              >
                {addAppointmentMutation.isLoading ? <FaSpinner className="ali-spinner" /> : 'Save Appointment'}
              </button>
              <button 
                type="button" 
                className="ali-btn ali-btn-secondary"
                onClick={() => setIsAddingAppointment(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="ali-appointment-table-container">
        <table className="ali-appointment-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date & Time</th>
              <th>Type</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments?.map(appointment => (
              <tr key={appointment.id}>
                <td>
                  <div className="ali-patient-info">
                    <div className="ali-patient-avatar">
                      {appointment.patientName.split(' ').map(n => n.charAt(0)).join('')}
                    </div>
                    <div className="ali-patient-details">
                      <div className="ali-patient-name">{appointment.patientName}</div>
                      <div className="ali-patient-id">ID: {appointment.patientId}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="ali-appointment-time">
                    <div className="ali-appointment-date">{appointment.date}</div>
                    <div className="ali-appointment-hour">{appointment.time}</div>
                  </div>
                </td>
                <td>{appointment.type}</td>
                <td>{appointment.doctorName}</td>
                <td>
                  <select
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                    className={`ali-status-select ${appointment.status}`}
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <div className="ali-action-buttons">
                    <button 
                      className="ali-btn ali-btn-icon" 
                      title="View"
                      onClick={() => console.log('View appointment', appointment.id)}
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="ali-btn ali-btn-icon ali-danger" 
                      title="Delete"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      disabled={deleteAppointmentMutation.isLoading}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAppointments?.length === 0 && (
          <div className="ali-no-results">
            <FaCalendarTimes />
            <p>No appointments found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Blog Page Component
const BlogPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [postForm, setPostForm] = useState({
    title: '',
    author: 'Dr. Sarah Johnson',
    category: 'Nutrition',
    status: 'draft',
    content: ''
  });
  
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: fetchBlogPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId) => {
      const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
      const updatedPosts = posts.filter(p => p.id !== postId);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      
      // Add notification
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      const deletedPost = posts.find(p => p.id === postId);
      if (deletedPost) {
        notifications.unshift({
          id: Date.now(),
          title: "Blog Post Deleted",
          message: `Post "${deletedPost.title}" was removed`,
          time: new Date().toISOString(),
          unread: true,
          icon: 'trash'
        });
        localStorage.setItem('adminNotifications', JSON.stringify(notifications));
      }
      
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['blog']);
    },
  });

  const addPostMutation = useMutation({
    mutationFn: (postData) => {
      const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
      const newPost = {
        id: Date.now(),
        ...postData,
        date: new Date().toISOString().split('T')[0],
        views: 0
      };
      posts.push(newPost);
      localStorage.setItem('blogPosts', JSON.stringify(posts));
      
      // Add notification
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      notifications.unshift({
        id: Date.now(),
        title: "New Blog Post",
        message: `Post "${newPost.title}" was created`,
        time: new Date().toISOString(),
        unread: true,
        icon: 'newspaper'
      });
      localStorage.setItem('adminNotifications', JSON.stringify(notifications));
      
      return Promise.resolve(newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['blog']);
      setIsAddingPost(false);
      setPostForm({
        title: '',
        author: 'Dr. Sarah Johnson',
        category: 'Nutrition',
        status: 'draft',
        content: ''
      });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, postData }) => {
      const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
      const updatedPosts = posts.map(p => 
        p.id === id ? { ...p, ...postData } : p
      );
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      
      // Add notification
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      const updatedPost = posts.find(p => p.id === id);
      if (updatedPost) {
        notifications.unshift({
          id: Date.now(),
          title: "Blog Post Updated",
          message: `Post "${updatedPost.title}" was modified`,
          time: new Date().toISOString(),
          unread: true,
          icon: 'edit'
        });
        localStorage.setItem('adminNotifications', JSON.stringify(notifications));
      }
      
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['blog']);
    },
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(postId);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPostForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPostSubmit = (e) => {
    e.preventDefault();
    addPostMutation.mutate(postForm);
  };

  const filteredPosts = posts?.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="ali-page-content">
        <div className="ali-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="ali-page-content">
      <div className="ali-page-header">
        <h2>Blog Management</h2>
        <div className="ali-page-subtitle">
          Create and manage blog posts for patients
        </div>
      </div>

      <div className="ali-blog-tools">
        <div className="ali-search-filter">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch />
        </div>

        <div className="ali-filter-group">
          <label>Category:</label>
          <select value={categoryFilter} onChange={handleCategoryFilter}>
            <option value="all">All Categories</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Fitness">Fitness</option>
            <option value="Health">Health</option>
            <option value="Labor & Delivery">Labor & Delivery</option>
          </select>
        </div>

        <div className="ali-filter-group">
          <label>Status:</label>
          <select value={statusFilter} onChange={handleStatusFilter}>
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <button 
          className="ali-btn ali-btn-primary"
          onClick={() => setIsAddingPost(true)}
        >
          <FaPlus />
          New Post
        </button>
      </div>

      {isAddingPost && (
        <div className="ali-add-post-form">
          <h3>Create New Blog Post</h3>
          <form onSubmit={handleAddPostSubmit}>
            <div className="ali-form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={postForm.title}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="ali-form-row">
              <div className="ali-form-group">
                <label>Author</label>
                <select
                  name="author"
                  value={postForm.author}
                  onChange={handleFormChange}
                >
                  <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                  <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                  <option value="Dr. Lisa Wong">Dr. Lisa Wong</option>
                  <option value="Nurse Amanda Smith">Nurse Amanda Smith</option>
                </select>
              </div>
              <div className="ali-form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={postForm.category}
                  onChange={handleFormChange}
                >
                  <option value="Nutrition">Nutrition</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Health">Health</option>
                  <option value="Labor & Delivery">Labor & Delivery</option>
                </select>
              </div>
              <div className="ali-form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={postForm.status}
                  onChange={handleFormChange}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="ali-form-group">
              <label>Content</label>
              <textarea
                name="content"
                value={postForm.content}
                onChange={handleFormChange}
                rows="10"
                required
              />
            </div>
            <div className="ali-form-actions">
              <button 
                type="submit" 
                className="ali-btn ali-btn-primary"
                disabled={addPostMutation.isLoading}
              >
                {addPostMutation.isLoading ? <FaSpinner className="ali-spinner" /> : 'Save Post'}
              </button>
              <button 
                type="button" 
                className="ali-btn ali-btn-secondary"
                onClick={() => setIsAddingPost(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="ali-blog-table-container">
        <table className="ali-blog-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Category</th>
              <th>Status</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts?.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td>
                  <span className={`ali-category-badge ${post.category.toLowerCase().replace(' & ', '-')}`}>
                    {post.category}
                  </span>
                </td>
                <td>
                  <span className={`ali-status-badge ${post.status}`}>
                    {post.status}
                  </span>
                </td>
                <td>{post.views}</td>
                <td>
                  <div className="ali-action-buttons">
                    <button 
                      className="ali-btn ali-btn-icon" 
                      title="Edit"
                      onClick={() => {
                        setPostForm({
                          title: post.title,
                          author: post.author,
                          category: post.category,
                          status: post.status,
                          content: post.content
                        });
                        setIsAddingPost(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="ali-btn ali-btn-icon ali-danger" 
                      title="Delete"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// FAQs Page Component
const FAQsPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddingFAQ, setIsAddingFAQ] = useState(false);
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: 'Prenatal Care',
    status: 'draft'
  });
  
  const { data: faqs, isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: fetchFAQs,
  });

  const deleteFAQMutation = useMutation({
    mutationFn: (faqId) => {
      const faqs = JSON.parse(localStorage.getItem('faqs') || '[]');
      const updatedFAQs = faqs.filter(f => f.id !== faqId);
      localStorage.setItem('faqs', JSON.stringify(updatedFAQs));
      
      // Add notification
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      const deletedFAQ = faqs.find(f => f.id === faqId);
      if (deletedFAQ) {
        notifications.unshift({
          id: Date.now(),
          title: "FAQ Deleted",
          message: `Question "${deletedFAQ.question}" was removed`,
          time: new Date().toISOString(),
          unread: true,
          icon: 'trash'
        });
        localStorage.setItem('adminNotifications', JSON.stringify(notifications));
      }
      
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']);
    },
  });

  const addFAQMutation = useMutation({
    mutationFn: (faqData) => {
      const faqs = JSON.parse(localStorage.getItem('faqs') || '[]');
      const newFAQ = {
        id: Date.now(),
        ...faqData
      };
      faqs.push(newFAQ);
      localStorage.setItem('faqs', JSON.stringify(faqs));
      
      // Add notification
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      notifications.unshift({
        id: Date.now(),
        title: "New FAQ Added",
        message: `Question "${newFAQ.question}" was added`,
        time: new Date().toISOString(),
        unread: true,
        icon: 'question-circle'
      });
      localStorage.setItem('adminNotifications', JSON.stringify(notifications));
      
      return Promise.resolve(newFAQ);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']);
      setIsAddingFAQ(false);
      setFaqForm({
        question: '',
        answer: '',
        category: 'Prenatal Care',
        status: 'draft'
      });
    },
  });

  const updateFAQMutation = useMutation({
    mutationFn: ({ id, faqData }) => {
      const faqs = JSON.parse(localStorage.getItem('faqs') || '[]');
      const updatedFAQs = faqs.map(f => 
        f.id === id ? { ...f, ...faqData } : f
      );
      localStorage.setItem('faqs', JSON.stringify(updatedFAQs));
      
      // Add notification
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      const updatedFAQ = faqs.find(f => f.id === id);
      if (updatedFAQ) {
        notifications.unshift({
          id: Date.now(),
          title: "FAQ Updated",
          message: `Question "${updatedFAQ.question}" was modified`,
          time: new Date().toISOString(),
          unread: true,
          icon: 'edit'
        });
        localStorage.setItem('adminNotifications', JSON.stringify(notifications));
      }
      
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']);
    },
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDeleteFAQ = (faqId) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      deleteFAQMutation.mutate(faqId);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFaqForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFAQSubmit = (e) => {
    e.preventDefault();
    addFAQMutation.mutate(faqForm);
  };

  const filteredFAQs = faqs?.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || faq.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || faq.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="ali-page-content">
        <div className="ali-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="ali-page-content">
      <div className="ali-page-header">
        <h2>FAQ Management</h2>
        <div className="ali-page-subtitle">
          Manage frequently asked questions for patients
        </div>
      </div>

      <div className="ali-faq-tools">
        <div className="ali-search-filter">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch />
        </div>

        <div className="ali-filter-group">
          <label>Category:</label>
          <select value={categoryFilter} onChange={handleCategoryFilter}>
            <option value="all">All Categories</option>
            <option value="Prenatal Care">Prenatal Care</option>
            <option value="Pregnancy Health">Pregnancy Health</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        <div className="ali-filter-group">
          <label>Status:</label>
          <select value={statusFilter} onChange={handleStatusFilter}>
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <button 
          className="ali-btn ali-btn-primary"
          onClick={() => setIsAddingFAQ(true)}
        >
          <FaPlus />
          New FAQ
        </button>
      </div>

      {isAddingFAQ && (
        <div className="ali-add-faq-form">
          <h3>Add New FAQ</h3>
          <form onSubmit={handleAddFAQSubmit}>
            <div className="ali-form-group">
              <label>Question</label>
              <input
                type="text"
                name="question"
                value={faqForm.question}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="ali-form-group">
              <label>Answer</label>
              <textarea
                name="answer"
                value={faqForm.answer}
                onChange={handleFormChange}
                rows="5"
                required
              />
            </div>
            <div className="ali-form-row">
              <div className="ali-form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={faqForm.category}
                  onChange={handleFormChange}
                >
                  <option value="Prenatal Care">Prenatal Care</option>
                  <option value="Pregnancy Health">Pregnancy Health</option>
                  <option value="Nutrition">Nutrition</option>
                  <option value="Lifestyle">Lifestyle</option>
                </select>
              </div>
              <div className="ali-form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={faqForm.status}
                  onChange={handleFormChange}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="ali-form-actions">
              <button 
                type="submit" 
                className="ali-btn ali-btn-primary"
                disabled={addFAQMutation.isLoading}
              >
                {addFAQMutation.isLoading ? <FaSpinner className="ali-spinner" /> : 'Save FAQ'}
              </button>
              <button 
                type="button" 
                className="ali-btn ali-btn-secondary"
                onClick={() => setIsAddingFAQ(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="ali-faq-list">
        {filteredFAQs?.map(faq => (
          <div className="ali-faq-item" key={faq.id}>
            <div className="ali-faq-question">
              <h4>{faq.question}</h4>
              <div className="ali-faq-meta">
                <span className={`ali-category-tag ${faq.category.toLowerCase().replace(' ', '-')}`}>
                  {faq.category}
                </span>
                <span className={`ali-status-tag ${faq.status}`}>
                  {faq.status}
                </span>
              </div>
            </div>
            <div className="ali-faq-answer">
              <p>{faq.answer}</p>
            </div>
            <div className="ali-faq-actions">
              <button 
                className="ali-btn ali-btn-icon"
                onClick={() => {
                  setFaqForm({
                    question: faq.question,
                    answer: faq.answer,
                    category: faq.category,
                    status: faq.status
                  });
                  setIsAddingFAQ(true);
                }}
              >
                <FaEdit />
              </button>
              <button 
                className="ali-btn ali-btn-icon ali-danger"
                onClick={() => handleDeleteFAQ(faq.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// SMS Reminders Page Component
const SMSRemindersPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isSendingReminder, setIsSendingReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({
    patientId: '',
    message: '',
    sendDate: '',
    sendTime: ''
  });
  
  const { data: reminders, isLoading } = useQuery({
    queryKey: ['sms-reminders'],
    queryFn: fetchSMSReminders,
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const deleteReminderMutation = useMutation({
    mutationFn: (reminderId) => {
      const reminders = JSON.parse(localStorage.getItem('smsReminders') || '[]');
      const updatedReminders = reminders.filter(r => r.id !== reminderId);
      localStorage.setItem('smsReminders', JSON.stringify(updatedReminders));
      
      // Add notification
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      const deletedReminder = reminders.find(r => r.id === reminderId);
      if (deletedReminder) {
        notifications.unshift({
          id: Date.now(),
          title: "SMS Reminder Deleted",
          message: `Reminder for ${deletedReminder.patientName} was removed`,
          time: new Date().toISOString(),
          unread: true,
          icon: 'trash'
        });
        localStorage.setItem('adminNotifications', JSON.stringify(notifications));
      }
      
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sms-reminders']);
    },
  });

  const sendReminderMutation = useMutation({
    mutationFn: (reminderData) => {
      const reminders = JSON.parse(localStorage.getItem('smsReminders') || '[]');
      const patient = users?.find(u => u.id.toString() === reminderData.patientId);
      const newReminder = {
        id: Date.now(),
        patientId: reminderData.patientId,
        patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown',
        phone: patient?.phone || '',
        message: reminderData.message,
        status: 'scheduled',
        dateSent: `${reminderData.sendDate}T${reminderData.sendTime}:00Z`
      };
      reminders.push(newReminder);
      localStorage.setItem('smsReminders', JSON.stringify(reminders));
      
      // Add notification
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      notifications.unshift({
        id: Date.now(),
        title: "SMS Reminder Scheduled",
        message: `Reminder sent to ${newReminder.patientName}: ${newReminder.message}`,
        time: new Date().toISOString(),
        unread: true,
        icon: 'bell'
      });
      localStorage.setItem('adminNotifications', JSON.stringify(notifications));
      
      return Promise.resolve(newReminder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sms-reminders']);
      setIsSendingReminder(false);
      setNewReminder({
        patientId: '',
        message: '',
        sendDate: '',
        sendTime: ''
      });
    },
  });

  const resendReminderMutation = useMutation({
    mutationFn: (reminderId) => {
      const reminders = JSON.parse(localStorage.getItem('smsReminders') || '[]');
      const reminder = reminders.find(r => r.id === reminderId);
      if (reminder) {
        reminder.status = 'delivered';
        reminder.dateSent = new Date().toISOString();
        localStorage.setItem('smsReminders', JSON.stringify(reminders));
        
        // Add notification
        const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
        notifications.unshift({
          id: Date.now(),
          title: "SMS Reminder Resent",
          message: `Reminder resent to ${reminder.patientName}: ${reminder.message}`,
          time: new Date().toISOString(),
          unread: true,
          icon: 'redo'
        });
        localStorage.setItem('adminNotifications', JSON.stringify(notifications));
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sms-reminders']);
    },
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDeleteReminder = (reminderId) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      deleteReminderMutation.mutate(reminderId);
    }
  };

  const handleResendReminder = (reminderId) => {
    if (window.confirm('Resend this SMS reminder?')) {
      resendReminderMutation.mutate(reminderId);
    }
  };

  const handleNewReminderChange = (e) => {
    const { name, value } = e.target;
    setNewReminder(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendReminderSubmit = (e) => {
    e.preventDefault();
    sendReminderMutation.mutate(newReminder);
  };

  const filteredReminders = reminders?.filter(reminder => {
    const matchesSearch = reminder.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         reminder.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reminder.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="ali-page-content">
        <div className="ali-loading-spinner"></div>
      </div>
    );
  }

  const patients = users?.filter(user => user.role === 'patient');

  return (
    <div className="ali-page-content">
      <div className="ali-page-header">
        <h2>SMS Reminders</h2>
        <div className="ali-page-subtitle">
          Manage automated SMS reminders for patients
        </div>
      </div>

      <div className="ali-reminder-tools">
        <div className="ali-search-filter">
          <input
            type="text"
            placeholder="Search reminders..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch />
        </div>

        <div className="ali-filter-group">
          <label>Status:</label>
          <select value={statusFilter} onChange={handleStatusFilter}>
            <option value="all">All Statuses</option>
            <option value="delivered">Delivered</option>
            <option value="scheduled">Scheduled</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <button 
          className="ali-btn ali-btn-primary"
          onClick={() => setIsSendingReminder(true)}
        >
          <FaPlus />
          New Reminder
        </button>
      </div>

      {isSendingReminder && (
        <div className="ali-send-reminder-form">
          <h3>Send New SMS Reminder</h3>
          <form onSubmit={handleSendReminderSubmit}>
            <div className="ali-form-group">
              <label>Patient</label>
              <select
                name="patientId"
                value={newReminder.patientId}
                onChange={handleNewReminderChange}
                required
              >
                <option value="">Select Patient</option>
                {patients?.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.lastName} ({patient.phone})
                  </option>
                ))}
              </select>
            </div>
            <div className="ali-form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={newReminder.message}
                onChange={handleNewReminderChange}
                rows="3"
                required
              />
            </div>
            <div className="ali-form-row">
              <div className="ali-form-group">
                <label>Send Date</label>
                <input
                  type="date"
                  name="sendDate"
                  value={newReminder.sendDate}
                  onChange={handleNewReminderChange}
                  required
                />
              </div>
              <div className="ali-form-group">
                <label>Send Time</label>
                <input
                  type="time"
                  name="sendTime"
                  value={newReminder.sendTime}
                  onChange={handleNewReminderChange}
                  required
                />
              </div>
            </div>
            <div className="ali-form-actions">
              <button 
                type="submit" 
                className="ali-btn ali-btn-primary"
                disabled={sendReminderMutation.isLoading}
              >
                {sendReminderMutation.isLoading ? <FaSpinner className="ali-spinner" /> : 'Send Reminder'}
              </button>
              <button 
                type="button" 
                className="ali-btn ali-btn-secondary"
                onClick={() => setIsSendingReminder(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="ali-reminder-table-container">
        <table className="ali-reminder-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Status</th>
              <th>Date Sent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReminders?.map(reminder => (
              <tr key={reminder.id}>
                <td>{reminder.patientName}</td>
                <td>{reminder.phone}</td>
                <td className="ali-message-content">
                  <div className="ali-message-preview">{reminder.message}</div>
                </td>
                <td>
                  <span className={`ali-status-badge ${reminder.status}`}>
                    {reminder.status}
                  </span>
                </td>
                <td>
                  {new Date(reminder.dateSent).toLocaleString()}
                </td>
                <td>
                  <div className="ali-action-buttons">
                    <button 
                      className="ali-btn ali-btn-icon" 
                      title="Resend"
                      onClick={() => handleResendReminder(reminder.id)}
                      disabled={reminder.status !== 'failed' || resendReminderMutation.isLoading}
                    >
                      <FaRedo />
                    </button>
                    <button 
                      className="ali-btn ali-btn-icon ali-danger" 
                      title="Delete"
                      onClick={() => handleDeleteReminder(reminder.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Emergency Logs Page Component
const EmergencyLogsPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const { data: logs, isLoading } = useQuery({
    queryKey: ['emergency-logs'],
    queryFn: fetchEmergencyLogs,
  });

  const updateEmergencyStatusMutation = useMutation({
    mutationFn: ({ id, status }) => {
      const logs = JSON.parse(localStorage.getItem('emergencyLogs') || '[]');
      const updatedLogs = logs.map(log => 
        log.id === id ? { ...log, status } : log
      );
      localStorage.setItem('emergencyLogs', JSON.stringify(updatedLogs));
      
      // Add notification if resolved
      if (status === 'resolved') {
        const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
        const logEntry = logs.find(l => l.id === id);
        if (logEntry) {
          notifications.unshift({
            id: Date.now(),
            title: "Emergency Resolved",
            message: `Emergency case for ${logEntry.patientName} (${logEntry.type}) has been resolved`,
            time: new Date().toISOString(),
            unread: true,
            icon: 'check'
          });
          localStorage.setItem('adminNotifications', JSON.stringify(notifications));
        }
      }
      
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['emergency-logs']);
    },
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleStatusChange = (logId, newStatus) => {
    updateEmergencyStatusMutation.mutate({ id: logId, status: newStatus });
  };

  const filteredLogs = logs?.filter(log => {
    const matchesSearch = log.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesType = typeFilter === 'all' || log.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  if (isLoading) {
    return (
      <div className="ali-page-content">
        <div className="ali-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="ali-page-content">
      <div className="ali-page-header">
        <h2>Emergency Logs</h2>
        <div className="ali-page-subtitle">
          Review and manage emergency cases
        </div>
      </div>

      <div className="ali-emergency-tools">
        <div className="ali-search-filter">
          <input
            type="text"
            placeholder="Search emergency logs..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch />
        </div>

        <div className="ali-filter-group">
          <label>Status:</label>
          <select value={statusFilter} onChange={handleStatusFilter}>
            <option value="all">All Statuses</option>
            <option value="resolved">Resolved</option>
            <option value="pending">Pending</option>
            <option value="escalated">Escalated</option>
          </select>
        </div>

        <div className="ali-filter-group">
          <label>Type:</label>
          <select value={typeFilter} onChange={handleTypeFilter}>
            <option value="all">All Types</option>
            <option value="Severe Cramping">Severe Cramping</option>
            <option value="Vaginal Bleeding">Vaginal Bleeding</option>
            <option value="Decreased Fetal Movement">Decreased Fetal Movement</option>
          </select>
        </div>
      </div>

      <div className="ali-emergency-logs">
        {filteredLogs?.map(log => (
          <div className={`ali-emergency-card ${log.status}`} key={log.id}>
            <div className="ali-emergency-header">
              <h3>{log.patientName}</h3>
              <div className="ali-emergency-meta">
                <span className="ali-emergency-date">
                  {new Date(log.date).toLocaleString()}
                </span>
                <div className="ali-status-select">
                  <select
                    value={log.status}
                    onChange={(e) => handleStatusChange(log.id, e.target.value)}
                    disabled={updateEmergencyStatusMutation.isLoading}
                  >
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                    <option value="escalated">Escalated</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="ali-emergency-type">
              <FaExclamationTriangle />
              <span>{log.type}</span>
            </div>
            <div className="ali-emergency-notes">
              <p>{log.notes}</p>
            </div>
            <div className="ali-emergency-actions">
              <button className="ali-btn ali-btn-icon">
                <FaEdit />
              </button>
              <button className="ali-btn ali-btn-icon">
                <FaFileMedical />
              </button>
              <button className="ali-btn ali-btn-icon ali-danger">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Settings Page Component
const SettingsPage = () => {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
  });

  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const updateSettingsMutation = useMutation({
    mutationFn: (settingsData) => {
      localStorage.setItem('settings', JSON.stringify(settingsData));
      
      // Add notification
      const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      notifications.unshift({
        id: Date.now(),
        title: "Settings Updated",
        message: "System settings have been modified",
        time: new Date().toISOString(),
        unread: true,
        icon: 'cog'
      });
      localStorage.setItem('adminNotifications', JSON.stringify(notifications));
      
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
      setIsEditing(false);
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettingsMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="ali-page-content">
        <div className="ali-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="ali-page-content">
      <div className="ali-page-header">
        <h2>System Settings</h2>
        <div className="ali-page-subtitle">
          Configure system preferences and options
        </div>
      </div>

      <div className="ali-settings-container">
        <form onSubmit={handleSubmit}>
          <div className="ali-settings-section">
            <h3>Clinic Information</h3>
            <div className="ali-form-group">
              <label>Clinic Name</label>
              <input
                type="text"
                name="clinicName"
                value={formData.clinicName || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="ali-form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="ali-form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="ali-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="ali-form-group">
              <label>Working Hours</label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="ali-settings-section">
            <h3>Notification Settings</h3>
            <div className="ali-form-group ali-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={formData.smsNotifications || false}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                Enable SMS Notifications
              </label>
            </div>
            <div className="ali-form-group ali-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications || false}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                Enable Email Notifications
              </label>
            </div>
            <div className="ali-form-group">
              <label>Appointment Reminder (hours before)</label>
              <input
                type="number"
                name="appointmentReminderHours"
                value={formData.appointmentReminderHours || 24}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="ali-form-group">
              <label>Emergency Contact</label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="ali-settings-actions">
            {!isEditing ? (
              <button 
                type="button" 
                className="ali-btn ali-btn-primary"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit />
                Edit Settings
              </button>
            ) : (
              <>
                <button 
                  type="submit" 
                  className="ali-btn ali-btn-primary"
                  disabled={updateSettingsMutation.isLoading}
                >
                  <FaSave />
                  {updateSettingsMutation.isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  type="button" 
                  className="ali-btn ali-btn-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(settings);
                  }}
                  disabled={updateSettingsMutation.isLoading}
                >
                  <FaTimes />
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// Dashboard Home Component
const DashboardHome = () => {
  const { data: stats } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchStats,
    refetchInterval: 30000,
  });

  const generateReport = () => {
    console.log('Generating comprehensive report...');
    alert('Report generation started. You will receive a notification when it is ready.');
  };

  const quickActions = [
    {
      icon: <FaUserPlus />,
      title: "Add New Patient",
      description: "Register a new patient",
      action: () => console.log('Navigate to add patient')
    },
    {
      icon: <FaCalendarPlus />,
      title: "Schedule Appointment",
      description: "Book a new appointment",
      action: () => console.log('Navigate to schedule appointment')
    },
    {
      icon: <FaExclamationTriangle />,
      title: "Emergency Protocol",
      description: "Handle emergency cases",
      action: () => console.log('Navigate to emergency protocol')
    },
    {
      icon: <FaChartLine />,
      title: "View Reports",
      description: "Generate analytics",
      action: () => console.log('Navigate to analytics')
    }
  ];

  return (
    <div className="ali-page-content">
      <div className="ali-page-header">
        <div>
          <h2>Dashboard Overview</h2>
          <div className="ali-page-subtitle">
            Welcome back! Here's what's happening with your patients today.
          </div>
        </div>
        <button className="ali-btn ali-btn-primary" onClick={generateReport}>
          <FaDownload />
          Generate Report
        </button>
      </div>

      <div className="ali-stats-cards">
        <div className="ali-stat-card">
          <div className="ali-stat-card-header">
            <h3>Total Patients</h3>
            <div className="ali-stat-card-icon ali-primary">
              <FaUsers />
            </div>
          </div>
          <div className="ali-value">{stats?.totalPatients.toLocaleString() || 0}</div>
          <div className="ali-change ali-positive">
            <FaArrowUp />
            <span>+12.5%</span> from last month
          </div>
        </div>
        <div className="ali-stat-card">
          <div className="ali-stat-card-header">
            <h3>Active Pregnancies</h3>
            <div className="ali-stat-card-icon ali-success">
              <FaBaby />
            </div>
          </div>
          <div className="ali-value">{stats?.activePregnancies.toLocaleString() || 0}</div>
          <div className="ali-change ali-positive">
            <FaArrowUp />
            <span>+8.3%</span> from last month
          </div>
        </div>
        <div className="ali-stat-card">
          <div className="ali-stat-card-header">
            <h3>Today's Appointments</h3>
            <div className="ali-stat-card-icon ali-warning">
              <FaCalendarCheck />
            </div>
          </div>
          <div className="ali-value">{stats?.todayAppointments.toLocaleString() || 0}</div>
          <div className="ali-change ali-negative">
            <FaArrowDown />
            <span>-3.1%</span> from last month
          </div>
        </div>
        <div className="ali-stat-card">
          <div className="ali-stat-card-header">
            <h3>Emergency Alerts</h3>
            <div className="ali-stat-card-icon ali-info">
              <FaExclamationTriangle />
            </div>
          </div>
          <div className="ali-value">{stats?.emergencyAlerts.toLocaleString() || 0}</div>
          <div className="ali-change ali-positive">
            <FaArrowUp />
            <span>-25%</span> from last month
          </div>
        </div>
      </div>

      <div className="ali-quick-actions">
        {quickActions.map((action, index) => (
          <div 
            key={index} 
            className="ali-quick-action-card"
            onClick={action.action}
          >
            <div className="ali-quick-action-icon">
              {action.icon}
            </div>
            <div className="ali-quick-action-title">{action.title}</div>
            <div className="ali-quick-action-desc">{action.description}</div>
          </div>
        ))}
      </div>

      <div className="ali-card">
        <div className="ali-card-header">
          <h3>Today's Appointments</h3>
          <button className="ali-btn ali-btn-primary">
            <FaEye />
            View All
          </button>
        </div>
        <div className="ali-card-body">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Time</th>
                <th>Type</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetchAppointments()
                .filter(appt => appt.date === new Date().toISOString().split('T')[0])
                .sort((a, b) => a.time.localeCompare(b.time))
                .slice(0, 5)
                .map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.type}</td>
                    <td>{appointment.doctorName}</td>
                    <td>
                      <span className={`ali-status ${appointment.status}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td>
                      <button className="ali-action-btn ali-view">
                        View
                      </button>
                      <button className="ali-action-btn ali-edit">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="ali-card">
        <div className="ali-card-header">
          <h3>Recent Patient Registrations</h3>
          <button className="ali-btn ali-btn-primary">
            <FaUsers />
            Manage Users
          </button>
        </div>
        <div className="ali-card-body">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Email</th>
                <th>Registration Date</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetchUsers()
                .filter(user => user.role === 'patient')
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5)
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>{user.phone || 'N/A'}</td>
                    <td>
                      <span className={`ali-status ${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button className="ali-action-btn ali-view">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="ali-chart-container">
        <h3>Patient Statistics Overview</h3>
        <div className="ali-chart-placeholder">
          <div style={{ textAlign: 'center' }}>
            <FaChartArea />
            <p>Interactive Analytics Chart</p>
            <div style={{ fontSize: '0.9rem', opacity: '0.7', marginTop: '5px' }}>
              Patient registrations, appointments, and health metrics over time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// AdminSidebar Component
const AdminSidebar = ({ isCollapsed, toggleCollapse, user, activePage, setActivePage }) => {
  const menuItems = [
    {
      section: "Main",
      items: [
        { key: "dashboard", icon: <FaHome />, label: "Dashboard" },
        { key: "analytics", icon: <FaChartLine />, label: "Analytics" }
      ]
    },
    {
      section: "Content Management",
      items: [
        { key: "users", icon: <FaUsers />, label: "User Management" },
        { key: "appointments", icon: <FaCalendarCheck />, label: "Appointments", badge: fetchStats().todayAppointments },
        { key: "blog", icon: <FaNewspaper />, label: "Blog" },
        { key: "faqs", icon: <FaQuestionCircle />, label: "FAQs" },
        { key: "sms-reminders", icon: <FaBell />, label: "SMS Reminders" },
        { key: "emergency-logs", icon: <FaExclamationTriangle />, label: "Emergency Logs", badge: fetchStats().emergencyAlerts }
      ]
    },
    {
      section: "System",
      items: [
        { key: "settings", icon: <FaCogs />, label: "Settings" }
      ]
    }
  ];

  return (
    <div className={`ali-sidebar ${isCollapsed ? 'ali-collapsed' : ''}`}>
      <div className="ali-sidebar-header">
        <h3>Pregvita</h3>
        <div 
          className="ali-toggle-btn" 
          onClick={toggleCollapse}
        >
          <FaBars />
        </div>
      </div>
      
      <div className="ali-sidebar-menu">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {!isCollapsed && <h4>{section.section}</h4>}
            <ul>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <div 
                    className={`ali-menu-item ${activePage === item.key ? 'ali-active' : ''}`}
                    onClick={() => setActivePage(item.key)}
                  >
                    <div className="ali-menu-icon">{item.icon}</div>
                    {!isCollapsed && (
                      <>
                        <span>{item.label}</span>
                        {item.badge && <span className="ali-badge">{item.badge}</span>}
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="ali-sidebar-footer">
        <div className="ali-user-profile">
          <img src={user?.avatar} alt="User Profile" />
          {!isCollapsed && (
            <div>
              <div className="ali-user-name">{user?.firstName} {user?.lastName}</div>
              <div className="ali-user-role">{user?.role}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// AdminTopNav Component
const AdminTopNav = ({ user, logout, toggleNotifications, notificationCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      console.log('Searching for:', e.target.value);
    }
  };

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <div className="ali-top-nav">
      <div className="ali-search-bar">
        <input 
          type="text" 
          placeholder="Search patients, appointments, clinics..."
          value={searchQuery}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
        />
        <FaSearch />
      </div>
      
      <div className="ali-user-actions">
        <div className="ali-notification-bell" onClick={toggleNotifications}>
          <FaBell />
          {notificationCount > 0 && (
            <span className="ali-notification-badge">{notificationCount}</span>
          )}
        </div>
        
        <div className="ali-user-profile" onClick={handleUserMenuToggle}>
          <img src={user?.avatar} alt="Admin Profile" />
          <span>{user?.firstName} {user?.lastName}</span>
          {showUserMenu ? <FaChevronUp /> : <FaChevronDown />}
          
          {showUserMenu && (
            <div className="ali-user-menu">
              <div className="ali-menu-item">
                <FaUser />
                <span>My Profile</span>
              </div>
              <div className="ali-menu-item">
                <FaCog />
                <span>Settings</span>
              </div>
              <div className="ali-menu-divider"></div>
              <div className="ali-menu-item" onClick={logout}>
                <FaSignOutAlt />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// NotificationsPanel Component
const NotificationsPanel = ({ isOpen, notifications, markAsRead, closePanel }) => {
  if (!isOpen) return null;

  return (
    <div className="ali-notifications-panel">
      <div className="ali-panel-header">
        <h3>Notifications</h3>
        <div className="ali-panel-actions">
          <button onClick={markAsRead}>Mark all as read</button>
          <FaTimes onClick={closePanel} />
        </div>
      </div>
      <div className="ali-notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className={`ali-notification-item ${notification.unread ? 'ali-unread' : ''}`}>
              <div className="ali-notification-icon">
                {notification.icon === 'user-plus' && <FaUserPlus />}
                {notification.icon === 'calendar-check' && <FaCalendarCheck />}
                {notification.icon === 'exclamation-triangle' && <FaExclamationTriangle />}
                {notification.icon === 'flask' && <FaFlask />}
                {notification.icon === 'download' && <FaDownload />}
                {notification.icon === 'user-slash' && <FaUserSlash />}
                {notification.icon === 'calendar-times' && <FaCalendarTimes />}
                {notification.icon === 'redo' && <FaRedo />}
                {notification.icon === 'edit' && <FaEdit />}
                {notification.icon === 'trash' && <FaTrash />}
                {notification.icon === 'question-circle' && <FaQuestionCircle />}
                {notification.icon === 'bell' && <FaBell />}
                {notification.icon === 'check' && <FaCheck />}
                {!notification.icon && <FaBell />}
              </div>
              <div className="ali-notification-content">
                <div className="ali-notification-title">{notification.title}</div>
                <div className="ali-notification-message">{notification.message}</div>
                <div className="ali-notification-time">
                  {new Date(notification.time).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="ali-no-notifications">
            <FaBellSlash />
            <p>No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Admin Component
const Admin = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(!isAuthenticated);
  const [activePage, setActivePage] = useState('dashboard');

  // Load user and notifications
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    }

    const loadNotifications = () => {
      const loadedNotifications = fetchNotifications();
      setNotifications(loadedNotifications);
      setNotificationCount(loadedNotifications.filter(n => n.unread).length);
    };

    loadNotifications();

    // Set up interval to check for new notifications
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, unread: false }));
    setNotifications(updatedNotifications);
    setNotificationCount(0);
    localStorage.setItem('adminNotifications', JSON.stringify(updatedNotifications));
  };

  const handleLogin = async (credentials) => {
    try {
      const { user } = await loginUser(credentials);
      setUser(user);
      setIsAuthenticated(true);
      setShowLoginModal(false);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    logoutUser();
    setIsAuthenticated(false);
    setUser(null);
    setShowLoginModal(true);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'users':
        return <UserManagementPage />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'blog':
        return <BlogPage />; // Use BlogPage component with admin controls
      case 'faqs':
        return <FAQsPage />;
      case 'sms-reminders':
        return <SMSRemindersPage />;
      case 'emergency-logs':
        return <EmergencyLogsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="ali-dashboard-container">
      {showLoginModal && (
        <LoginModal 
          onLogin={handleLogin} 
          onClose={() => setShowLoginModal(false)}
        />
      )}
      
      {isAuthenticated && (
        <>
          <AdminSidebar 
            isCollapsed={isCollapsed} 
            toggleCollapse={toggleCollapse}
            user={user}
            activePage={activePage}
            setActivePage={setActivePage}
          />
          
          <div className="ali-main-content">
            <AdminTopNav 
              user={user} 
              logout={logout}
              toggleNotifications={toggleNotifications}
              notificationCount={notificationCount}
            />
            
            <NotificationsPanel
              isOpen={showNotifications}
              notifications={notifications}
              markAsRead={markAsRead}
              closePanel={() => setShowNotifications(false)}
            />
            
            <div className="cumo-content-wrapper">
              {renderActivePage()}
            </div>
          </div>
        </>
      )
    }
    </div>
  );
};

export default Admin;