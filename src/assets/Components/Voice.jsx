import { useState, useRef, useEffect } from 'react';
import './Voice';

const Voice = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en-US');
  const recognitionRef = useRef(null);

  // Comprehensive medical knowledge base with accurate responses
  const medicalDatabase = {
    // Pain-related symptoms
    "headache": {
      possibleConditions: [
        { name: "Tension Headache", confidence: 0.85, description: "Mild to moderate pain often described as a tight band around the head" },
        { name: "Migraine", confidence: 0.75, description: "Throbbing pain, often on one side, with possible nausea and light sensitivity" },
        { name: "Cluster Headache", confidence: 0.30, description: "Severe burning or piercing pain around one eye" }
      ],
      recommendedActions: [
        "Rest in a quiet, dark room",
        "Apply cold compress to forehead",
        "Hydrate well (dehydration can cause headaches)",
        "Consider OTC pain relievers (ibuprofen, acetaminophen)",
        "Practice relaxation techniques for tension headaches"
      ],
      severity: "Moderate",
      shouldSeeDoctor: (duration) => duration > 2,
      emergency: (symptoms) => symptoms.includes("sudden severe") || symptoms.includes("with fever") || symptoms.includes("with confusion")
    },
    
    "fever": {
      possibleConditions: [
        { name: "Viral Infection", confidence: 0.90, description: "Common cold, flu, or other viral illnesses" },
        { name: "Bacterial Infection", confidence: 0.65, description: "Strep throat, UTI, or other bacterial infections" },
        { name: "COVID-19", confidence: 0.70, description: "May include fever with cough and loss of taste/smell" }
      ],
      recommendedActions: [
        "Stay hydrated with water and electrolyte solutions",
        "Rest adequately",
        "Use fever reducers (acetaminophen or ibuprofen)",
        "Monitor temperature every 4 hours",
        "Use lukewarm sponge baths if fever is very high"
      ],
      severity: (temp) => temp > 103 ? "Severe" : temp > 101 ? "Moderate" : "Mild",
      shouldSeeDoctor: (temp) => temp > 102 || temp > 100.4 && temp < 102 && temp.duration > 3,
      emergency: (temp) => temp > 104
    },
    
    // Respiratory symptoms
    "cough": {
      possibleConditions: [
        { name: "Common Cold", confidence: 0.80, description: "Often with runny nose and mild fever" },
        { name: "Bronchitis", confidence: 0.60, description: "Persistent cough sometimes with phlegm" },
        { name: "Allergies", confidence: 0.55, description: "Dry cough with sneezing and itchy eyes" }
      ],
      recommendedActions: [
        "Stay hydrated to thin mucus",
        "Use honey (1-2 teaspoons) for cough relief",
        "Consider OTC cough suppressants for dry cough",
        "Use a humidifier to moisten airways",
        "Avoid irritants like smoke or strong perfumes"
      ],
      severity: (duration) => duration > 10 ? "Moderate" : "Mild",
      shouldSeeDoctor: (duration) => duration > 3,
      emergency: (symptoms) => symptoms.includes("difficulty breathing") || symptoms.includes("coughing blood")
    },
    
    // Gastrointestinal symptoms
    "stomach pain": {
      possibleConditions: [
        { name: "Indigestion", confidence: 0.75, description: "Discomfort after eating, often with bloating" },
        { name: "Gastritis", confidence: 0.60, description: "Burning pain in upper abdomen" },
        { name: "Food Poisoning", confidence: 0.50, description: "Often with diarrhea and vomiting" }
      ],
      recommendedActions: [
        "Try the BRAT diet (bananas, rice, applesauce, toast)",
        "Stay hydrated with small sips of water or electrolyte solutions",
        "Avoid spicy, fatty, or acidic foods",
        "Apply warm compress to abdomen",
        "Consider antacids for heartburn"
      ],
      severity: "Moderate",
      shouldSeeDoctor: (duration) => duration > 2,
      emergency: (symptoms) => symptoms.includes("severe sudden") || symptoms.includes("unable to keep liquids down")
    },
    
    // Additional symptoms
    "fatigue": {
      possibleConditions: [
        { name: "Anemia", confidence: 0.70, description: "Often with pale skin and shortness of breath" },
        { name: "Sleep Deprivation", confidence: 0.85, description: "Improves with adequate rest" },
        { name: "Thyroid Disorder", confidence: 0.45, description: "Persistent fatigue with possible weight changes" }
      ],
      recommendedActions: [
        "Ensure 7-9 hours of quality sleep nightly",
        "Maintain balanced diet with iron-rich foods",
        "Stay hydrated",
        "Gradual increase in physical activity",
        "Consider blood tests if persistent"
      ],
      severity: (duration) => duration > 2 ? "Moderate" : "Mild",
      shouldSeeDoctor: (duration) => duration > 2,
      emergency: false
    }
  };

  // Language configuration
  const languages = {
    'en-US': { 
      name: 'English', 
      code: 'en-US',
      startText: 'Start Recording',
      stopText: 'Stop Recording'
    },
    'yo-NG': { 
      name: 'Yoruba', 
      code: 'yo-NG',
      startText: 'Bẹrẹ Irorisi',
      stopText: 'Duro Irorisi'
    },
    'ha-NG': { 
      name: 'Hausa', 
      code: 'ha-NG',
      startText: 'Fara Rikodi',
      stopText: 'Tsayar da Rikodi'
    },
    'ig-NG': { 
      name: 'Igbo', 
      code: 'ig-NG',
      startText: 'Malite Ndekọ',
      stopText: 'Kwụsị Ndekọ'
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError("Speech recognition not supported in your browser. Try Chrome or Edge.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = language;

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(prev => finalTranscript || interimTranscript);
      
      // Auto-analyze when pause detected
      if (finalTranscript && !isListening) {
        analyzeSymptoms(finalTranscript);
      }
    };

    recognitionRef.current.onerror = (event) => {
      setError(`Recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        recognitionRef.current.start();
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening, language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setAnalysis(null);
      setError(null);
      recognitionRef.current.lang = language;
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    if (isListening) {
      recognitionRef.current.stop();
      setTimeout(() => recognitionRef.current.start(), 100);
    }
  };

  const analyzeSymptoms = (text = transcript) => {
    if (!text.trim()) {
      setError('Please describe your symptoms first');
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      try {
        const symptomsFound = [];
        let combinedAnalysis = {
          possibleConditions: [],
          recommendedActions: [],
          severity: "Mild",
          shouldSeeDoctor: false,
          emergency: false,
          symptomDetails: []
        };

        // Check for each symptom in the medical database
        for (const [symptom, data] of Object.entries(medicalDatabase)) {
          if (text.toLowerCase().includes(symptom)) {
            // Extract additional details from text
            const durationMatch = text.match(/(\d+)\s*(day|days|hour|hours)/i);
            const duration = durationMatch ? parseInt(durationMatch[1]) : 1;
            
            const tempMatch = text.match(/(\d{2,3})\s*(degree|°|degrees)/i);
            const temp = tempMatch ? parseInt(tempMatch[1]) : null;

            // Create symptom-specific analysis
            const symptomAnalysis = {
              symptom,
              conditions: [...data.possibleConditions],
              actions: [...data.recommendedActions],
              severity: typeof data.severity === 'function' 
                ? data.severity(temp || duration) 
                : data.severity,
              seeDoctor: typeof data.shouldSeeDoctor === 'function'
                ? data.shouldSeeDoctor(temp || duration)
                : data.shouldSeeDoctor,
              isEmergency: typeof data.emergency === 'function'
                ? data.emergency(text.toLowerCase())
                : data.emergency
            };

            symptomsFound.push(symptom);
            combinedAnalysis.symptomDetails.push(symptomAnalysis);
            
            // Merge conditions (remove duplicates)
            symptomAnalysis.conditions.forEach(condition => {
              if (!combinedAnalysis.possibleConditions.some(c => c.name === condition.name)) {
                combinedAnalysis.possibleConditions.push(condition);
              }
            });

            // Merge actions (remove duplicates)
            symptomAnalysis.actions.forEach(action => {
              if (!combinedAnalysis.recommendedActions.includes(action)) {
                combinedAnalysis.recommendedActions.push(action);
              }
            });

            // Upgrade severity if needed
            if (symptomAnalysis.severity === "Severe") {
              combinedAnalysis.severity = "Severe";
            } else if (symptomAnalysis.severity === "Moderate" && combinedAnalysis.severity !== "Severe") {
              combinedAnalysis.severity = "Moderate";
            }

            // Upgrade doctor recommendation if needed
            if (symptomAnalysis.seeDoctor) {
              combinedAnalysis.shouldSeeDoctor = true;
            }

            // Check for emergencies
            if (symptomAnalysis.isEmergency) {
              combinedAnalysis.emergency = true;
            }
          }
        }

        // If no specific symptoms found, provide general advice
        if (symptomsFound.length === 0) {
          combinedAnalysis = {
            possibleConditions: [
              { 
                name: "General Symptoms", 
                confidence: 0.90,
                description: "Non-specific symptoms that may indicate minor illness or stress"
              }
            ],
            recommendedActions: [
              "Monitor your symptoms closely",
              "Get adequate rest",
              "Stay well hydrated",
              "Consider OTC symptom relief if appropriate",
              "Consult a healthcare provider if symptoms persist or worsen"
            ],
            severity: "Mild",
            shouldSeeDoctor: false,
            emergency: false,
            generalAdvice: true
          };
        }

        setAnalysis(combinedAnalysis);
      } catch (err) {
        setError('Analysis error. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 800); // Simulated API delay
  };

  const clearAll = () => {
    setTranscript('');
    setAnalysis(null);
    setError(null);
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="voice-checker-container">
      <div className="voice-checker-header">
        <h1>Medical Voice Symptom Checker</h1>
        <p>Describe your symptoms in your preferred language for accurate medical advice</p>
      </div>

      <div className="language-selector">
        <label>Select Language:</label>
        <div className="language-buttons">
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => changeLanguage(code)}
              className={language === code ? 'active' : ''}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      <div className="voice-checker-card">
        <div className="voice-controls">
          <button 
            onClick={toggleListening}
            className={`mic-button ${isListening ? 'listening' : ''}`}
          >
            <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'}`}></i>
            {isListening ? languages[language].stopText : languages[language].startText}
          </button>
          
          <div className="recording-status">
            {isListening && (
              <div className="pulse-animation">
                <div className="pulse-dot"></div>
                <span>Listening in {languages[language].name}...</span>
              </div>
            )}
          </div>
        </div>

        <div className="transcript-container">
          <label>Your Symptom Description:</label>
          <div className="transcript-box">
            {transcript || (
              <div className="placeholder">
                {isListening ? "Speak now..." : "Transcript will appear here"}
              </div>
            )}
          </div>
        </div>

        <div className="action-buttons">
          <button 
            onClick={() => analyzeSymptoms()} 
            disabled={!transcript || loading}
            className="analyze-button"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Analyzing...
              </>
            ) : (
              'Analyze Symptoms'
            )}
          </button>
          <button onClick={clearAll} className="clear-button">
            Clear
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      {analysis && (
        <div className="analysis-results">
          <h2>Medical Analysis Results</h2>
          
          {!analysis.generalAdvice && (
            <div className="results-section">
              <h3>Detected Symptoms</h3>
              <div className="symptoms-grid">
                {analysis.symptomDetails.map((detail, index) => (
                  <div key={index} className="symptom-card">
                    <div className="symptom-name">{detail.symptom}</div>
                    <div className={`severity-badge ${detail.severity.toLowerCase()}`}>
                      {detail.severity} severity
                    </div>
                    {detail.seeDoctor && (
                      <div className="doctor-notice">
                        <i className="fas fa-exclamation-triangle"></i> Doctor consultation recommended
                      </div>
                    )}
                    {detail.isEmergency && (
                      <div className="emergency-notice">
                        <i className="fas fa-ambulance"></i> Seek immediate medical attention
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="results-section">
            <h3>Possible Conditions</h3>
            <div className="conditions-grid">
              {analysis.possibleConditions.map((condition, index) => (
                <div key={index} className="condition-card">
                  <div className="condition-header">
                    <span className="condition-name">{condition.name}</span>
                    <span className="confidence-badge">
                      {(condition.confidence * 100).toFixed(0)}% match
                    </span>
                  </div>
                  <div className="condition-description">{condition.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="results-section">
            <h3>Recommended Actions</h3>
            <ul className="actions-list">
              {analysis.recommendedActions.map((action, index) => (
                <li key={index}>
                  <i className="fas fa-check-circle"></i> {action}
                </li>
              ))}
            </ul>
          </div>

          <div className="severity-indicator">
            <h3>Overall Assessment</h3>
            <div className={`severity-level ${analysis.severity.toLowerCase()}`}>
              <span className="severity-text">{analysis.severity} Condition</span>
              {analysis.shouldSeeDoctor && (
                <span className="doctor-recommendation">
                  <i className="fas fa-user-md"></i> Medical consultation advised
                </span>
              )}
              {analysis.emergency && (
                <span className="emergency-alert">
                  <i className="fas fa-exclamation-triangle"></i> EMERGENCY - Seek immediate care
                </span>
              )}
            </div>
          </div>

          <div className="disclaimer">
            <p><strong>Medical Disclaimer:</strong> This tool provides general health information and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Voice;