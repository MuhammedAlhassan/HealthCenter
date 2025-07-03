import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import './Admin';

// Mock API function
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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if ((credentials.email === 'admin@pregvita.com' && credentials.password === 'admin123') || 
          (credentials.email === 'muhammedalhassan815@gmail.com' && credentials.password === 'hajji 815')) {
        const token = 'mock-jwt-token';
        localStorage.setItem('token', token);
        resolve({ 
          token, 
          user: {
            name: "Dr. Sarah Johnson",
            role: "admin",
            avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
          }
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
};

const logoutUser = () => {
  localStorage.removeItem('token');
};

const checkAuth = () => {
  return !!localStorage.getItem('token');
};

// Mock data functions
const fetchStats = () => ({
  totalPatients: 1245,
  activePregnancies: 342,
  todayAppointments: 28,
  emergencyAlerts: 3,
  newRegistrations: 15,
  messages: 7
});

const fetchUsers = () => [
  {
    id: 1,
    fullName: "Maria Rodriguez",
    email: "maria@example.com",
    registrationDate: "2023-05-15T10:30:00Z",
    phone: "+1 555-123-4567",
    status: "active",
    role: "patient",
    lastLogin: "2023-05-20T08:45:00Z"
  },
  {
    id: 2,
    fullName: "Jennifer Kim",
    email: "jennifer@example.com",
    registrationDate: "2023-05-14T14:20:00Z",
    phone: "+1 555-987-6543",
    status: "active",
    role: "patient",
    lastLogin: "2023-05-19T14:30:00Z"
  },
  {
    id: 3,
    fullName: "Sarah Thompson",
    email: "sarah@example.com",
    registrationDate: "2023-05-12T09:15:00Z",
    phone: "+1 555-456-7890",
    status: "active",
    role: "patient",
    lastLogin: "2023-05-18T10:15:00Z"
  },
  {
    id: 4,
    fullName: "Emily Davis",
    email: "emily@example.com",
    registrationDate: "2023-05-10T16:45:00Z",
    phone: "+1 555-789-0123",
    status: "inactive",
    role: "patient",
    lastLogin: "2023-05-15T11:20:00Z"
  },
  {
    id: 5,
    fullName: "Jessica Wilson",
    email: "jessica@example.com",
    registrationDate: "2023-05-08T11:20:00Z",
    phone: "+1 555-234-5678",
    status: "active",
    role: "patient",
    lastLogin: "2023-05-20T09:30:00Z"
  },
  {
    id: 6,
    fullName: "Dr. Michael Chen",
    email: "michael@example.com",
    registrationDate: "2023-04-20T09:00:00Z",
    phone: "+1 555-345-6789",
    status: "active",
    role: "doctor",
    lastLogin: "2023-05-20T07:45:00Z"
  },
  {
    id: 7,
    fullName: "Dr. Lisa Wong",
    email: "lisa@example.com",
    registrationDate: "2023-04-18T10:15:00Z",
    phone: "+1 555-456-7890",
    status: "active",
    role: "doctor",
    lastLogin: "2023-05-19T16:30:00Z"
  },
  {
    id: 8,
    fullName: "Nurse Amanda Smith",
    email: "amanda@example.com",
    registrationDate: "2023-04-15T14:30:00Z",
    phone: "+1 555-567-8901",
    status: "active",
    role: "nurse",
    lastLogin: "2023-05-20T08:15:00Z"
  }
];

const fetchAppointments = () => [
  {
    id: 1,
    patientName: "Maria Rodriguez",
    patientId: 1,
    appointmentTime: "09:30 AM",
    date: "2023-05-21",
    type: "Prenatal Checkup",
    doctorName: "Dr. Sarah Johnson",
    doctorId: 9,
    status: "confirmed",
    notes: "First trimester checkup"
  },
  {
    id: 2,
    patientName: "Jennifer Kim",
    patientId: 2,
    appointmentTime: "10:45 AM",
    date: "2023-05-21",
    type: "Ultrasound",
    doctorName: "Dr. Michael Chen",
    doctorId: 6,
    status: "confirmed",
    notes: "20-week anatomy scan"
  },
  {
    id: 3,
    patientName: "Sarah Thompson",
    patientId: 3,
    appointmentTime: "01:15 PM",
    date: "2023-05-21",
    type: "Emergency Consultation",
    doctorName: "Dr. Sarah Johnson",
    doctorId: 9,
    status: "completed",
    notes: "Reported severe cramping"
  },
  {
    id: 4,
    patientName: "Emily Davis",
    patientId: 4,
    appointmentTime: "03:00 PM",
    date: "2023-05-21",
    type: "Postnatal Checkup",
    doctorName: "Dr. Lisa Wong",
    doctorId: 7,
    status: "cancelled",
    notes: "Patient rescheduled"
  },
  {
    id: 5,
    patientName: "Jessica Wilson",
    patientId: 5,
    appointmentTime: "11:30 AM",
    date: "2023-05-22",
    type: "Routine Checkup",
    doctorName: "Dr. Michael Chen",
    doctorId: 6,
    status: "scheduled",
    notes: "Third trimester checkup"
  }
];

const fetchBlogPosts = () => [
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

const fetchFAQs = () => [
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

const fetchHealthHub = () => [
  {
    id: 1,
    title: "Pregnancy Week by Week",
    category: "Pregnancy",
    status: "published",
    lastUpdated: "2023-05-10",
    content: "Detailed guide to fetal development and maternal changes during each week of pregnancy."
  },
  {
    id: 2,
    title: "Newborn Care Guide",
    category: "Postpartum",
    status: "published",
    lastUpdated: "2023-04-25",
    content: "Essential information for new parents on feeding, diapering, bathing, and caring for your newborn."
  },
  {
    id: 3,
    title: "Breastfeeding Basics",
    category: "Postpartum",
    status: "published",
    lastUpdated: "2023-04-15",
    content: "Comprehensive guide to breastfeeding techniques, positions, and troubleshooting common issues."
  },
  {
    id: 4,
    title: "Managing Morning Sickness",
    category: "Pregnancy",
    status: "draft",
    lastUpdated: "2023-05-18",
    content: "Tips and remedies for dealing with nausea and vomiting during pregnancy."
  }
];

const fetchSMSReminders = () => [
  {
    id: 1,
    patientName: "Maria Rodriguez",
    phone: "+1 555-123-4567",
    message: "Reminder: Your prenatal appointment is tomorrow at 9:30 AM",
    status: "delivered",
    dateSent: "2023-05-20T08:00:00Z"
  },
  {
    id: 2,
    patientName: "Jennifer Kim",
    phone: "+1 555-987-6543",
    message: "Reminder: Your ultrasound is scheduled for tomorrow at 10:45 AM",
    status: "delivered",
    dateSent: "2023-05-20T08:00:00Z"
  },
  {
    id: 3,
    patientName: "Sarah Thompson",
    phone: "+1 555-456-7890",
    message: "Reminder: Please take your prenatal vitamins today",
    status: "failed",
    dateSent: "2023-05-21T09:00:00Z"
  },
  {
    id: 4,
    patientName: "Emily Davis",
    phone: "+1 555-789-0123",
    message: "Reminder: Your postnatal checkup is tomorrow at 3:00 PM",
    status: "scheduled",
    dateSent: "2023-05-22T08:00:00Z"
  }
];

const fetchEmergencyLogs = () => [
  {
    id: 1,
    patientName: "Sarah Thompson",
    date: "2023-05-21T13:15:00Z",
    type: "Severe Cramping",
    status: "resolved",
    notes: "Patient reported severe cramping at 20 weeks. Recommended immediate evaluation."
  },
  {
    id: 2,
    patientName: "Jessica Wilson",
    date: "2023-05-18T22:30:00Z",
    type: "Decreased Fetal Movement",
    status: "resolved",
    notes: "Patient reported no fetal movement for 12 hours. Recommended kick count monitoring."
  },
  {
    id: 3,
    patientName: "Maria Rodriguez",
    date: "2023-05-15T10:45:00Z",
    type: "Vaginal Bleeding",
    status: "pending",
    notes: "Patient reported light spotting. Scheduled for ultrasound."
  }
];

const fetchSettings = () => ({
  clinicName: "Pregvita Health Center",
  address: "789 Health Ave, Suite 100, New York, NY 10005",
  phone: "+1 212-555-3000",
  email: "info@pregvita.com",
  workingHours: "Monday to Friday: 8:00 AM - 6:00 PM",
  smsNotifications: true,
  emailNotifications: true,
  appointmentReminderHours: 24,
  emergencyContact: "+1 212-555-9111"
});

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
      <div className="ali-modal">
        <div className="ali-modal-header">
          <h2>Admin Login</h2>
          <button className="ali-modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
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
            {error && <div className="ali-form-error">{error}</div>}
            <button 
              type="submit" 
              className="ali-btn ali-btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
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
          <i className="fas fa-download"></i>
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
                  <td>Health Hub</td>
                  <td>8</td>
                  <td>3,210</td>
                  <td>65%</td>
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
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'patient',
    status: 'active'
  });
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId) => apiRequest('DELETE', `/api/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  const addUserMutation = useMutation({
    mutationFn: (userData) => apiRequest('POST', '/api/users', userData),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setIsAddingUser(false);
      setUserForm({
        fullName: '',
        email: '',
        phone: '',
        role: 'patient',
        status: 'active'
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, userData }) => apiRequest('PUT', `/api/users/${id}`, userData),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setIsEditingUser(null);
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
    if (window.confirm('Are you sure you want to delete this user?')) {
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

  const handleEditUserSubmit = (e) => {
    e.preventDefault();
    updateUserMutation.mutate({ id: isEditingUser.id, userData: userForm });
  };

  const startEditingUser = (user) => {
    setIsEditingUser(user);
    setUserForm({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status
    });
  };

  const cancelEditing = () => {
    setIsEditingUser(null);
    setUserForm({
      fullName: '',
      email: '',
      phone: '',
      role: 'patient',
      status: 'active'
    });
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
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
          <i className="fas fa-search"></i>
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
          <i className="fas fa-user-plus"></i>
          Add New User
        </button>
      </div>

      {(isAddingUser || isEditingUser) && (
        <div className="ali-add-user-form">
          <h3>{isEditingUser ? 'Edit User' : 'Add New User'}</h3>
          <form onSubmit={isEditingUser ? handleEditUserSubmit : handleAddUserSubmit}>
            <div className="ali-form-row">
              <div className="ali-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={userForm.fullName}
                  onChange={handleFormChange}
                  required
                />
              </div>
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
            </div>
            <div className="ali-form-row">
              <div className="ali-form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={userForm.phone}
                  onChange={handleFormChange}
                />
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
            <div className="ali-form-actions">
              <button 
                type="submit" 
                className="ali-btn ali-btn-primary"
                disabled={addUserMutation.isLoading || updateUserMutation.isLoading}
              >
                {addUserMutation.isLoading || updateUserMutation.isLoading ? 'Saving...' : 'Save User'}
              </button>
              <button 
                type="button" 
                className="ali-btn ali-btn-secondary"
                onClick={isEditingUser ? cancelEditing : () => setIsAddingUser(false)}
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
                      {user.fullName.charAt(0)}
                    </div>
                    <div className="ali-user-details">
                      <div className="ali-user-name">{user.fullName}</div>
                      <div className="ali-user-phone">{user.phone}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`ali-role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`ali-status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  {new Date(user.lastLogin).toLocaleDateString()}
                </td>
                <td>
                  <div className="ali-action-buttons">
                    <button 
                      className="ali-btn ali-btn-icon" 
                      title="Edit"
                      onClick={() => startEditingUser(user)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="ali-btn ali-btn-icon ali-danger" 
                      title="Delete"
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={deleteUserMutation.isLoading}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers?.length === 0 && (
          <div className="ali-no-results">
            <i className="fas fa-user-slash"></i>
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
  const [isEditingAppointment, setIsEditingAppointment] = useState(null);
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

  const deleteAppointmentMutation = useMutation({
    mutationFn: (appointmentId) => apiRequest('DELETE', `/api/appointments/${appointmentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
    },
  });

  const addAppointmentMutation = useMutation({
    mutationFn: (appointmentData) => apiRequest('POST', '/api/appointments', appointmentData),
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
    mutationFn: ({ id, appointmentData }) => apiRequest('PUT', `/api/appointments/${id}`, appointmentData),
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      setIsEditingAppointment(null);
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

  const handleEditAppointmentSubmit = (e) => {
    e.preventDefault();
    updateAppointmentMutation.mutate({ id: isEditingAppointment.id, appointmentData: appointmentForm });
  };

  const startEditingAppointment = (appointment) => {
    setIsEditingAppointment(appointment);
    setAppointmentForm({
      patientId: appointment.patientId,
      doctorId: appointment.doctorId.toString(),
      date: appointment.date,
      time: appointment.appointmentTime,
      type: appointment.type,
      notes: appointment.notes
    });
  };

  const cancelEditing = () => {
    setIsEditingAppointment(null);
    setAppointmentForm({
      patientId: '',
      doctorId: '',
      date: '',
      time: '',
      type: 'Prenatal Checkup',
      notes: ''
    });
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
            <option value="9">Dr. Sarah Johnson</option>
            <option value="6">Dr. Michael Chen</option>
            <option value="7">Dr. Lisa Wong</option>
          </select>
        </div>

        <button 
          className="ali-btn ali-btn-primary"
          onClick={() => setIsAddingAppointment(true)}
        >
          <i className="fas fa-calendar-plus"></i>
          New Appointment
        </button>
      </div>

      {(isAddingAppointment || isEditingAppointment) && (
        <div className="ali-add-appointment-form">
          <h3>{isEditingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}</h3>
          <form onSubmit={isEditingAppointment ? handleEditAppointmentSubmit : handleAddAppointmentSubmit}>
            <div className="ali-form-row">
              <div className="ali-form-group">
                <label>Patient ID</label>
                <input
                  type="text"
                  name="patientId"
                  value={appointmentForm.patientId}
                  onChange={handleFormChange}
                  required
                />
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
                  <option value="9">Dr. Sarah Johnson</option>
                  <option value="6">Dr. Michael Chen</option>
                  <option value="7">Dr. Lisa Wong</option>
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
                disabled={addAppointmentMutation.isLoading || updateAppointmentMutation.isLoading}
              >
                {addAppointmentMutation.isLoading || updateAppointmentMutation.isLoading ? 'Saving...' : 'Save Appointment'}
              </button>
              <button 
                type="button" 
                className="ali-btn ali-btn-secondary"
                onClick={isEditingAppointment ? cancelEditing : () => setIsAddingAppointment(false)}
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
                      {appointment.patientName.charAt(0)}
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
                    <div className="ali-appointment-hour">{appointment.appointmentTime}</div>
                  </div>
                </td>
                <td>{appointment.type}</td>
                <td>{appointment.doctorName}</td>
                <td>
                  <span className={`ali-status-badge ${appointment.status}`}>
                    {appointment.status}
                  </span>
                </td>
                <td>
                  <div className="ali-action-buttons">
                    <button 
                      className="ali-btn ali-btn-icon" 
                      title="View"
                      onClick={() => console.log('View appointment', appointment.id)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      className="ali-btn ali-btn-icon" 
                      title="Edit"
                      onClick={() => startEditingAppointment(appointment)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="ali-btn ali-btn-icon ali-danger" 
                      title="Delete"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      disabled={deleteAppointmentMutation.isLoading}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAppointments?.length === 0 && (
          <div className="ali-no-results">
            <i className="fas fa-calendar-times"></i>
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
  const [isEditingPost, setIsEditingPost] = useState(null);
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
    mutationFn: (postId) => apiRequest('DELETE', `/api/blog/${postId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['blog']);
    },
  });

  const addPostMutation = useMutation({
    mutationFn: (postData) => apiRequest('POST', '/api/blog', postData),
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
    mutationFn: ({ id, postData }) => apiRequest('PUT', `/api/blog/${id}`, postData),
    onSuccess: () => {
      queryClient.invalidateQueries(['blog']);
      setIsEditingPost(null);
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

  const handleEditPostSubmit = (e) => {
    e.preventDefault();
    updatePostMutation.mutate({ id: isEditingPost.id, postData: postForm });
  };

  const startEditingPost = (post) => {
    setIsEditingPost(post);
    setPostForm({
      title: post.title,
      author: post.author,
      category: post.category,
      status: post.status,
      content: post.content || ''
    });
  };

  const cancelEditing = () => {
    setIsEditingPost(null);
    setPostForm({
      title: '',
      author: 'Dr. Sarah Johnson',
      category: 'Nutrition',
      status: 'draft',
      content: ''
    });
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
          <i className="fas fa-search"></i>
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
          <i className="fas fa-plus"></i>
          New Post
        </button>
      </div>

      {(isAddingPost || isEditingPost) && (
        <div className="ali-add-post-form">
          <h3>{isEditingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
          <form onSubmit={isEditingPost ? handleEditPostSubmit : handleAddPostSubmit}>
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
                disabled={addPostMutation.isLoading || updatePostMutation.isLoading}
              >
                {addPostMutation.isLoading || updatePostMutation.isLoading ? 'Saving...' : 'Save Post'}
              </button>
              <button 
                type="button" 
                className="ali-btn ali-btn-secondary"
                onClick={isEditingPost ? cancelEditing : () => setIsAddingPost(false)}
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
                  <span className={`ali-category-badge ${post.category.toLowerCase()}`}>
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
                      onClick={() => startEditingPost(post)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="ali-btn ali-btn-icon" 
                      title="View"
                      onClick={() => console.log('View post', post.id)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      className="ali-btn ali-btn-icon ali-danger" 
                      title="Delete"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <i className="fas fa-trash"></i>
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
  const [isEditingFAQ, setIsEditingFAQ] = useState(null);
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
    mutationFn: (faqId) => apiRequest('DELETE', `/api/faqs/${faqId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']);
    },
  });

  const addFAQMutation = useMutation({
    mutationFn: (faqData) => apiRequest('POST', '/api/faqs', faqData),
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
    mutationFn: ({ id, faqData }) => apiRequest('PUT', `/api/faqs/${id}`, faqData),
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']);
      setIsEditingFAQ(null);
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

  const handleEditFAQSubmit = (e) => {
    e.preventDefault();
    updateFAQMutation.mutate({ id: isEditingFAQ.id, faqData: faqForm });
  };

  const startEditingFAQ = (faq) => {
    setIsEditingFAQ(faq);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      status: faq.status
    });
  };

  const cancelEditing = () => {
    setIsEditingFAQ(null);
    setFaqForm({
      question: '',
      answer: '',
      category: 'Prenatal Care',
      status: 'draft'
    });
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
          <i className="fas fa-search"></i>
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
          <i className="fas fa-plus"></i>
          New FAQ
        </button>
      </div>

      {(isAddingFAQ || isEditingFAQ) && (
        <div className="ali-add-faq-form">
          <h3>{isEditingFAQ ? 'Edit FAQ' : 'Add New FAQ'}</h3>
          <form onSubmit={isEditingFAQ ? handleEditFAQSubmit : handleAddFAQSubmit}>
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
                disabled={addFAQMutation.isLoading || updateFAQMutation.isLoading}
              >
                {addFAQMutation.isLoading || updateFAQMutation.isLoading ? 'Saving...' : 'Save FAQ'}
              </button>
              <button 
                type="button" 
                className="ali-btn ali-btn-secondary"
                onClick={isEditingFAQ ? cancelEditing : () => setIsAddingFAQ(false)}
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
                <span className={`ali-category-tag ${faq.category.toLowerCase()}`}>
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
                onClick={() => startEditingFAQ(faq)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button 
                className="ali-btn ali-btn-icon ali-danger"
                onClick={() => handleDeleteFAQ(faq.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Health Hub Page Component
const HealthHubPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [isEditingResource, setIsEditingResource] = useState(null);
  const [resourceForm, setResourceForm] = useState({
    title: '',
    category: 'Pregnancy',
    status: 'draft',
    content: ''
  });
  
  const { data: resources, isLoading } = useQuery({
    queryKey: ['healthhub'],
    queryFn: fetchHealthHub,
  });

  const deleteResourceMutation = useMutation({
    mutationFn: (resourceId) => apiRequest('DELETE', `/api/healthhub/${resourceId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['healthhub']);
    },
  });

  const addResourceMutation = useMutation({
    mutationFn: (resourceData) => apiRequest('POST', '/api/healthhub', resourceData),
    onSuccess: () => {
      queryClient.invalidateQueries(['healthhub']);
      setIsAddingResource(false);
      setResourceForm({
        title: '',
        category: 'Pregnancy',
        status: 'draft',
        content: ''
      });
    },
  });

  const updateResourceMutation = useMutation({
    mutationFn: ({ id, resourceData }) => apiRequest('PUT', `/api/healthhub/${id}`, resourceData),
    onSuccess: () => {
      queryClient.invalidateQueries(['healthhub']);
      setIsEditingResource(null);
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

  const handleDeleteResource = (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      deleteResourceMutation.mutate(resourceId);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setResourceForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddResourceSubmit = (e) => {
    e.preventDefault();
    addResourceMutation.mutate(resourceForm);
  };

  const handleEditResourceSubmit = (e) => {
    e.preventDefault();
    updateResourceMutation.mutate({ id: isEditingResource.id, resourceData: resourceForm });
  };

  const startEditingResource = (resource) => {
    setIsEditingResource(resource);
    setResourceForm({
      title: resource.title,
      category: resource.category,
      status: resource.status,
      content: resource.content || ''
    });
  };

  const cancelEditing = () => {
    setIsEditingResource(null);
    setResourceForm({
      title: '',
      category: 'Pregnancy',
      status: 'draft',
      content: ''
    });
  };

  const filteredResources = resources?.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || resource.status === statusFilter;
    
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
        <h2>Health Hub Resources</h2>
        <div className="ali-page-subtitle">
          Manage educational resources for patients
        </div>
      </div>

      <div className="ali-resource-tools">
        <div className="ali-search-filter">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <i className="fas fa-search"></i>
        </div>

        <div className="ali-filter-group">
          <label>Category:</label>
          <select value={categoryFilter} onChange={handleCategoryFilter}>
            <option value="all">All Categories</option>
            <option value="Pregnancy">Pregnancy</option>
            <option value="Postpartum">Postpartum</option>
            <option value="Newborn Care">Newborn Care</option>
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
          onClick={() => setIsAddingResource(true)}
        >
          <i className="fas fa-plus"></i>
          New Resource
        </button>
      </div>

      {(isAddingResource || isEditingResource) && (
        <div className="ali-add-resource-form">
          <h3>{isEditingResource ? 'Edit Resource' : 'Add New Resource'}</h3>
          <form onSubmit={isEditingResource ? handleEditResourceSubmit : handleAddResourceSubmit}>
            <div className="ali-form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={resourceForm.title}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="ali-form-row">
              <div className="ali-form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={resourceForm.category}
                  onChange={handleFormChange}
                >
                  <option value="Pregnancy">Pregnancy</option>
                  <option value="Postpartum">Postpartum</option>
                  <option value="Newborn Care">Newborn Care</option>
                </select>
              </div>
              <div className="ali-form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={resourceForm.status}
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
                value={resourceForm.content}
                onChange={handleFormChange}
                rows="10"
                required
              />
            </div>
            <div className="ali-form-actions">
              <button 
                type="submit" 
                className="ali-btn ali-btn-primary"
                disabled={addResourceMutation.isLoading || updateResourceMutation.isLoading}
              >
                {addResourceMutation.isLoading || updateResourceMutation.isLoading ? 'Saving...' : 'Save Resource'}
              </button>
              <button 
                type="button" 
                className="ali-btn ali-btn-secondary"
                onClick={isEditingResource ? cancelEditing : () => setIsAddingResource(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="ali-resource-grid">
        {filteredResources?.map(resource => (
          <div className="ali-resource-card" key={resource.id}>
            <div className="ali-resource-header">
              <h3>{resource.title}</h3>
              <span className={`ali-status-badge ${resource.status}`}>
                {resource.status}
              </span>
            </div>
            <div className="ali-resource-meta">
              <span className={`ali-category-badge ${resource.category.toLowerCase()}`}>
                {resource.category}
              </span>
              <span className="ali-last-updated">
                Updated: {resource.lastUpdated}
              </span>
            </div>
            <div className="ali-resource-preview">
              {resource.content.substring(0, 150)}...
            </div>
            <div className="ali-resource-actions">
              <button 
                className="ali-btn ali-btn-icon"
                onClick={() => startEditingResource(resource)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button 
                className="ali-btn ali-btn-icon"
                onClick={() => console.log('View resource', resource.id)}
              >
                <i className="fas fa-eye"></i>
              </button>
              <button 
                className="ali-btn ali-btn-icon ali-danger"
                onClick={() => handleDeleteResource(resource.id)}
              >
                <i className="fas fa-trash"></i>
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

  const deleteReminderMutation = useMutation({
    mutationFn: (reminderId) => apiRequest('DELETE', `/api/sms-reminders/${reminderId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['sms-reminders']);
    },
  });

  const sendReminderMutation = useMutation({
    mutationFn: (reminderData) => apiRequest('POST', '/api/sms-reminders', reminderData),
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
    mutationFn: (reminderId) => apiRequest('POST', `/api/sms-reminders/${reminderId}/resend`),
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
          <i className="fas fa-search"></i>
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
          <i className="fas fa-plus"></i>
          New Reminder
        </button>
      </div>

      {isSendingReminder && (
        <div className="ali-send-reminder-form">
          <h3>Send New SMS Reminder</h3>
          <form onSubmit={handleSendReminderSubmit}>
            <div className="ali-form-group">
              <label>Patient ID</label>
              <input
                type="text"
                name="patientId"
                value={newReminder.patientId}
                onChange={handleNewReminderChange}
                required
              />
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
                {sendReminderMutation.isLoading ? 'Sending...' : 'Send Reminder'}
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
                      <i className="fas fa-redo"></i>
                    </button>
                    <button 
                      className="ali-btn ali-btn-icon ali-danger" 
                      title="Delete"
                      onClick={() => handleDeleteReminder(reminder.id)}
                    >
                      <i className="fas fa-trash"></i>
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
    mutationFn: ({ id, status }) => apiRequest('PUT', `/api/emergency-logs/${id}`, { status }),
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
          <i className="fas fa-search"></i>
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
              <i className="fas fa-exclamation-triangle"></i>
              <span>{log.type}</span>
            </div>
            <div className="ali-emergency-notes">
              <p>{log.notes}</p>
            </div>
            <div className="ali-emergency-actions">
              <button className="ali-btn ali-btn-icon">
                <i className="fas fa-edit"></i>
              </button>
              <button className="ali-btn ali-btn-icon">
                <i className="fas fa-file-medical"></i>
              </button>
              <button className="ali-btn ali-btn-icon ali-danger">
                <i className="fas fa-trash"></i>
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

  const updateSettingsMutation = useMutation({
    mutationFn: (settingsData) => apiRequest('PUT', '/api/settings', settingsData),
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
      setIsEditing(false);
    },
  });

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

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
                <i className="fas fa-edit"></i>
                Edit Settings
              </button>
            ) : (
              <>
                <button 
                  type="submit" 
                  className="ali-btn ali-btn-primary"
                  disabled={updateSettingsMutation.isLoading}
                >
                  <i className="fas fa-save"></i>
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
                  <i className="fas fa-times"></i>
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
      icon: "fas fa-user-plus",
      title: "Add New Patient",
      description: "Register a new patient",
      action: () => console.log('Navigate to add patient')
    },
    {
      icon: "fas fa-calendar-plus",
      title: "Schedule Appointment",
      description: "Book a new appointment",
      action: () => console.log('Navigate to schedule appointment')
    },
    {
      icon: "fas fa-ambulance",
      title: "Emergency Protocol",
      description: "Handle emergency cases",
      action: () => console.log('Navigate to emergency protocol')
    },
    {
      icon: "fas fa-chart-bar",
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
            Welcome back, Dr. Johnson! Here's what's happening with your patients today.
          </div>
        </div>
        <button className="ali-btn ali-btn-primary" onClick={generateReport}>
          <i className="fas fa-download"></i>
          Generate Report
        </button>
      </div>

      <div className="ali-stats-cards">
        <div className="ali-stat-card">
          <div className="ali-stat-card-header">
            <h3>Total Patients</h3>
            <div className="ali-stat-card-icon ali-primary">
              <i className="fas fa-users"></i>
            </div>
          </div>
          <div className="ali-value">{stats?.totalPatients.toLocaleString() || 0}</div>
          <div className="ali-change ali-positive">
            <i className="fas fa-arrow-up"></i>
            <span>+12.5%</span> from last month
          </div>
        </div>
        <div className="ali-stat-card">
          <div className="ali-stat-card-header">
            <h3>Active Pregnancies</h3>
            <div className="ali-stat-card-icon ali-success">
              <i className="fas fa-baby"></i>
            </div>
          </div>
          <div className="ali-value">{stats?.activePregnancies.toLocaleString() || 0}</div>
          <div className="ali-change ali-positive">
            <i className="fas fa-arrow-up"></i>
            <span>+8.3%</span> from last month
          </div>
        </div>
        <div className="ali-stat-card">
          <div className="ali-stat-card-header">
            <h3>Today's Appointments</h3>
            <div className="ali-stat-card-icon ali-warning">
              <i className="fas fa-calendar-check"></i>
            </div>
          </div>
          <div className="ali-value">{stats?.todayAppointments.toLocaleString() || 0}</div>
          <div className="ali-change ali-negative">
            <i className="fas fa-arrow-down"></i>
            <span>-3.1%</span> from last month
          </div>
        </div>
        <div className="ali-stat-card">
          <div className="ali-stat-card-header">
            <h3>Emergency Alerts</h3>
            <div className="ali-stat-card-icon ali-info">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
          </div>
          <div className="ali-value">{stats?.emergencyAlerts.toLocaleString() || 0}</div>
          <div className="ali-change ali-positive">
            <i className="fas fa-arrow-up"></i>
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
              <i className={action.icon}></i>
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
            <i className="fas fa-eye"></i>
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
                .sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime))
                .slice(0, 5)
                .map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.appointmentTime}</td>
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
            <i className="fas fa-users"></i>
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
                .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
                .slice(0, 5)
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.registrationDate).toLocaleDateString()}</td>
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

      <div className="ali-chart-container">
        <h3>Patient Statistics Overview</h3>
        <div className="ali-chart-placeholder">
          <div style={{ textAlign: 'center' }}>
            <i className="fas fa-chart-area"></i>
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
        { key: "dashboard", icon: "fas fa-home", label: "Dashboard" },
        { key: "analytics", icon: "fas fa-chart-line", label: "Analytics" }
      ]
    },
    {
      section: "Content Management",
      items: [
        { key: "users", icon: "fas fa-users", label: "User Management" },
        { key: "appointments", icon: "fas fa-calendar-check", label: "Appointments", badge: fetchStats().todayAppointments },
        { key: "blog", icon: "fas fa-newspaper", label: "Blog" },
        { key: "faqs", icon: "fas fa-question-circle", label: "FAQs" },
        { key: "healthhub", icon: "fas fa-book", label: "Health Hub" },
        { key: "sms-reminders", icon: "fas fa-bell", label: "SMS Reminders" },
        { key: "emergency-logs", icon: "fas fa-exclamation-triangle", label: "Emergency Logs", badge: fetchStats().emergencyAlerts }
      ]
    },
    {
      section: "System",
      items: [
        { key: "settings", icon: "fas fa-cog", label: "Settings" }
      ]
    }
  ];

  return (
    <div className={`ali-sidebar ${isCollapsed ? 'ali-collapsed' : ''}`}>
      <div className="ali-sidebar-header">
        <h3>Pregvita Health Tracker</h3>
        <i 
          className="fas fa-bars ali-toggle-btn" 
          onClick={toggleCollapse}
        ></i>
      </div>
      
      <div className="ali-sidebar-menu">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h4>{section.section}</h4>
            <ul>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <div 
                    className={`${activePage === item.key ? 'ali-active' : ''}`}
                    onClick={() => setActivePage(item.key)}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                    {item.badge && <span className="ali-badge">{item.badge}</span>}
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
          <div>
            <div className="ali-user-name">{user?.name}</div>
            <div className="ali-user-role">{user?.role}</div>
          </div>
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
        <i className="fas fa-search"></i>
      </div>
      
      <div className="ali-user-actions">
        <div className="ali-notification-bell" onClick={toggleNotifications}>
          <i className="fas fa-bell"></i>
          {notificationCount > 0 && (
            <span className="ali-notification-badge">{notificationCount}</span>
          )}
        </div>
        
        <div className="ali-user-profile" onClick={handleUserMenuToggle}>
          <img src={user?.avatar} alt="Admin Profile" />
          <span>{user?.name}</span>
          <i className={`fas fa-chevron-${showUserMenu ? 'up' : 'down'}`}></i>
          
          {showUserMenu && (
            <div className="ali-user-menu">
              <div className="ali-menu-item">
                <i className="fas fa-user"></i>
                <span>My Profile</span>
              </div>
              <div className="ali-menu-item">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </div>
              <div className="ali-menu-divider"></div>
              <div className="ali-menu-item" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i>
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
          <i className="fas fa-times" onClick={closePanel}></i>
        </div>
      </div>
      <div className="ali-notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className={`ali-notification-item ${notification.unread ? 'ali-unread' : ''}`}>
              <div className="ali-notification-icon">
                <i className={`fas fa-${notification.icon || 'bell'}`}></i>
              </div>
              <div className="ali-notification-content">
                <div className="ali-notification-title">{notification.title}</div>
                <div className="ali-notification-message">{notification.message}</div>
                <div className="ali-notification-time">{notification.time}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="ali-no-notifications">
            <i className="fas fa-bell-slash"></i>
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

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        title: "New Patient Registration",
        message: "Maria Rodriguez has registered as a new patient",
        time: "10 mins ago",
        icon: "user-plus",
        unread: true
      },
      {
        id: 2,
        title: "Appointment Reminder",
        message: "Jennifer Kim has an appointment tomorrow at 9:30 AM",
        time: "25 mins ago",
        icon: "calendar-check",
        unread: true
      },
      {
        id: 3,
        title: "Emergency Alert",
        message: "High priority emergency case reported by Sarah Thompson",
        time: "1 hour ago",
        icon: "exclamation-triangle",
        unread: true
      },
      {
        id: 4,
        title: "Lab Results Ready",
        message: "Lab results for Emily Davis are ready for review",
        time: "2 hours ago",
        icon: "flask",
        unread: false
      },
      {
        id: 5,
        title: "System Update",
        message: "New system update available for installation",
        time: "5 hours ago",
        icon: "download",
        unread: false
      }
    ];
    setNotifications(mockNotifications);
    setNotificationCount(mockNotifications.filter(n => n.unread).length);
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
        return <BlogPage />;
      case 'faqs':
        return <FAQsPage />;
      case 'healthhub':
        return <HealthHubPage />;
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
            
            <div className="ali-content-wrapper">
              {renderActivePage()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;