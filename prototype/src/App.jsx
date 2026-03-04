import React, { useState, useEffect } from 'react';
import { Activity, Map as MapIcon, Trophy, Search, Navigation, Layers, Shield, Zap } from 'lucide-react';

const OdometerScreen = () => {
  const [distance, setDistance] = useState(4820);
  const [steps, setSteps] = useState(6245);

  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(prev => prev + Math.floor(Math.random() * 5));
      setSteps(prev => prev + Math.floor(Math.random() * 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-content">
      <div className="screen-header">Activity</div>
      <div className="odometer-container">
        <div className="distance-value">{(distance / 1000).toFixed(2)}</div>
        <div className="distance-unit">Kilometres</div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Steps</div>
            <div className="stat-value">{steps.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Time</div>
            <div className="stat-value">00:54:12</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Calories</div>
            <div className="stat-value">342 kcal</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Mode</div>
            <div className="stat-value">Outdoor</div>
          </div>
        </div>

        <div className="points-badge">
          <Zap size={16} fill="currentColor" style={{ marginRight: 8 }} />
          {Math.floor(steps / 100)} Hatua Points
        </div>
      </div>
    </div>
  );
};

const MapScreen = () => {
  return (
    <div className="app-content">
      <div className="map-placeholder">
        {/* Simulating a map background with SVG or simple divs */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#cadfb1' }}>
          {/* Street lines simulation */}
          <div style={{ position: 'absolute', top: '40%', left: 0, right: 0, height: 20, backgroundColor: 'white', transform: 'rotate(-5deg)' }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 20, backgroundColor: 'white', transform: 'rotate(10deg)' }} />

          {/* User Marker */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 20, height: 20, backgroundColor: '#007aff',
            borderRadius: '50%', border: '3px solid white',
            boxShadow: '0 0 10px rgba(0,0,122,0.3)'
          }} />

          {/* AI Route Overlay */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <path d="M 180 400 L 220 350 L 300 320 L 320 200" fill="none" stroke="#007aff" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 5" opacity="0.6" />
          </svg>
        </div>

        <div className="map-ui-overlay">
          <div className="search-bar">
            <Search size={18} color="#8e8e93" />
            <span style={{ color: '#8e8e93' }}>Search for routes in Nairobi...</span>
          </div>
        </div>

        <div className="map-controls">
          <div className="map-btn"><Layers size={20} /></div>
          <div className="map-btn"><Navigation size={20} color="#007aff" /></div>
          <div className="map-btn"><Shield size={20} color="#ff3b30" /></div>
        </div>

        <div className="route-suggestion">
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 10 }}>
            <Zap size={20} />
          </div>
          <div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>AI Suggestion</div>
            <div style={{ fontWeight: 'bold' }}>Karura Forest Loop (5km)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LeaderboardScreen = () => {
  const leaders = [
    { rank: 1, name: 'Kipchoge_Fan', steps: '142,500', points: '1,425', avatar: '🦁' },
    { rank: 2, name: 'Sarah_W', steps: '128,310', points: '1,283', avatar: '🐆' },
    { rank: 3, name: 'Macho_Poli', steps: '115,000', points: '1,150', avatar: '🦅' },
    { rank: 4, name: 'Jules_Dev', steps: '98,200', points: '982', avatar: '🐘' },
    { rank: 5, name: 'Walk_Master', steps: '85,400', points: '854', avatar: '🏔' },
    { rank: 6, name: 'Zebra_Runner', steps: '72,100', points: '721', avatar: '🦓' },
  ];

  return (
    <div className="app-content">
      <div className="screen-header">Leaderboard</div>
      <div className="leaderboard-list">
        {leaders.map((leader) => (
          <div key={leader.rank} className="leader-item">
            <div className="rank">{leader.rank}</div>
            <div className="avatar">{leader.avatar}</div>
            <div className="leader-info">
              <div className="leader-name">{leader.name}</div>
              <div className="leader-steps">{leader.steps} steps this week</div>
            </div>
            <div className="leader-points">+{leader.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('odometer');

  return (
    <div className="phone-frame">
      <div className="status-bar">
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 5 }}>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {activeTab === 'odometer' && <OdometerScreen />}
      {activeTab === 'map' && <MapScreen />}
      {activeTab === 'leaderboard' && <LeaderboardScreen />}

      <div className="nav-bar">
        <div
          className={`nav-item ${activeTab === 'odometer' ? 'active' : ''}`}
          onClick={() => setActiveTab('odometer')}
        >
          <Activity size={24} />
          <span>Activity</span>
        </div>
        <div
          className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <MapIcon size={24} />
          <span>Explore</span>
        </div>
        <div
          className={`nav-item ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <Trophy size={24} />
          <span>Rank</span>
        </div>
      </div>
    </div>
  );
}

export default App;
