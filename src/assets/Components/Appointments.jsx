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
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
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
      }
    });
    
    if (moved) {
      setAppointments({ upcoming, past });
    }
  }, [appointments]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const handleBooking = (e) => {
    e.preventDefault();
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
      status: 'confirmed'
    };
    
    setAppointments(prev => ({
      ...prev,
      upcoming: [...prev.upcoming, newAppointment]
    }));
    
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
    setAppointments(prev => ({
      ...prev,
      upcoming: prev.upcoming.filter(a => a.id !== appointmentId),
      past: prev.past.filter(a => a.id !== appointmentId)
    }));
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
            Emergency ({appointments.past.length})
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
                    onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                  />
                </div>
                
                <div className="modal-actions">
                  <button 
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="quick-appointment-actions">
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            <div className="quick-action-card">
              <div className="quick-action-icon emergency">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3>Emergency Booking</h3>
              <p>Book urgent appointment within 24 hours</p>
              <div className="quick-action-buttons">
                <button 
                  onClick={() => {
                    setBookingForm({
                      type: 'emergency',
                      date: new Date().toISOString().split('T')[0],
                      time: '',
                      provider: '',
                      notes: 'EMERGENCY - Please call immediately'
                    });
                    setShowBookingModal(true);
                  }}
                  className="btn btn-destructive"
                >
                  Book Emergency
                </button>
              
              </div>
            </div>
            
            <div className="quick-action-card">
              <div className="quick-action-icon telemedicine">
                <i className="fas fa-video"></i>
              </div>
              <h3>Telemedicine</h3>
              <p>Virtual consultation from home</p>
              <div className="quick-action-buttons">
                <button 
                  onClick={joinVideoCall}
                  className="btn btn-secondary"
                >
                  Start Video Call
                </button>
               
              </div>
            </div>
            
            <div className="quick-action-card">
              <div className="quick-action-icon reminder">
                <i className="fas fa-bell"></i>
              </div>
              <h3>SMS Reminders</h3>
              <p>Get appointment reminders via SMS</p>
              <div className="quick-action-buttons">
                <button 
                  onClick={() => navigate('/sms')}
                  className="btn btn-primary"
                >
                  Setup Reminders
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;