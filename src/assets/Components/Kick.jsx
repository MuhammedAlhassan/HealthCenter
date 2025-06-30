import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRedo, faClock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './Kick';

const Kick = () => {
  const [kicks, setKicks] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [goal, setGoal] = useState(10);
  const intervalRef = useRef(null);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('kickCounterHistory');
    if (savedHistory) {
      setSessionHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('kickCounterHistory', JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle timer
  useEffect(() => {
    if (isCounting) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isCounting, startTime]);

  const startCounting = () => {
    setKicks(0);
    setElapsedTime(0);
    setStartTime(Date.now());
    setIsCounting(true);
  };

  const stopCounting = () => {
    if (isCounting && kicks > 0) {
      const session = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: formatTime(elapsedTime),
        kickCount: kicks,
        goal: goal
      };
      setSessionHistory([session, ...sessionHistory.slice(0, 9)]); // Keep only last 10 sessions
    }
    setIsCounting(false);
  };

  const recordKick = () => {
    if (isCounting) {
      setKicks(kicks + 1);
      // Vibrate if supported
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  };

  const resetSession = () => {
    setIsCounting(false);
    setKicks(0);
    setElapsedTime(0);
  };

  const handleGoalChange = (e) => {
    const newGoal = parseInt(e.target.value) || 10;
    setGoal(Math.max(1, Math.min(30, newGoal)));
  };

  const clearHistory = () => {
    setSessionHistory([]);
  };

  return (
    <div className="kick-counter-container">
      <div className="kick-counter-header">
        <h1>Baby Kick Counter</h1>
        <p>Track your baby's movements and monitor activity patterns</p>
      </div>

      <div className="kick-counter-card">
        <div className="kick-display">
          <div className="kick-count">
            <span className="count-number">{kicks}</span>
            <span className="count-label">KICKS</span>
          </div>
          <div className="time-display">
            <FontAwesomeIcon icon={faClock} />
            <span>{formatTime(elapsedTime)}</span>
          </div>
        </div>

        <div className="progress-container">
          <div 
            className="progress-bar"
            style={{ width: `${Math.min(100, (kicks / goal) * 100)}%` }}
          ></div>
          <span className="progress-text">
            {kicks} of {goal} kicks
          </span>
        </div>

        <div className="goal-setting">
          <label htmlFor="kick-goal">Daily Kick Goal:</label>
          <input
            type="number"
            id="kick-goal"
            min="1"
            max="30"
            value={goal}
            onChange={handleGoalChange}
            disabled={isCounting}
          />
        </div>

        <div className="action-buttons">
          {!isCounting ? (
            <button onClick={startCounting} className="start-button">
              <FontAwesomeIcon icon={faPlay} /> Start Session
            </button>
          ) : (
            <button onClick={stopCounting} className="stop-button">
              <FontAwesomeIcon icon={faStop} /> End Session
            </button>
          )}
          
          <button 
            onClick={recordKick} 
            className={`kick-button ${isCounting ? 'active' : ''}`}
            disabled={!isCounting}
          >
            👣 Record Kick
          </button>
          
          <button onClick={resetSession} className="reset-button">
            <FontAwesomeIcon icon={faRedo} /> Reset
          </button>
        </div>

        <div className="instructions">
          <h3>How to use:</h3>
          <ol>
            <li>Choose a comfortable position (left side is recommended)</li>
            <li>Press "Start Session" when you feel the first kick</li>
            <li>Tap "Record Kick" for each movement you feel</li>
            <li>Aim for {goal} movements within 2 hours (consult your doctor)</li>
          </ol>
          <p className="note">
            <strong>Note:</strong> Contact your healthcare provider if you notice decreased movement.
          </p>
        </div>
      </div>

      {sessionHistory.length > 0 && (
        <div className="history-section">
          <div className="history-header">
            <h2>Previous Sessions</h2>
            <button onClick={clearHistory} className="clear-history-button">
              Clear History
            </button>
          </div>
          <div className="history-table">
            <div className="table-header">
              <span>Date</span>
              <span>Time</span>
              <span>Duration</span>
              <span>Kicks</span>
              <span>Goal</span>
            </div>
            {sessionHistory.map((session, index) => (
              <div 
                key={index} 
                className={`table-row ${session.kickCount >= session.goal ? 'goal-met' : 'goal-missed'}`}
              >
                <span>{session.date}</span>
                <span>{session.time}</span>
                <span>{session.duration}</span>
                <span>{session.kickCount}</span>
                <span>{session.goal}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="safety-info">
        <div className="info-icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
        <div className="info-content">
          <h3>When to seek medical advice:</h3>
          <ul>
            <li>Fewer than 10 kicks in 2 hours after 28 weeks</li>
            <li>Noticeable decrease in your baby's normal movement pattern</li>
            <li>No movement after drinking cold water or eating</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Kick;