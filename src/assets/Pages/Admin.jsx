import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useLocation, useNavigate, Routes, Route } from 'react-router-dom';
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

const fetchClinics = () => [
  {
    id: 1,
    name: "Downtown Women's Health",
    address: "123 Main St, Suite 200, New York, NY 10001",
    phone: "+1 212-555-1000",
    email: "downtown@example.com",
    hours: "Mon-Fri: 8am-6pm, Sat: 9am-1pm",
    doctors: ["Dr. Sarah Johnson", "Dr. Michael Chen"]
  },
  {
    id: 2,
    name: "Westside OB/GYN",
    address: "456 Broadway, Suite 300, New York, NY 10003",
    phone: "+1 212-555-2000",
    email: "westside@example.com",
    hours: "Mon-Fri: 9am-5pm",
    doctors: ["Dr. Lisa Wong", "Dr. Amanda Smith"]
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
    views: 1245
  },
  {
    id: 2,
    title: "Exercise During Pregnancy: Safe Workouts for Each Trimester",
    author: "Dr. Michael Chen",
    date: "2023-05-10",
    category: "Fitness",
    status: "published",
    views: 987
  },
  {
    id: 3,
    title: "Understanding Prenatal Vitamins",
    author: "Dr. Lisa Wong",
    date: "2023-05-05",
    category: "Health",
    status: "draft",
    views: 0
  },
  {
    id: 4,
    title: "Preparing for Labor: What to Expect",
    author: "Nurse Amanda Smith",
    date: "2023-04-28",
    category: "Labor & Delivery",
    status: "published",
    views: 1567
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
    lastUpdated: "2023-05-10"
  },
  {
    id: 2,
    title: "Newborn Care Guide",
    category: "Postpartum",
    status: "published",
    lastUpdated: "2023-04-25"
  },
  {
    id: 3,
    title: "Breastfeeding Basics",
    category: "Postpartum",
    status: "published",
    lastUpdated: "2023-04-15"
  },
  {
    id: 4,
    title: "Managing Morning Sickness",
    category: "Pregnancy",
    status: "draft",
    lastUpdated: "2023-05-18"
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

const fetchPages = () => [
  {
    id: 1,
    title: "Home",
    slug: "home",
    status: "published",
    lastUpdated: "2023-05-10"
  },
  {
    id: 2,
    title: "About Us",
    slug: "about",
    status: "published",
    lastUpdated: "2023-04-15"
  },
  {
    id: 3,
    title: "Services",
    slug: "services",
    status: "published",
    lastUpdated: "2023-03-20"
  },
  {
    id: 4,
    title: "Contact",
    slug: "contact",
    status: "draft",
    lastUpdated: "2023-05-18"
  }
];

// Analytics Page Component
const AnalyticsPage = () => {
  const { data: stats } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchStats,
  });

  return (
    <div className="ali-page-content">
      <div className="ali-page-header">
        <h2>Analytics Dashboard</h2>
        <div className="ali-page-subtitle">
          View and analyze key metrics and performance indicators
        </div>
      </div>

      <div className="ali-analytics-grid">
        <div className="ali-analytics-card ali-wide">
          <h3>Patient Growth</h3>
          <div className="ali-chart-placeholder">
            <i className="fas fa-chart-line"></i>
            <p>Monthly patient registration trends</p>
          </div>
        </div>

        <div className="ali-analytics-card">
          <h3>Appointment Types</h3>
          <div className="ali-chart-placeholder ali-pie">
            <i className="fas fa-chart-pie"></i>
            <p>Breakdown of appointment types</p>
          </div>
        </div>

        <div className="ali-analytics-card">
          <h3>Clinic Utilization</h3>
          <div className="ali-chart-placeholder">
            <i className="fas fa-clinic-medical"></i>
            <p>Appointments by clinic location</p>
          </div>
        </div>

        <div className="ali-analytics-card ali-wide">
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
          <div className="ali-chart-placeholder">
            <i className="fas fa-newspaper"></i>
            <p>Blog post views and engagement</p>
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

        <button className="ali-btn ali-btn-primary">
          <i className="fas fa-user-plus"></i>
          Add New User
        </button>
      </div>

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
                    <button className="ali-btn ali-btn-icon" title="Edit">
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

        <button className="ali-btn ali-btn-primary">
          <i className="fas fa-calendar-plus"></i>
          New Appointment
        </button>
      </div>

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
                    <button className="ali-btn ali-btn-icon" title="View">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="ali-btn ali-btn-icon" title="Edit">
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

// Clinics Page Component
const ClinicsPage = () => {
  const { data: clinics, isLoading } = useQuery({
    queryKey: ['clinics'],
    queryFn: fetchClinics,
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
        <h2>Clinic Management</h2>
        <div className="ali-page-subtitle">
          Manage all clinic locations and information
        </div>
      </div>

      <div className="ali-clinic-cards">
        {clinics?.map(clinic => (
          <div className="ali-clinic-card" key={clinic.id}>
            <div className="ali-clinic-header">
              <h3>{clinic.name}</h3>
              <div className="ali-clinic-actions">
                <button className="ali-btn ali-btn-icon">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            </div>
            <div className="ali-clinic-details">
              <div className="ali-clinic-address">
                <i className="fas fa-map-marker-alt"></i>
                <span>{clinic.address}</span>
              </div>
              <div className="ali-clinic-contact">
                <div className="ali-contact-item">
                  <i className="fas fa-phone"></i>
                  <span>{clinic.phone}</span>
                </div>
                <div className="ali-contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>{clinic.email}</span>
                </div>
              </div>
              <div className="ali-clinic-hours">
                <i className="fas fa-clock"></i>
                <span>{clinic.hours}</span>
              </div>
            </div>
            <div className="ali-clinic-doctors">
              <h4>Doctors:</h4>
              <div className="ali-doctors-list">
                {clinic.doctors.map((doctor, index) => (
                  <span key={index} className="ali-doctor-tag">{doctor}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="ali-btn ali-btn-primary ali-add-clinic">
        <i className="fas fa-plus"></i>
        Add New Clinic
      </button>
    </div>
  );
};

// Blog Page Component
const BlogPage = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: fetchBlogPosts,
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
          />
          <i className="fas fa-search"></i>
        </div>

        <div className="ali-filter-group">
          <label>Category:</label>
          <select>
            <option value="all">All Categories</option>
            <option value="nutrition">Nutrition</option>
            <option value="fitness">Fitness</option>
            <option value="health">Health</option>
            <option value="labor">Labor & Delivery</option>
          </select>
        </div>

        <div className="ali-filter-group">
          <label>Status:</label>
          <select>
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <button className="ali-btn ali-btn-primary">
          <i className="fas fa-plus"></i>
          New Post
        </button>
      </div>

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
            {posts?.map(post => (
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
                    <button className="ali-btn ali-btn-icon" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="ali-btn ali-btn-icon" title="View">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="ali-btn ali-btn-icon ali-danger" title="Delete">
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
  const { data: faqs, isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: fetchFAQs,
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
          />
          <i className="fas fa-search"></i>
        </div>

        <div className="ali-filter-group">
          <label>Category:</label>
          <select>
            <option value="all">All Categories</option>
            <option value="prenatal">Prenatal Care</option>
            <option value="pregnancy">Pregnancy Health</option>
            <option value="nutrition">Nutrition</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>

        <div className="ali-filter-group">
          <label>Status:</label>
          <select>
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <button className="ali-btn ali-btn-primary">
          <i className="fas fa-plus"></i>
          New FAQ
        </button>
      </div>

      <div className="ali-faq-list">
        {faqs?.map(faq => (
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
              <button className="ali-btn ali-btn-icon">
                <i className="fas fa-edit"></i>
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

// Health Hub Page Component
const HealthHubPage = () => {
  const { data: resources, isLoading } = useQuery({
    queryKey: ['healthhub'],
    queryFn: fetchHealthHub,
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
          />
          <i className="fas fa-search"></i>
        </div>

        <div className="ali-filter-group">
          <label>Category:</label>
          <select>
            <option value="all">All Categories</option>
            <option value="pregnancy">Pregnancy</option>
            <option value="postpartum">Postpartum</option>
            <option value="newborn">Newborn Care</option>
          </select>
        </div>

        <div className="ali-filter-group">
          <label>Status:</label>
          <select>
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <button className="ali-btn ali-btn-primary">
          <i className="fas fa-plus"></i>
          New Resource
        </button>
      </div>

      <div className="ali-resource-grid">
        {resources?.map(resource => (
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
            <div className="ali-resource-actions">
              <button className="ali-btn ali-btn-icon">
                <i className="fas fa-edit"></i>
              </button>
              <button className="ali-btn ali-btn-icon">
                <i className="fas fa-eye"></i>
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

// SMS Reminders Page Component
const SMSRemindersPage = () => {
  const { data: reminders, isLoading } = useQuery({
    queryKey: ['sms-reminders'],
    queryFn: fetchSMSReminders,
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
          />
          <i className="fas fa-search"></i>
        </div>

        <div className="ali-filter-group">
          <label>Status:</label>
          <select>
            <option value="all">All Statuses</option>
            <option value="delivered">Delivered</option>
            <option value="scheduled">Scheduled</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <button className="ali-btn ali-btn-primary">
          <i className="fas fa-plus"></i>
          New Reminder
        </button>
      </div>

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
            {reminders?.map(reminder => (
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
                    <button className="ali-btn ali-btn-icon" title="Resend">
                      <i className="fas fa-redo"></i>
                    </button>
                    <button className="ali-btn ali-btn-icon ali-danger" title="Delete">
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
  const { data: logs, isLoading } = useQuery({
    queryKey: ['emergency-logs'],
    queryFn: fetchEmergencyLogs,
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
          />
          <i className="fas fa-search"></i>
        </div>

        <div className="ali-filter-group">
          <label>Status:</label>
          <select>
            <option value="all">All Statuses</option>
            <option value="resolved">Resolved</option>
            <option value="pending">Pending</option>
            <option value="escalated">Escalated</option>
          </select>
        </div>

        <div className="ali-filter-group">
          <label>Type:</label>
          <select>
            <option value="all">All Types</option>
            <option value="cramping">Severe Cramping</option>
            <option value="bleeding">Vaginal Bleeding</option>
            <option value="movement">Decreased Fetal Movement</option>
          </select>
        </div>
      </div>

      <div className="ali-emergency-logs">
        {logs?.map(log => (
          <div className={`ali-emergency-card ${log.status}`} key={log.id}>
            <div className="ali-emergency-header">
              <h3>{log.patientName}</h3>
              <div className="ali-emergency-meta">
                <span className="ali-emergency-date">
                  {new Date(log.date).toLocaleString()}
                </span>
                <span className={`ali-status-badge ${log.status}`}>
                  {log.status}
                </span>
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    setIsEditing(false);
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
                <button type="submit" className="ali-btn ali-btn-primary">
                  <i className="fas fa-save"></i>
                  Save Changes
                </button>
                <button 
                  type="button" 
                  className="ali-btn ali-btn-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(settings);
                  }}
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

// Pages Management Component
const PagesPage = () => {
  const { data: pages, isLoading } = useQuery({
    queryKey: ['pages'],
    queryFn: fetchPages,
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
        <h2>Pages Management</h2>
        <div className="ali-page-subtitle">
          Manage website pages and content
        </div>
      </div>

      <div className="ali-pages-tools">
        <div className="ali-search-filter">
          <input
            type="text"
            placeholder="Search pages..."
          />
          <i className="fas fa-search"></i>
        </div>

        <div className="ali-filter-group">
          <label>Status:</label>
          <select>
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <button className="ali-btn ali-btn-primary">
          <i className="fas fa-plus"></i>
          New Page
        </button>
      </div>

      <div className="ali-pages-table-container">
        <table className="ali-pages-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages?.map(page => (
              <tr key={page.id}>
                <td>{page.title}</td>
                <td>/{page.slug}</td>
                <td>
                  <span className={`ali-status-badge ${page.status}`}>
                    {page.status}
                  </span>
                </td>
                <td>{page.lastUpdated}</td>
                <td>
                  <div className="ali-action-buttons">
                    <button className="ali-btn ali-btn-icon" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="ali-btn ali-btn-icon" title="View">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="ali-btn ali-btn-icon ali-danger" title="Delete">
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

// Dashboard Home Component
const DashboardHome = () => {
  const { data: stats } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchStats,
    refetchInterval: 30000,
  });

  const navigate = useNavigate();

  const generateReport = () => {
    console.log('Generating comprehensive report...');
  };

  const quickActions = [
    {
      icon: "fas fa-user-plus",
      title: "Add New Patient",
      description: "Register a new patient",
      action: () => navigate('/admin/users/new')
    },
    {
      icon: "fas fa-calendar-plus",
      title: "Schedule Appointment",
      description: "Book a new appointment",
      action: () => navigate('/admin/appointments/new')
    },
    {
      icon: "fas fa-ambulance",
      title: "Emergency Protocol",
      description: "Handle emergency cases",
      action: () => navigate('/admin/emergency-logs')
    },
    {
      icon: "fas fa-chart-bar",
      title: "View Reports",
      description: "Generate analytics",
      action: () => navigate('/admin/analytics')
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

      <StatsCard />

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

      <RecentAppointments />
      <RecentUser />

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
const AdminSidebar = ({ isCollapsed, toggleCollapse, user }) => {
  const location = useLocation();
  const { data: stats } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchStats,
  });

  const menuItems = [
    {
      section: "Main",
      items: [
        { path: "/admin", icon: "fas fa-home", label: "Dashboard", active: location.pathname === "/admin" || location.pathname === "/" },
        { path: "/admin/analytics", icon: "fas fa-chart-line", label: "Analytics" }
      ]
    },
    {
      section: "Content Management",
      items: [
        { path: "/admin/users", icon: "fas fa-users", label: "User Management" },
        { path: "/admin/appointments", icon: "fas fa-calendar-check", label: "Appointments", badge: stats?.todayAppointments || 0 },
        { path: "/admin/clinics", icon: "fas fa-clinic-medical", label: "Clinics" },
        { path: "/admin/blog", icon: "fas fa-newspaper", label: "Blog" },
        { path: "/admin/faqs", icon: "fas fa-question-circle", label: "FAQs" },
        { path: "/admin/healthhub", icon: "fas fa-book", label: "Health Hub" },
        { path: "/admin/sms-reminders", icon: "fas fa-bell", label: "SMS Reminders" },
        { path: "/admin/emergency-logs", icon: "fas fa-exclamation-triangle", label: "Emergency Logs", badge: stats?.emergencyAlerts || 0 }
      ]
    },
    {
      section: "System",
      items: [
        { path: "/admin/settings", icon: "fas fa-cog", label: "Settings" },
        { path: "/admin/pages", icon: "fas fa-file-alt", label: "Pages" }
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
                  <Link 
                    to={item.path}
                    className={`${location.pathname === item.path || item.active ? 'ali-active' : ''}`}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                    {item.badge && <span className="ali-badge">{item.badge}</span>}
                  </Link>
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
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      // Perform search
      console.log('Searching for:', e.target.value);
      // In a real app, you would call an API here
    }
  };

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate('/admin/search?q=' + encodeURIComponent(searchQuery));
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
              <div className="ali-menu-item" onClick={() => navigate('/admin/profile')}>
                <i className="fas fa-user"></i>
                <span>My Profile</span>
              </div>
              <div className="ali-menu-item" onClick={() => navigate('/admin/settings')}>
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

// StatsCard Component
const StatsCard = () => {
  const { data: stats } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchStats,
  });

  const statsData = [
    {
      title: "Total Patients",
      value: stats?.totalPatients || 0,
      change: "+12.5%",
      changeType: "ali-positive",
      icon: "fas fa-users",
      iconClass: "ali-primary"
    },
    {
      title: "Active Pregnancies",
      value: stats?.activePregnancies || 0,
      change: "+8.3%",
      changeType: "ali-positive",
      icon: "fas fa-baby",
      iconClass: "ali-success"
    },
    {
      title: "Today's Appointments",
      value: stats?.todayAppointments || 0,
      change: "-3.1%",
      changeType: "ali-negative",
      icon: "fas fa-calendar-check",
      iconClass: "ali-warning"
    },
    {
      title: "Emergency Alerts",
      value: stats?.emergencyAlerts || 0,
      change: "-25%",
      changeType: "ali-positive",
      icon: "fas fa-exclamation-triangle",
      iconClass: "ali-info"
    }
  ];

  return (
    <div className="ali-stats-cards">
      {statsData.map((stat, index) => (
        <div key={index} className="ali-stat-card">
          <div className="ali-stat-card-header">
            <h3>{stat.title}</h3>
            <div className={`ali-stat-card-icon ${stat.iconClass}`}>
              <i className={stat.icon}></i>
            </div>
          </div>
          <div className="ali-value">{stat.value.toLocaleString()}</div>
          <div className={`ali-change ${stat.changeType}`}>
            <i className={`fas fa-arrow-${stat.changeType === 'ali-positive' ? 'up' : 'down'}`}></i>
            <span>{stat.change}</span> from last month
          </div>
        </div>
      ))}
    </div>
  );
};

// RecentUser Component
const RecentUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId) => apiRequest('DELETE', `/api/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      queryClient.invalidateQueries(['dashboard', 'stats']);
    },
  });

  const handleViewUser = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleEditUser = (userId) => {
    navigate(`/admin/users/edit/${userId}`);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUserMutation.mutate(userId);
    }
  };

  const recentUsers = (users || [])
    .filter(user => user.role === 'patient')
    .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
    .slice(0, 5);

  return (
    <div className="ali-card">
      <div className="ali-card-header">
        <h3>Recent Patient Registrations</h3>
        <button 
          className="ali-btn ali-btn-primary"
          onClick={() => navigate('/admin/users')}
        >
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
            {recentUsers.map((user) => (
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
                  <button 
                    className="ali-action-btn ali-view"
                    onClick={() => handleViewUser(user.id)}
                  >
                    View
                  </button>
                  <button 
                    className="ali-action-btn ali-edit"
                    onClick={() => handleEditUser(user.id)}
                  >
                    Edit
                  </button>
                  {user.status === 'inactive' && (
                    <button 
                      className="ali-action-btn ali-delete"
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={deleteUserMutation.isLoading}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {recentUsers.length === 0 && (
          <div className="ali-no-results">
            <i className="fas fa-user-slash"></i>
            <p>No recent patient registrations found</p>
          </div>
        )}
      </div>
    </div>
  );
};

// RecentAppointments Component
const RecentAppointments = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { data: appointments } = useQuery({
    queryKey: ['appointments', 'today'],
    queryFn: fetchAppointments,
  });

  const updateAppointmentMutation = useMutation({
    mutationFn: ({ id, data }) => apiRequest('PUT', `/api/appointments/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      queryClient.invalidateQueries(['dashboard', 'stats']);
    },
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: (appointmentId) => apiRequest('DELETE', `/api/appointments/${appointmentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      queryClient.invalidateQueries(['dashboard', 'stats']);
    },
  });

  const handleViewAppointment = (appointmentId) => {
    navigate(`/admin/appointments/${appointmentId}`);
  };

  const handleEditAppointment = (appointmentId) => {
    navigate(`/admin/appointments/edit/${appointmentId}`);
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointmentMutation.mutate(appointmentId);
    }
  };

  const viewAllAppointments = () => {
    navigate('/admin/appointments');
  };

  const today = new Date().toISOString().split('T')[0];
  const todaysAppointments = (appointments || [])
    .filter(appt => appt.date === today)
    .sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime));

  return (
    <div className="ali-card">
      <div className="ali-card-header">
        <h3>Today's Appointments</h3>
        <button className="ali-btn ali-btn-primary" onClick={viewAllAppointments}>
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
            {todaysAppointments.map((appointment) => (
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
                  <button 
                    className="ali-action-btn ali-view"
                    onClick={() => handleViewAppointment(appointment.id)}
                  >
                    View
                  </button>
                  <button 
                    className="ali-action-btn ali-edit"
                    onClick={() => handleEditAppointment(appointment.id)}
                  >
                    Edit
                  </button>
                  {appointment.status === 'cancelled' && (
                    <button 
                      className="ali-action-btn ali-delete"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      disabled={deleteAppointmentMutation.isLoading}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {todaysAppointments.length === 0 && (
          <div className="ali-no-results">
            <i className="fas fa-calendar-times"></i>
            <p>No appointments scheduled for today</p>
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
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: "Dr. Sarah Johnson",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
  };

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

  const logout = () => {
    console.log('User logged out');
    navigate('/login');
  };

  return (
    <div className="ali-dashboard-container">
      <AdminSidebar 
        isCollapsed={isCollapsed} 
        toggleCollapse={toggleCollapse}
        user={user}
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
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/admin" element={<DashboardHome />} />
            <Route path="/admin/analytics" element={<AnalyticsPage />} />
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/admin/appointments" element={<AppointmentsPage />} />
            <Route path="/admin/clinics" element={<ClinicsPage />} />
            <Route path="/admin/blog" element={<BlogPage />} />
            <Route path="/admin/faqs" element={<FAQsPage />} />
            <Route path="/admin/healthhub" element={<HealthHubPage />} />
            <Route path="/admin/sms-reminders" element={<SMSRemindersPage />} />
            <Route path="/admin/emergency-logs" element={<EmergencyLogsPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
            <Route path="/admin/pages" element={<PagesPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;