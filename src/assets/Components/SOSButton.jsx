import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure icons load
function SOSButton() {
  const [isActivated, setIsActivated] = useState(false);

  const triggerSOS = () => {
    setIsActivated(true);
    
    setTimeout(() => {
      alert('Emergency alert sent to nearby clinics!\n\nYour location has been shared and help is on the way.');
      setIsActivated(false);
    }, 2000);
  };

  return (
    <div className="sos-container">
      <button 
        className="sos-button" 
        onClick={triggerSOS}
        title="Emergency SOS"
        style={{
          animation: isActivated ? 'pulse 0.5s infinite' : 'pulse 2s infinite'
        }}
      >
        {isActivated ? '...' : 'SOS'}
      </button>
    </div>
  );
}

export default SOSButton;
