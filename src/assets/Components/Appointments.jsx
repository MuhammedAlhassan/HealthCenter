import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Appointments = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    type: 'routine',
    date: '',
    time: '',
    provider: '',
    notes: ''
  });

  // Initialize appointments from localStorage or with default values
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem('appointments');
    return savedAppointments ? JSON.parse(savedAppointments) : {
      upcoming: [],
      past: []
    };
  });

  const providers = [
    'Dr. Sarah Johnson - Obstetrician',
    'Dr. Michael Adebayo - Gynecologist',
    'Dr. Fatima Ibrahim - Midwife',
    'Dr. John Okafor - General Practitioner'
  ];

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    // Save current user's appointments under a unique key
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.id) {
      localStorage.setItem(`appointments_${currentUser.id}` , JSON.stringify(appointments));
    }
    // For backward compatibility, also update the generic 'appointments' key
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // --- Robustly sync ALL user appointments to adminAppointments ---
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let allAdminAppointments = [];
    users.forEach(user => {
      let userAppointments = JSON.parse(localStorage.getItem(`appointments_${user.id}`) || '{"upcoming":[],"past":[]}');
      // If this is the current user, use the latest state
      if (user.id === currentUser.id) {
        userAppointments = appointments;
      }
      const allUserAppointments = [...(userAppointments.upcoming || []), ...(userAppointments.past || [])];
      allUserAppointments.forEach(appt => {
        let doctorId = '';
        let doctorName = appt.provider;
        if (appt.provider) {
          const providerName = appt.provider.split(' - ')[0].replace('Dr. ', '').trim();
          const [firstName, ...lastNameParts] = providerName.split(' ');
          const lastName = lastNameParts.join(' ');
          const doctor = users.find(u => u.role === 'doctor' && u.firstName === firstName && u.lastName === lastName);
          if (doctor) {
            doctorId = doctor.id;
            doctorName = `${doctor.firstName} ${doctor.lastName}`;
          }
        }
        allAdminAppointments.push({
          id: appt.id,
          patientId: appt.patientId,
          patientName: appt.patientName,
          doctorId,
          doctorName,
          date: appt.date,
          time: appt.time,
          type: appt.type,
          status: appt.status,
          notes: appt.notes,
          location: appt.location || '',
        });
      });
    });
    localStorage.setItem('adminAppointments', JSON.stringify(allAdminAppointments));
    // --- End robust sync ---

    // Check for appointments that should move from upcoming to past
    const now = new Date();
    const upcoming = appointments.upcoming.filter(appt => {
      const apptDate = new Date(`${appt.date}T${appt.time}`);
      return apptDate > now;
    });
    const past = [...appointments.past];
    let moved = false;
    appointments.upcoming.forEach(appt => {
      const apptDate = new Date(`${appt.date}T${appt.time}`);
      if (apptDate <= now) {
        past.push({ ...appt, status: 'completed' });
        moved = true;
        // Update admin appointments when moving to past
        updateAdminAppointmentStatus(appt.id, 'completed');
      }
    });
    if (moved) {
      // Prevent infinite loop by only updating if changed
      setAppointments(prev => ({ ...prev, upcoming, past }));
    }
  }, [appointments]);

  // Helper function to update admin appointment status
  const updateAdminAppointmentStatus = (appointmentId, newStatus) => {
    const adminAppointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');
    const updatedAdminAppointments = adminAppointments.map(appt => 
      appt.id === appointmentId ? { ...appt, status: newStatus } : appt
    );
    localStorage.setItem('adminAppointments', JSON.stringify(updatedAdminAppointments));
    
    // Add notification for admin
    const appointment = appointments.upcoming.find(a => a.id === appointmentId);
    if (appointment) {
      const adminNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      adminNotifications.unshift({
        id: Date.now(),
        title: `Appointment ${newStatus === 'completed' ? 'Completed' : 'Updated'}`,
        message: `Appointment for ${appointment.patientName} on ${appointment.date} has been marked as ${newStatus}`,
        time: new Date().toISOString(),
        unread: true,
        icon: 'calendar-check'
      });
      localStorage.setItem('adminNotifications', JSON.stringify(adminNotifications));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  // After booking an appointment, also add it to adminAppointments for admin dashboard
  const handleBooking = (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const newAppointment = {
      id: Date.now(),
      type: bookingForm.type === 'routine' ? 'Routine Checkup' : 
            bookingForm.type === 'ultrasound' ? 'Ultrasound' :
            bookingForm.type === 'blood-test' ? 'Blood Test' :
            bookingForm.type === 'consultation' ? 'Consultation' : 'Emergency Visit',
      date: bookingForm.date,
      time: bookingForm.time,
      provider: bookingForm.provider,
      location: bookingForm.provider.includes('Lagos University') ? 
               'Lagos University Teaching Hospital' : 'First City Hospital',
      status: 'scheduled',
      patientName: `${currentUser.firstName} ${currentUser.lastName}`,
      patientId: currentUser.id,
      notes: bookingForm.notes || ''
    };
    
    // Update patient appointments
    setAppointments(prev => ({
      ...prev,
      upcoming: [...prev.upcoming, newAppointment]
    }));
    
    // Update admin appointments
    const adminAppointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');
    
    // Find doctor ID from provider name
    const providerName = bookingForm.provider.split(' - ')[0].replace('Dr. ', '').trim();
    const [firstName, ...lastNameParts] = providerName.split(' ');
    const lastName = lastNameParts.join(' ');
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const doctor = users.find(u => 
      u.role === 'doctor' && 
      u.firstName === firstName && 
      u.lastName === lastName
    );
    
    const adminNewAppointment = {
      id: newAppointment.id,
      patientId: currentUser.id,
      patientName: newAppointment.patientName,
      doctorId: doctor?.id || '',
      doctorName: bookingForm.provider,
      date: bookingForm.date,
      time: bookingForm.time,
      type: newAppointment.type,
      status: 'scheduled',
      notes: bookingForm.notes,
      location: newAppointment.location
    };
    
    adminAppointments.push(adminNewAppointment);
    localStorage.setItem('adminAppointments', JSON.stringify(adminAppointments));
    
    // Add notification for admin
    const adminNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    adminNotifications.unshift({
      id: Date.now(),
      title: 'New Appointment Booked',
      message: `Appointment booked for ${adminNewAppointment.patientName} with ${adminNewAppointment.doctorName} on ${adminNewAppointment.date} at ${adminNewAppointment.time}`,
      time: new Date().toISOString(),
      unread: true,
      icon: 'calendar-plus'
    });
    localStorage.setItem('adminNotifications', JSON.stringify(adminNotifications));
    
    setShowBookingModal(false);
    setBookingForm({ type: 'routine', date: '', time: '', provider: '', notes: '' });
  };

  const rescheduleAppointment = (appointmentId) => {
    const appointment = appointments.upcoming.find(a => a.id === appointmentId);
    if (appointment) {
      setBookingForm({
        type: appointment.type.toLowerCase().replace(' ', '-'),
        date: appointment.date,
        time: appointment.time,
        provider: appointment.provider,
        notes: ''
      });
      cancelAppointment(appointmentId);
      setShowBookingModal(true);
    }
  };

  const cancelAppointment = (appointmentId) => {
    // Update patient appointments
    setAppointments(prev => ({
      ...prev,
      upcoming: prev.upcoming.filter(a => a.id !== appointmentId),
      past: prev.past.filter(a => a.id !== appointmentId)
    }));

    // Update admin appointments
    const adminAppointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');
    const updatedAdminAppointments = adminAppointments.filter(a => a.id !== appointmentId);
    localStorage.setItem('adminAppointments', JSON.stringify(updatedAdminAppointments));

    // Add notification for admin
    const appointment = appointments.upcoming.find(a => a.id === appointmentId);
    if (appointment) {
      const adminNotifications = JSON.parse(localStorage.getItem('adminNotifications') || []);
      adminNotifications.unshift({
        id: Date.now(),
        title: "Appointment Cancelled",
        message: `Appointment for ${appointment.patientName} on ${appointment.date} has been cancelled`,
        time: new Date().toISOString(),
        unread: true,
        icon: 'calendar-times'
      });
      localStorage.setItem('adminNotifications', JSON.stringify(adminNotifications));
    }
  };

  const joinVideoCall = () => {
    navigate('/videocall');
  };

  const bookFollowUp = (appointmentId) => {
    const appointment = appointments.past.find(a => a.id === appointmentId);
    if (appointment) {
      setBookingForm({
        type: appointment.type.toLowerCase().replace(' ', '-'),
        date: '',
        time: '',
        provider: appointment.provider,
        notes: `Follow-up for ${appointment.type} on ${formatDate(appointment.date)}`
      });
      setShowBookingModal(true);
    }
  };

  return (
    <div className="appointments-page">
      <div className="appointments-container">
        <div className="appointments-header">
          <h1 className="appointments-title">My Appointments</h1>
          <button 
            onClick={() => setShowBookingModal(true)}
            className="btn btn-primary"
          >
            <i className="fas fa-plus mr-2"></i>
            Book Appointment
          </button>
        </div>

        <div className="appointments-tabs">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
          >
            Upcoming ({appointments.upcoming.length})
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
          >
            Past ({appointments.past.length})
          </button>
        </div>

        <div className="appointments-content">
          {activeTab === 'upcoming' && (
            <div className="appointments-list">
              {appointments.upcoming.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-calendar-check empty-icon"></i>
                  <h3>No Upcoming Appointments</h3>
                  <p>You don't have any scheduled appointments yet.</p>
                  <button 
                    onClick={() => setShowBookingModal(true)}
                    className="btn btn-primary"
                  >
                    Book Your First Appointment
                  </button>
                </div>
              ) : (
                appointments.upcoming.map(appointment => (
                  <div key={appointment.id} className="appointment-card upcoming">
                    <div className="appointment-header">
                      <div className="appointment-type-badge">{appointment.type}</div>
                      <div className={`appointment-status ${appointment.status}`}>
                        {appointment.status}
                      </div>
                    </div>
                    
                    <div className="appointment-details">
                      <div className="appointment-datetime">
                        <div className="appointment-date">
                          <i className="fas fa-calendar mr-2"></i>
                          {formatDate(appointment.date)}
                        </div>
                        <div className="appointment-time">
                          <i className="fas fa-clock mr-2"></i>
                          {formatTime(appointment.time)}
                        </div>
                      </div>
                      
                      <div className="appointment-provider">
                        <i className="fas fa-user-md mr-2"></i>
                        {appointment.provider}
                      </div>
                      
                      <div className="appointment-location">
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        {appointment.location}
                      </div>
                    </div>
                    
                    <div className="appointment-actions">
                      <button 
                        onClick={() => rescheduleAppointment(appointment.id)}
                        className="btn btn-outline btn-sm"
                      >
                        Reschedule
                      </button>
                      <button 
                        onClick={() => cancelAppointment(appointment.id)}
                        className="btn btn-destructive btn-sm"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={joinVideoCall}
                        className="btn btn-primary btn-sm"
                      >
                        Join Video Call
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="appointments-list">
              {appointments.past.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-history empty-icon"></i>
                  <h3>No Past Appointments</h3>
                  <p>Your appointment history will appear here.</p>
                </div>
              ) : (
                appointments.past.map(appointment => (
                  <div key={appointment.id} className="appointment-card past">
                    <div className="appointment-header">
                      <div className="appointment-type-badge">{appointment.type}</div>
                      <div className="appointment-status completed">
                        {appointment.status}
                      </div>
                    </div>
                    
                    <div className="appointment-details">
                      <div className="appointment-datetime">
                        <div className="appointment-date">
                          <i className="fas fa-calendar mr-2"></i>
                          {formatDate(appointment.date)}
                        </div>
                        <div className="appointment-time">
                          <i className="fas fa-clock mr-2"></i>
                          {formatTime(appointment.time)}
                        </div>
                      </div>
                      
                      <div className="appointment-provider">
                        <i className="fas fa-user-md mr-2"></i>
                        {appointment.provider}
                      </div>
                      
                      <div className="appointment-location">
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        {appointment.location}
                      </div>
                    </div>
                    
                    <div className="appointment-actions">
                      <button 
                        onClick={() => bookFollowUp(appointment.id)}
                        className="btn btn-primary btn-sm"
                      >
                        Book Follow-up
                      </button>
                      <button 
                        onClick={() => cancelAppointment(appointment.id)}
                        className="btn btn-destructive btn-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {showBookingModal && (
          <div className="modal-overlay">
            <div className="booking-modal animate-scale-in">
              <div className="modal-header">
                <h2>Book New Appointment</h2>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="modal-close-btn"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <form onSubmit={handleBooking} className="booking-form">
                <div className="form-group">
                  <label className="label">Appointment Type</label>
                  <select 
                    className="input"
                    value={bookingForm.type}
                    onChange={(e) => setBookingForm({...bookingForm, type: e.target.value})}
                    required
                  >
                    <option value="routine">Routine Checkup</option>
                    <option value="ultrasound">Ultrasound</option>
                    <option value="blood-test">Blood Test</option>
                    <option value="consultation">Consultation</option>
                    <option value="emergency">Emergency Visit</option>
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="label">Date</label>
                    <input
                      className="input"
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">Time</label>
                    <input
                      className="input"
                      type="time"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="label">Healthcare Provider</label>
                  <select 
                    className="input"
                    value={bookingForm.provider}
                    onChange={(e) => setBookingForm({...bookingForm, provider: e.target.value})}
                    required
                  >
                    <option value="">Select Provider</option>
                    {providers.map((provider, index) => (
                      <option key={index} value={provider}>{provider}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="label">Additional Notes (Optional)</label>
                  <textarea
                    className="textarea"
                    placeholder="Any specific concerns or symptoms..."
                    value={bookingForm.notes}
                    onChange={e => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-calendar-check mr-2"></i>
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* ...existing code for quick actions, etc... */}
      </div>
    </div>
  );
};

export default Appointments;
