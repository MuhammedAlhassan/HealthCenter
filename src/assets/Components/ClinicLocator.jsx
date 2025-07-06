import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure icons load
import './ClinicLocator';

const ClinicLocator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const clinics = [
    // Hospitals (6)
    {
      id: 1,
      name: "Lagos University Teaching Hospital",
      type: "Hospital",
      address: "Idi-Araba, Surulere, Lagos",
      phone: "+234-1-793-0240",
      distance: "2.3 km",
      rating: 4.5,
      services: ["Obstetrics", "Gynecology", "Pediatrics", "Emergency", "Surgery", "ICU"],
      availability: "24/7",
      specialties: ["High-risk pregnancies", "Cesarean delivery", "NICU", "Fetal surgery"],
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400"
    },
    {
      id: 2,
      name: "Reddington Hospital",
      type: "Hospital",
      address: "Lekki Phase 1, Lagos",
      phone: "+234-1-271-5400",
      distance: "8.7 km",
      rating: 4.6,
      services: ["Obstetrics", "Pediatrics", "ICU", "Emergency", "Laboratory", "Pharmacy"],
      availability: "24/7",
      specialties: ["Advanced maternal care", "Fetal medicine", "NICU level III"],
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400"
    },
    {
      id: 3,
      name: "First City Hospital",
      type: "Hospital",
      address: "Victoria Island, Lagos",
      phone: "+234-1-271-0100",
      distance: "5.1 km",
      rating: 4.7,
      services: ["Obstetrics", "Gynecology", "Laboratory", "Pharmacy", "Ultrasound"],
      availability: "24/7",
      specialties: ["Natural birth", "Water birth", "Postpartum care"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400"
    },
    {
      id: 4,
      name: "St. Nicholas Hospital",
      type: "Hospital",
      address: "57 Campbell St, Lagos Island",
      phone: "+234-1-270-0000",
      distance: "4.5 km",
      rating: 4.4,
      services: ["Maternity", "Neonatal", "Surgical", "Radiology", "Pharmacy"],
      availability: "24/7",
      specialties: ["Premature birth care", "Maternal-fetal medicine"],
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400"
    },
    {
      id: 5,
      name: "Eko Hospital",
      type: "Hospital",
      address: "31 Mobolaji Bank Anthony Way, Ikeja",
      phone: "+234-1-279-5600",
      distance: "3.2 km",
      rating: 4.3,
      services: ["Obstetrics", "Gynecology", "Pediatrics", "Surgery", "Emergency"],
      availability: "24/7",
      specialties: ["Multiple birth care", "High-risk pregnancy management"],
      image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=400"
    },
    {
      id: 6,
      name: "Lagoon Hospitals",
      type: "Hospital",
      address: "17 Bourdillon Rd, Ikoyi",
      phone: "+234-1-270-4000",
      distance: "6.8 km",
      rating: 4.8,
      services: ["Maternity", "Neonatal ICU", "Fertility", "Surgery", "Emergency"],
      availability: "24/7",
      specialties: ["Infertility treatments", "High-risk neonatal care"],
      image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400"
    },

    // Clinics (6)
    {
      id: 7,
      name: "Maternal Health Center Ikeja",
      type: "Clinic",
      address: "Allen Avenue, Ikeja, Lagos",
      phone: "+234-1-774-2100",
      distance: "3.8 km",
      rating: 4.2,
      services: ["Antenatal Care", "Family Planning", "Ultrasound", "Vaccinations"],
      availability: "Mon-Sat 8AM-6PM",
      specialties: ["Prenatal care", "Birth preparation", "Breastfeeding support"],
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400"
    },
    {
      id: 8,
      name: "The Bridge Clinic",
      type: "Clinic",
      address: "25 Isaac John St, GRA, Ikeja",
      phone: "+234-1-271-5650",
      distance: "4.0 km",
      rating: 4.1,
      services: ["Fertility", "Prenatal", "Gynecology", "Ultrasound"],
      availability: "Mon-Fri 8AM-5PM, Sat 9AM-2PM",
      specialties: ["Fertility treatments", "Prenatal diagnostics"],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400"
    },
    {
      id: 9,
      name: "Optimum Specialist Clinic",
      type: "Clinic",
      address: "3 Akin Ogunlewe St, Victoria Island",
      phone: "+234-1-461-5100",
      distance: "5.5 km",
      rating: 4.0,
      services: ["Prenatal", "Postnatal", "Family Planning", "Well-woman"],
      availability: "Mon-Fri 8AM-6PM, Sat 9AM-3PM",
      specialties: ["Prenatal yoga", "Birth planning"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400"
    },
    {
      id: 10,
      name: "LifeSpring Clinics",
      type: "Clinic",
      address: "12A Admiralty Way, Lekki Phase 1",
      phone: "+234-1-280-5000",
      distance: "9.2 km",
      rating: 4.3,
      services: ["Antenatal", "Delivery", "Postnatal", "Pediatrics"],
      availability: "Mon-Sat 8AM-7PM",
      specialties: ["Natural childbirth", "Water birth"],
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400"
    },
    {
      id: 11,
      name: "The Women's Clinic",
      type: "Clinic",
      address: "14A Bayo Kuku Rd, Ikoyi",
      phone: "+234-1-271-2000",
      distance: "6.5 km",
      rating: 4.4,
      services: ["Prenatal", "Gynecology", "Family Planning", "Mammography"],
      availability: "Mon-Fri 8AM-5PM, Sat 9AM-1PM",
      specialties: ["Women's wellness", "Breast health"],
      image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=400"
    },
    {
      id: 12,
      name: "Newborn & Mothercare Clinic",
      type: "Clinic",
      address: "23 Karimu Kotun St, Victoria Island",
      phone: "+234-1-461-6000",
      distance: "5.3 km",
      rating: 4.2,
      services: ["Neonatal", "Postnatal", "Lactation", "Vaccinations"],
      availability: "Mon-Sat 9AM-5PM",
      specialties: ["Newborn care", "Breastfeeding support"],
      image: "https://images.unsplash.com/photo-1571277120471-698a0b0a9244?w=400"
    },

    // Primary Care (6)
    {
      id: 13,
      name: "Community Health Center Yaba",
      type: "Primary Care",
      address: "Herbert Macaulay Way, Yaba, Lagos",
      phone: "+234-1-773-4500",
      distance: "4.2 km",
      rating: 4.0,
      services: ["Basic Antenatal", "Immunization", "Health Education", "Checkups"],
      availability: "Mon-Fri 8AM-4PM",
      specialties: ["Preventive care", "Health screenings", "Community outreach"],
      image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400"
    },
    {
      id: 14,
      name: "Lagos Island Maternity Center",
      type: "Primary Care",
      address: "45 Broad St, Lagos Island",
      phone: "+234-1-270-3500",
      distance: "5.0 km",
      rating: 3.9,
      services: ["Basic Delivery", "Antenatal", "Postnatal", "Immunization"],
      availability: "Mon-Fri 8AM-5PM",
      specialties: ["Low-risk deliveries", "Basic maternal care"],
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400"
    },
    {
      id: 15,
      name: "Surulere Health Center",
      type: "Primary Care",
      address: "Bode Thomas St, Surulere",
      phone: "+234-1-774-3000",
      distance: "2.8 km",
      rating: 3.8,
      services: ["Prenatal", "Family Planning", "Child Health", "Nutrition"],
      availability: "Mon-Fri 8AM-4PM",
      specialties: ["Nutrition counseling", "Basic prenatal care"],
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"
    },
    {
      id: 16,
      name: "Ikeja General Health Center",
      type: "Primary Care",
      address: "Obafemi Awolowo Way, Ikeja",
      phone: "+234-1-497-2000",
      distance: "3.5 km",
      rating: 3.7,
      services: ["Basic Maternity", "Child Health", "Immunization", "Checkups"],
      availability: "Mon-Fri 8AM-4PM",
      specialties: ["Routine checkups", "Basic maternal services"],
      image: "https://images.unsplash.com/photo-1576091161244-33a0727c1f19?w=400"
    },
    {
      id: 17,
      name: "Apapa Community Clinic",
      type: "Primary Care",
      address: "32 Burma Rd, Apapa",
      phone: "+234-1-587-1000",
      distance: "7.2 km",
      rating: 3.6,
      services: ["Basic Antenatal", "Postnatal", "Family Planning", "Vaccinations"],
      availability: "Mon-Fri 8AM-4PM",
      specialties: ["Community health", "Basic women's health"],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400"
    },
    {
      id: 18,
      name: "Agege Maternal Center",
      type: "Primary Care",
      address: "Old Abeokuta Motor Rd, Agege",
      phone: "+234-1-497-3000",
      distance: "6.0 km",
      rating: 3.5,
      services: ["Basic Delivery", "Antenatal", "Postnatal", "Child Health"],
      availability: "Mon-Fri 8AM-4PM",
      specialties: ["Basic deliveries", "Maternal education"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400"
    }
  ];

  const filteredClinics = clinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         clinic.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || clinic.type.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleDirections = (clinic) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${clinic.address}`;
      window.open(url, '_blank');
    } else {
      const url = `https://www.google.com/maps/search/${clinic.address}`;
      window.open(url, '_blank');
    }
  };

  const handleCall = () => {
    const phoneNumber = "+2348167769208";
    window.open(`tel:+2348167769208`, '_blank');
  };

  return (
    <div className="clinic-locator-page">
      <div className="clinic-locator-container">
        <div className="clinic-locator-header">
          <h1 className="clinic-locator-title">Find Healthcare Facilities</h1>
          <p className="clinic-locator-description">
            Locate nearby maternal health clinics and hospitals with real-time availability
          </p>
        </div>

        <div className="search-filters">
          <div className="search-bar">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-buttons">
            <button 
              onClick={() => setSelectedFilter('all')}
              className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
            >
              All
            </button>
            <button 
              onClick={() => setSelectedFilter('hospital')}
              className={`filter-btn ${selectedFilter === 'hospital' ? 'active' : ''}`}
            >
              Hospitals
            </button>
            <button 
              onClick={() => setSelectedFilter('clinic')}
              className={`filter-btn ${selectedFilter === 'clinic' ? 'active' : ''}`}
            >
              Clinics
            </button>
            <button 
              onClick={() => setSelectedFilter('primary care')}
              className={`filter-btn ${selectedFilter === 'primary care' ? 'active' : ''}`}
            >
              Primary Care
            </button>
          </div>
        </div>

        <div className="clinics-grid">
          {filteredClinics.map(clinic => (
            <div key={clinic.id} className="clinic-card">
              <div className="clinic-image">
                <img src={clinic.image} alt={clinic.name} />
                <div className="clinic-type-badge">{clinic.type}</div>
              </div>
              
              <div className="clinic-content">
                <div className="clinic-header">
                  <h3 className="clinic-name">{clinic.name}</h3>
                  <div className="clinic-rating">
                    <i className="fas fa-star"></i>
                    <span>{clinic.rating}</span>
                  </div>
                </div>
                
                <div className="clinic-details">
                  <div className="clinic-address">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    {clinic.address}
                  </div>
                  <div className="clinic-distance">
                    <i className="fas fa-route mr-2"></i>
                    {clinic.distance} away
                  </div>
                  <div className="clinic-hours">
                    <i className="fas fa-clock mr-2"></i>
                    {clinic.availability}
                  </div>
                </div>
                
                <div className="clinic-services">
                  <h4>Services:</h4>
                  <div className="services-tags">
                    {clinic.services.slice(0, 3).map((service, index) => (
                      <span key={index} className="service-tag">{service}</span>
                    ))}
                    {clinic.services.length > 3 && (
                      <span className="service-tag more">+{clinic.services.length - 3} more</span>
                    )}
                  </div>
                </div>
                
                <div className="clinic-actions">
                  <button 
                    onClick={handleCall}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    message 
                  </button>
                  <button 
                    onClick={() => handleDirections(clinic)}
                    className="btn btn-outline"
                  >
                    <i className="fas fa-directions mr-2"></i>
                    Directions
                  </button>
                  <button 
                    onClick={() => setSelectedClinic(clinic)}
                    className="btn btn-secondary"
                  >
                    <i className="fas fa-info-circle mr-2"></i>
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Section */}
        <div className="emergency-section">
          <div className="emergency-card">
            <div className="emergency-icon">
              <i className="fas fa-ambulance"></i>
            </div>
            <div className="emergency-content">
              <h3>In Case of Emergency</h3>
              <p>If you're experiencing a medical emergency, don't wait - get help immediately.</p>
              <div className="emergency-actions">
                <button className="btn btn-destructive" onClick={handleCall}>
                  <i className="fas fa-phone mr-2"></i>
                  Call Emergency
                </button>
                <a href="http://localhost:5173/emergency"><button className="btn btn-outline">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Emergency SOS
                </button></a>
              </div>
            </div>
          </div>
        </div>

        {/* Clinic Details Modal */}
        {selectedClinic && (
          <div className="modal-overlay">
            <div className="clinic-details-modal animate-scale-in">
              <div className="modal-header">
                <h2>{selectedClinic.name}</h2>
                <button 
                  onClick={() => setSelectedClinic(null)}
                  className="modal-close-btn"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="modal-content">
                <div className="clinic-modal-image">
                  <img src={selectedClinic.image} alt={selectedClinic.name} />
                </div>
                
                <div className="clinic-info-grid">
                  <div className="info-section">
                    <h4>Contact Information</h4>
                    <p><i className="fas fa-map-marker-alt mr-2"></i>{selectedClinic.address}</p>
                    <p><i className="fas fa-phone mr-2"></i>{selectedClinic.phone}</p>
                    <p><i className="fas fa-clock mr-2"></i>{selectedClinic.availability}</p>
                  </div>
                  
                  <div className="info-section">
                    <h4>Services Offered</h4>
                    <ul>
                      {selectedClinic.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="info-section">
                    <h4>Specialties</h4>
                    <ul>
                      {selectedClinic.specialties.map((specialty, index) => (
                        <li key={index}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button 
                    onClick={handleCall}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    message
                  </button>
                  <button 
                    onClick={() => handleDirections(selectedClinic)}
                    className="btn btn-secondary"
                  >
                    <i className="fas fa-directions mr-2"></i>
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicLocator;