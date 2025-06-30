import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './MedicalReport';

const MedicalReport = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - in a real app, you would fetch this from your backend
  const mockReports = {
    3: {
      id: 3,
      appointmentType: 'Blood Test',
      date: '2024-02-28',
      provider: 'Dr. Sarah Johnson',
      location: 'Lagos University Teaching Hospital',
      status: 'completed',
      findings: [
        {
          test: 'Complete Blood Count (CBC)',
          result: 'Normal',
          value: 'Within normal range',
          notes: 'No abnormalities detected'
        },
        {
          test: 'Hemoglobin',
          result: 'Normal',
          value: '12.5 g/dL',
          notes: 'Healthy level for pregnancy'
        },
        {
          test: 'Glucose',
          result: 'Slightly Elevated',
          value: '110 mg/dL',
          notes: 'Monitor for gestational diabetes'
        }
      ],
      recommendations: [
        'Continue with prenatal vitamins',
        'Monitor blood sugar levels',
        'Follow up in 2 weeks for repeat glucose test',
        'Maintain balanced diet with reduced sugar intake'
      ],
      nextSteps: [
        {
          action: 'Follow-up Appointment',
          date: '2024-03-15',
          type: 'Routine Checkup'
        },
        {
          action: 'Repeat Glucose Test',
          date: '2024-03-08',
          type: 'Blood Test'
        }
      ],
      notes: 'Patient is progressing well with pregnancy. Minor elevation in glucose levels noted but not yet concerning. Recommended dietary adjustments provided.'
    },
    4: {
      id: 4,
      appointmentType: 'Routine Checkup',
      date: '2024-02-15',
      provider: 'Dr. Sarah Johnson',
      location: 'Lagos University Teaching Hospital',
      status: 'completed',
      findings: [
        {
          test: 'Blood Pressure',
          result: 'Normal',
          value: '118/76 mmHg',
          notes: 'Excellent blood pressure reading'
        },
        {
          test: 'Fetal Heart Rate',
          result: 'Normal',
          value: '145 bpm',
          notes: 'Strong and regular heartbeat'
        },
        {
          test: 'Fundal Height',
          result: 'Normal',
          value: '24 cm',
          notes: 'Matches gestational age'
        }
      ],
      recommendations: [
        'Continue regular exercise as tolerated',
        'Increase calcium-rich foods in diet',
        'Attend all scheduled prenatal visits',
        'Report any unusual symptoms immediately'
      ],
      nextSteps: [
        {
          action: 'Next Routine Checkup',
          date: '2024-03-15',
          type: 'Routine Checkup'
        },
        {
          action: 'Anatomy Ultrasound',
          date: '2024-03-22',
          type: 'Ultrasound'
        }
      ],
      notes: 'Pregnancy progressing normally. Fetal development appears on track. Patient reports good energy levels and minimal discomfort.'
    }
  };

  useEffect(() => {
    // Simulate API fetch
    const fetchReport = () => {
      try {
        setTimeout(() => {
          if (mockReports[appointmentId]) {
            setReport(mockReports[appointmentId]);
          } else {
            setError('Report not found');
          }
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to load report');
        setLoading(false);
      }
    };

    fetchReport();
  }, [appointmentId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="report-loading">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
        <p>Loading medical report...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="report-error">
        <div className="error-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h3>{error}</h3>
        <button 
          onClick={() => navigate('/appointments')}
          className="btn btn-primary"
        >
          Back to Appointments
        </button>
      </div>
    );
  }

  return (
    <div className="medical-report-page">
      <div className="report-container">
        <div className="report-header">
          <button 
            onClick={() => navigate('/appointments')}
            className="btn btn-outline back-button"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Appointments
          </button>
          <h1 className="report-title">Medical Report</h1>
          <div className="report-actions">
            <button className="btn btn-outline">
              <i className="fas fa-print mr-2"></i>
              Print Report
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-share-alt mr-2"></i>
              Share Report
            </button>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="summary-header">
            <h2>Appointment Summary</h2>
            <span className={`status-badge ${report.status}`}>
              {report.status}
            </span>
          </div>
          <div className="summary-content">
            <div className="summary-item">
              <span className="summary-label">Appointment Type:</span>
              <span className="summary-value">{report.appointmentType}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Date:</span>
              <span className="summary-value">{formatDate(report.date)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Healthcare Provider:</span>
              <span className="summary-value">{report.provider}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Location:</span>
              <span className="summary-value">{report.location}</span>
            </div>
          </div>
        </div>

        <div className="report-section">
          <h2 className="section-title">
            <i className="fas fa-flask section-icon"></i>
            Test Results & Findings
          </h2>
          <div className="findings-table">
            <div className="table-header">
              <div className="table-cell">Test</div>
              <div className="table-cell">Result</div>
              <div className="table-cell">Value</div>
              <div className="table-cell">Notes</div>
            </div>
            {report.findings.map((finding, index) => (
              <div key={index} className="table-row">
                <div className="table-cell">{finding.test}</div>
                <div className="table-cell">
                  <span className={`result-badge ${finding.result.toLowerCase()}`}>
                    {finding.result}
                  </span>
                </div>
                <div className="table-cell">{finding.value}</div>
                <div className="table-cell">{finding.notes}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="report-section">
          <h2 className="section-title">
            <i className="fas fa-stethoscope section-icon"></i>
            Doctor's Recommendations
          </h2>
          <ul className="recommendations-list">
            {report.recommendations.map((recommendation, index) => (
              <li key={index} className="recommendation-item">
                <i className="fas fa-check-circle recommendation-icon"></i>
                {recommendation}
              </li>
            ))}
          </ul>
        </div>

        <div className="report-section">
          <h2 className="section-title">
            <i className="fas fa-calendar-check section-icon"></i>
            Next Steps
          </h2>
          <div className="next-steps-grid">
            {report.nextSteps.map((step, index) => (
              <div key={index} className="next-step-card">
                <div className="step-icon">
                  {step.type.includes('Blood') ? (
                    <i className="fas fa-tint"></i>
                  ) : step.type.includes('Ultrasound') ? (
                    <i className="fas fa-baby"></i>
                  ) : (
                    <i className="fas fa-calendar-alt"></i>
                  )}
                </div>
                <div className="step-content">
                  <h3>{step.action}</h3>
                  <p className="step-type">{step.type}</p>
                  <p className="step-date">
                    <i className="fas fa-clock"></i> {formatDate(step.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="report-section">
          <h2 className="section-title">
            <i className="fas fa-file-medical section-icon"></i>
            Additional Notes
          </h2>
          <div className="notes-content">
            <p>{report.notes}</p>
          </div>
        </div>

        <div className="report-footer">
          <div className="disclaimer">
            <p>
              <strong>Disclaimer:</strong> This report is for informational purposes only and should not 
              replace professional medical advice. Always consult with your healthcare provider regarding 
              any medical concerns.
            </p>
          </div>
          <div className="footer-actions">
            <button className="btn btn-outline">
              <i className="fas fa-download mr-2"></i>
              Download PDF
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-book-medical mr-2"></i>
              Book Follow-up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalReport;