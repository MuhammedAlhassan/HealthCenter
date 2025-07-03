import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './VideoCall';
import { connect } from 'twilio-video';

const VideoCall = () => {
  const navigate = useNavigate();
  const [callStatus, setCallStatus] = useState('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [aiMessages, setAiMessages] = useState([
    { sender: 'AI Assistant', text: 'Hello! I will connect you to a doctor shortly.', time: getCurrentTime(), isReceived: true }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [doctorStatus, setDoctorStatus] = useState('connecting');
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const timerRef = useRef(null);
  const callStartTimeRef = useRef(null);
  const roomRef = useRef(null);
  const localStreamRef = useRef(null);
  const chatMessagesEndRef = useRef(null);

  // Helper function to get current time in HH:MM AM/PM format
  function getCurrentTime() {
    return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  // Initialize call
  useEffect(() => {
    startCall();
    return () => {
      stopCall();
    };
  }, []);

  const startCall = async () => {
    try {
      // Get local media stream
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      callStartTimeRef.current = new Date();
      startCallTimer();
      
      // First show connecting status
      setCallStatus('connected');
      setDoctorStatus('searching');
      addAiMessage("Connecting you to a doctor...");

      // Simulate the call process
      setTimeout(() => {
        setDoctorStatus('ringing');
        addAiMessage("Calling the doctor...");

        // Simulate doctor answering after 5-10 seconds
        setTimeout(() => {
          connectToVideoRoom();
        }, 5000 + Math.random() * 5000);
      }, 2000);

    } catch (err) {
      console.error("Error starting call:", err);
      setCallStatus('failed');
      addAiMessage("Failed to start the call. Please try again.");
    }
  };

  const connectToVideoRoom = async () => {
    try {
      setDoctorStatus('connecting');
      addAiMessage("Doctor answered! Establishing video connection...");

      // For demo purposes, simulate the connection
      setTimeout(() => {
        setDoctorStatus('connected');
        addAiMessage("Video connection established with the doctor.");
        addAiMessage("How can I assist you during your consultation today?");

        // Simulate receiving remote video stream
        if (remoteVideoRef.current) {
          navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
              remoteVideoRef.current.srcObject = stream;
            });
        }
      }, 3000);

    } catch (error) {
      console.error('Failed to connect to room:', error);
      setDoctorStatus('failed');
      addAiMessage("Failed to connect video. Please try again.");
    }
  };

  const addAiMessage = (text) => {
    const newMsg = {
      sender: 'AI Assistant',
      text: text,
      time: getCurrentTime(),
      isReceived: true
    };
    setAiMessages(prev => [...prev, newMsg]);
  };

  const startCallTimer = () => {
    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  const stopCallTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const stopCall = () => {
    stopCallTimer();
    if (roomRef.current) {
      roomRef.current.disconnect();
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setIsScreenSharing(true);
        
        stream.getVideoTracks()[0].onended = () => {
          toggleScreenShare();
        };
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setIsScreenSharing(false);
      }
    } catch (err) {
      console.error("Error toggling screen share:", err);
    }
  };

  const endCall = () => {
    stopCall();
    setCallStatus('ended');
    addAiMessage("The call has ended. You can continue chatting with me if you have any follow-up questions.");
  };

  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Post-call responses
    if (callStatus === 'ended') {
      if (message.includes('prescription') || message.includes('medic') || message.includes('drug')) {
        return "Your prescription details will be available in your appointment summary. Please check your email or the appointments section.";
      }
      
      if (message.includes('follow') || message.includes('next')) {
        return "You can schedule a follow-up appointment through the appointments section. Would you like me to help with that?";
      }
      
      if (message.includes('summary') || message.includes('notes') || message.includes('details')) {
        return "Your consultation summary will be available shortly in your appointments. It typically takes 5-10 minutes to generate.";
      }
      
      const postCallResponses = [
        "Is there anything else I can help you with regarding your consultation?",
        "Would you like me to summarize the key points from your consultation?",
        "You can review the call recording and notes in your appointments section.",
        "Remember to check your email for the consultation summary.",
        "Let me know if you need help with anything else before you go."
      ];
      return postCallResponses[Math.floor(Math.random() * postCallResponses.length)];
    }
    
    // Medical-related responses
    if (message.includes('symptom') || message.includes('feel') || message.includes('pain')) {
      const responses = [
        "I understand you're describing symptoms. The doctor will help diagnose this shortly.",
        "Based on your symptoms, I recommend discussing this thoroughly with the doctor.",
        "I've noted your symptoms. The doctor will provide professional advice."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (message.includes('prescription') || message.includes('medic') || message.includes('drug')) {
      return "Only the doctor can prescribe medication. Please wait for their professional recommendation.";
    }
    
    if (message.includes('emergency') || message.includes('urgent')) {
      return "If this is a medical emergency, please call emergency services immediately.";
    }
    
    // Call-related responses
    if (message.includes('connect') || message.includes('doctor') || message.includes('wait')) {
      return "The doctor is currently reviewing your case. They'll respond shortly.";
    }
    
    if (message.includes('video') || message.includes('audio') || message.includes('hear') || message.includes('see')) {
      return "I've checked the connection and everything looks good on our end. Let me know if issues persist.";
    }
    
    // General conversation
    if (message.includes('thank') || message.includes('appreciate')) {
      return "You're welcome! I'm here to assist with your healthcare needs.";
    }
    
    if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
      return "Hello! How can I assist you with your consultation today?";
    }
    
    if (message.includes('how are you')) {
      return "I'm an AI assistant, so I don't have feelings, but I'm fully operational and ready to help you!";
    }
    
    // Default responses
    const defaultResponses = [
      "I've shared your message with the doctor. They'll respond shortly.",
      "That's an important point. The doctor will address this in the consultation.",
      "I've noted your concern for the doctor's attention.",
      "Please hold while the doctor reviews your information.",
      "The doctor is currently reviewing your medical information.",
      "I'll make sure the doctor is aware of this point.",
      "Your health is important. The doctor will provide guidance on this."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      sender: 'You',
      text: newMessage,
      time: getCurrentTime(),
      isReceived: false
    };
    
    setAiMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Generate and send AI response after a short delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(newMessage);
      addAiMessage(aiResponse);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-call-page">
      <div className="video-call-container">
        {callStatus !== 'ended' ? (
          <>
            <div className="video-call-header">
              <div className="call-info">
                <h2>
                  {doctorStatus === 'connected' ? 'Doctor Consultation' : 'Connecting to Doctor'}
                </h2>
                <div className="call-duration">
                  <i className="fas fa-clock"></i>
                  {formatTime(callDuration)}
                </div>
              </div>
              <div className="doctor-status">
                {doctorStatus === 'connecting' && (
                  <span className="status-connecting">
                    <i className="fas fa-spinner fa-spin"></i> Initializing...
                  </span>
                )}
                {doctorStatus === 'searching' && (
                  <span className="status-searching">
                    <i className="fas fa-phone"></i> Dialing doctor...
                  </span>
                )}
                {doctorStatus === 'ringing' && (
                  <span className="status-ringing">
                    <i className="fas fa-phone-volume"></i> Ringing doctor...
                  </span>
                )}
                {doctorStatus === 'connecting' && (
                  <span className="status-connecting">
                    <i className="fas fa-spinner fa-spin"></i> Connecting video...
                  </span>
                )}
                {doctorStatus === 'connected' && (
                  <span className="status-connected">
                    <i className="fas fa-check-circle"></i> Connected
                  </span>
                )}
              </div>
            </div>

            <div className="video-grid">
              <div className={`remote-video ${doctorStatus !== 'connected' ? 'connecting' : ''}`}>
                {doctorStatus !== 'connected' ? (
                  <div className="connecting-overlay">
                    {doctorStatus === 'searching' ? (
                      <>
                        <i className="fas fa-phone"></i>
                        <p>Dialing doctor...</p>
                      </>
                    ) : doctorStatus === 'ringing' ? (
                      <>
                        <i className="fas fa-phone-volume fa-shake"></i>
                        <p>Ringing doctor...</p>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        <p>Establishing connection...</p>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <video 
                      ref={remoteVideoRef} 
                      autoPlay 
                      playsInline 
                      className="video-element"
                    />
                    <div className="remote-video-info">
                      <span className="participant-name">Doctor</span>
                      <span className="participant-role">General Practitioner</span>
                    </div>
                  </>
                )}
              </div>

              <div className="local-video-container">
                <video 
                  ref={localVideoRef} 
                  autoPlay 
                  playsInline 
                  muted
                  className={`video-element ${isVideoOff ? 'video-off' : ''}`}
                />
                {isVideoOff && (
                  <div className="video-off-overlay">
                    <i className="fas fa-video-slash"></i>
                  </div>
                )}
              </div>
            </div>

            <div className="call-controls">
              <button 
                onClick={toggleMute}
                className={`control-btn ${isMuted ? 'active' : ''}`}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
              </button>
              
              <button 
                onClick={toggleVideo}
                className={`control-btn ${isVideoOff ? 'active' : ''}`}
                aria-label={isVideoOff ? 'Turn video on' : 'Turn video off'}
              >
                <i className={`fas ${isVideoOff ? 'fa-video-slash' : 'fa-video'}`}></i>
              </button>
              
              <button 
                onClick={toggleScreenShare}
                className={`control-btn ${isScreenSharing ? 'active' : ''}`}
                aria-label={isScreenSharing ? 'Stop screen sharing' : 'Share screen'}
              >
                <i className="fas fa-desktop"></i>
              </button>
              
              <button 
                onClick={endCall}
                className="control-btn end-call"
                aria-label="End call"
              >
                <i className="fas fa-phone-slash"></i>
              </button>
            </div>
          </>
        ) : (
          <div className="call-ended-banner">
            <div className="call-ended-content">
              <i className="fas fa-phone-slash"></i>
              <span>Call Ended - Duration: {formatTime(callDuration)}</span>
              <button 
                onClick={() => navigate('/appointments')}
                className="btn btn-primary"
              >
                Back to Appointments
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="call-sidebar">
        <div className="sidebar-section">
          <h3>AI Assistance</h3>
          <div className="chat-container">
            <div className="chat-messages">
              {aiMessages.map((message, index) => (
                <div key={index} className={`message ${message.isReceived ? 'received' : 'sent'}`}>
                  <div className="message-sender">{message.sender}</div>
                  <p>{message.text}</p>
                  <span className="message-time">{message.time}</span>
                </div>
              ))}
              <div ref={chatMessagesEndRef} />
            </div>
            <div className="chat-input">
              <input 
                type="text" 
                placeholder={callStatus === 'ended' ? "Ask follow-up questions..." : "Ask the AI assistant..."} 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="send-btn" onClick={sendMessage}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;