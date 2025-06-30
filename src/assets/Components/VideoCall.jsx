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
    { sender: 'AI Assistant', text: 'Hello! I will connect you to a doctor shortly.', time: '10:00 AM', isReceived: true }
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

  // Twilio credentials (replace with your actual credentials)
  const TWILIO_TOKEN_URL = 'https://your-server.com/generate-twilio-token'; // Your backend endpoint
  const DOCTOR_NUMBER = '+2348160949697';

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
      addAiMessage("Connecting you to the doctor at " + DOCTOR_NUMBER + "...");

      // In a real app, you would:
      // 1. Call your backend to initiate a call to the doctor's number
      // 2. Get a Twilio access token
      // 3. Connect to a video room

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

      // In a real implementation, you would:
      // 1. Fetch a Twilio token from your server
      // const response = await fetch(TWILIO_TOKEN_URL);
      // const { token } = await response.json();

      // For demo purposes, we'll simulate the connection
      setTimeout(() => {
        setDoctorStatus('connected');
        addAiMessage("Video connection established with the doctor.");

        // Simulate receiving remote video stream
        if (remoteVideoRef.current) {
          // In a real app, this would be the doctor's video stream
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
    setAiMessages(prev => [...prev, {
      sender: 'AI Assistant',
      text: text,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      isReceived: true
    }]);
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
    setTimeout(() => {
      navigate('/appointments');
    }, 2000);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    setAiMessages(prev => [...prev, {
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      isReceived: false
    }]);
    setNewMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I've shared your message with the doctor.",
        "The doctor will respond shortly.",
        "Please wait for the doctor's response.",
        "The doctor has noted your concern."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addAiMessage(randomResponse);
    }, 1000 + Math.random() * 2000);
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
      {callStatus === 'ended' ? (
        <div className="call-ended-screen">
          <div className="call-ended-content">
            <i className="fas fa-phone-slash call-ended-icon"></i>
            <h2>Call Ended</h2>
            <p>Your consultation lasted {formatTime(callDuration)}</p>
            <button 
              onClick={() => navigate('/appointments')}
              className="btn btn-primary"
            >
              Return to Appointments
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="video-call-container">
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
                    <i className="fas fa-phone"></i> Dialing {DOCTOR_NUMBER}...
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
                        <p>Dialing {DOCTOR_NUMBER}...</p>
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
                      <span className="participant-role">+234 816 094 9697</span>
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
          </div>

          <div className="call-sidebar">
            <div className="sidebar-section">
              <h3>AI Assistance</h3>
              <div className="chat-container">
                <div className="chat-messages" ref={chatMessagesEndRef}>
                  {aiMessages.map((message, index) => (
                    <div key={index} className={`message ${message.isReceived ? 'received' : 'sent'}`}>
                      <div className="message-sender">{message.sender}</div>
                      <p>{message.text}</p>
                      <span className="message-time">{message.time}</span>
                    </div>
                  ))}
                </div>
                <div className="chat-input">
                  <input 
                    type="text" 
                    placeholder="Ask the AI assistant..." 
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
        </>
      )}
    </div>
  );
};

export default VideoCall;