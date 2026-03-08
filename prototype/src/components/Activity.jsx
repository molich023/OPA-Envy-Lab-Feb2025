import React from 'react';
import { Clock } from 'lucide-react';

export const OdometerScreen = ({ state, dispatch, showToast }) => {
  const { isTracking, distance, steps, mode, activity, elapsedSeconds } = state;

  const handleStart = () => {
    dispatch({ type: 'START_TRACKING' });
    showToast("Tracking started! Kila hatua ni ushindi.");
  };

  const handleStop = () => {
    const earned = Math.floor(steps / 100);
    dispatch({ type: 'STOP_TRACKING' });
    showToast(`Session saved! Earned ${earned} Hatua Points.`);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map(v => v < 10 ? "0" + v : v).join(":");
  };

  return (
    <div className="app-content">
      <div className="screen-header">
        Activity
        <Clock size={24} color="#8e8e93" />
      </div>

      <div className="odometer-container">
        <div className="mode-selector">
          {['Outdoor', 'Indoor', 'Race'].map(m => (
            <div key={m} className={`mode-btn ${mode === m ? 'active' : ''}`} onClick={() => !isTracking && dispatch({ type: 'SET_MODE', payload: m })}>{m}</div>
          ))}
        </div>

        <div className="activity-grid">
          {[
            { id: 'walk', label: 'Walk', icon: '🚶' },
            { id: 'jog', label: 'Jog', icon: '🏃' },
            { id: 'bike', label: 'Bike', icon: '🚴' },
            { id: 'race', label: 'Race', icon: '🏁' },
          ].map(a => (
            <div key={a.id} className={`activity-btn ${activity === a.id ? 'active' : ''}`} onClick={() => !isTracking && dispatch({ type: 'SET_ACTIVITY', payload: a.id })}>
              <span>{a.icon}</span>
              <span>{a.label}</span>
            </div>
          ))}
        </div>

        <div className="distance-value">{(distance / 1000).toFixed(2)}</div>
        <div className="distance-unit">Kilometres</div>

        <div className="stats-row">
          <div className="mini-stat">
            <div className="mini-stat-label">Steps</div>
            <div className="mini-stat-value">{steps.toLocaleString()}</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat-label">Pace</div>
            <div className="mini-stat-value">{isTracking ? '5:24' : '--'}</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat-label">Time</div>
            <div className="mini-stat-value">{formatTime(elapsedSeconds)}</div>
          </div>
        </div>

        {!isTracking ? (
          <button className="action-btn btn-start" onClick={handleStart}>START TRACKING</button>
        ) : (
          <button className="action-btn btn-stop" onClick={handleStop}>STOP</button>
        )}
      </div>
    </div>
  );
};
