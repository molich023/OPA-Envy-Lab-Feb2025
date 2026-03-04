import React, { useState, useEffect, useRef } from 'react';
import {
  Activity, Map as MapIcon, Trophy, Search, Navigation,
  Layers, Shield, Zap, Target, ShoppingBag, User,
  ChevronRight, Share2, CheckCircle2, AlertCircle, Clock
} from 'lucide-react';

// --- Components ---

const Toast = ({ message, type = 'success' }) => (
  <div className="toast-container">
    {type === 'success' ? <CheckCircle2 size={20} color="#34c759" /> : <AlertCircle size={20} color="#ffcc00" />}
    <span style={{ fontSize: 14, fontWeight: 600 }}>{message}</span>
  </div>
);

const OdometerScreen = ({ state, dispatch, showToast }) => {
  const { isTracking, distance, steps, mode, activity, startTime } = state;

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
            <div
              key={m}
              className={`mode-btn ${mode === m ? 'active' : ''}`}
              onClick={() => !isTracking && dispatch({ type: 'SET_MODE', payload: m })}
            >
              {m}
            </div>
          ))}
        </div>

        <div className="activity-grid">
          {[
            { id: 'walk', label: 'Walk', icon: '🚶' },
            { id: 'jog', label: 'Jog', icon: '🏃' },
            { id: 'bike', label: 'Bike', icon: '🚴' },
            { id: 'race', label: 'Race', icon: '🏁' },
          ].map(a => (
            <div
              key={a.id}
              className={`activity-btn ${activity === a.id ? 'active' : ''}`}
              onClick={() => !isTracking && dispatch({ type: 'SET_ACTIVITY', payload: a.id })}
            >
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
            <div className="mini-stat-value">{formatTime(state.elapsedSeconds)}</div>
          </div>
        </div>

        <div className="stats-row">
           <div className="mini-stat">
            <div className="mini-stat-label">Calories</div>
            <div className="mini-stat-value">{Math.floor(steps * 0.04)} kcal</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat-label">Points</div>
            <div className="mini-stat-value">+{Math.floor(steps / 100)}</div>
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

const MapScreen = ({ state, showToast }) => {
  const [selectedRoute, setSelectedRoute] = useState(0);
  const routes = [
    { name: 'Uhuru Park Loop', dist: '2.5km', level: 'Easy', color: '#34c759' },
    { name: 'CBD Heritage Run', dist: '5.2km', level: 'Medium', color: '#007aff' },
    { name: 'Ngong Hills Challenge', dist: '12km', level: 'Hard', color: '#ff3b30' },
  ];

  return (
    <div className="app-content">
      <div className="map-placeholder">
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#cadfb1' }}>
          <div style={{ position: 'absolute', top: '40%', left: 0, right: 0, height: 20, backgroundColor: 'white', transform: 'rotate(-5deg)' }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 20, backgroundColor: 'white', transform: 'rotate(10deg)' }} />

          {/* Pulsing User Marker */}
          <div className="user-marker" style={{
            position: 'absolute', top: '55%', left: '45%',
            width: 16, height: 16, backgroundColor: '#007aff',
            borderRadius: '50%', border: '3px solid white',
            boxShadow: '0 0 15px rgba(0,0,122,0.5)'
          }} />

          {/* Route Path */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <path
              d={selectedRoute === 0 ? "M 150 450 L 200 420 L 250 460 L 180 520 Z" : "M 170 450 L 300 300 L 350 150"}
              fill={selectedRoute === 0 ? "rgba(52, 199, 89, 0.2)" : "none"}
              stroke={routes[selectedRoute].color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={selectedRoute === 2 ? "1" : "10 5"}
            />
          </svg>
        </div>

        <div className="map-ui-overlay">
          <div className="search-bar">
            <Search size={18} color="#8e8e93" />
            <span style={{ color: '#8e8e93', fontSize: 13 }}>Search for routes in Nairobi...</span>
          </div>
        </div>

        <div className="route-card-scroll">
          {routes.map((r, i) => (
            <div
              key={i}
              className={`route-card ${selectedRoute === i ? 'active' : ''}`}
              onClick={() => setSelectedRoute(i)}
            >
              <div className="route-name">{r.name}</div>
              <div className="route-meta">{r.dist} • {r.level}</div>
            </div>
          ))}
        </div>

        <div className="map-controls">
          <div className="map-btn"><Layers size={20} /></div>
          <div className="map-btn" onClick={() => showToast("Recalibrating GPS...")}><Navigation size={20} color="#007aff" /></div>
          <div className="map-btn" onClick={() => showToast("Safety Mode Active", "warning")}><Shield size={20} color="#ff3b30" /></div>
        </div>

        <div className="route-suggestion" onClick={() => showToast("Opening Karura Forest Guide...")}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 10 }}>
            <Zap size={20} />
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>AI Suggestion</div>
            <div style={{ fontWeight: 'bold', fontSize: 13 }}>Karura Forest Loop (5km)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LeaderboardScreen = ({ state }) => {
  const [tab, setTab] = useState('Weekly');
  const leaders = [
    { rank: 1, name: 'Kipchoge_Fan', steps: '142,500', points: '1,425', avatar: '🦁' },
    { rank: 2, name: 'Sarah_W', steps: '128,310', points: '1,283', avatar: '🐆' },
    { rank: 3, name: 'Macho_Poli', steps: '115,000', points: '1,150', avatar: '🦅' },
    { rank: 4, name: 'Jules_Dev', steps: '98,200', points: '982', avatar: '🐘', isMe: true },
    { rank: 5, name: 'Walk_Master', steps: '85,400', points: '854', avatar: '🏔' },
    { rank: 6, name: 'Zebra_Runner', steps: '72,100', points: '721', avatar: '🦓' },
  ];

  return (
    <div className="app-content">
      <div className="screen-header">Leaderboard</div>
      <div className="tabs">
        {['Weekly', 'Monthly', 'All Time', 'City'].map(t => (
          <div key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </div>
        ))}
      </div>

      <div className="podium">
        <div className="podium-item p-2">
          <div className="podium-avatar">{leaders[1].avatar}</div>
          <div className="p-name">{leaders[1].name}</div>
          <div className="p-steps">{leaders[1].steps}</div>
        </div>
        <div className="podium-item p-1">
          <div className="podium-avatar">{leaders[0].avatar}</div>
          <div className="p-name">{leaders[0].name}</div>
          <div className="p-steps">{leaders[0].steps}</div>
        </div>
        <div className="podium-item p-3">
          <div className="podium-avatar">{leaders[2].avatar}</div>
          <div className="p-name">{leaders[2].name}</div>
          <div className="p-steps">{leaders[2].steps}</div>
        </div>
      </div>

      <div className="leaderboard-list">
        {leaders.slice(3).map((leader) => (
          <div key={leader.rank} className={`leader-item ${leader.isMe ? 'my-rank-row' : ''}`} style={{ paddingLeft: 20, paddingRight: 20 }}>
            <div className="rank">{leader.rank}</div>
            <div className="avatar" style={{ width: 36, height: 36, fontSize: 16 }}>{leader.avatar}</div>
            <div className="leader-info">
              <div className="leader-name">{leader.name}</div>
              <div className="leader-steps">{leader.steps} steps</div>
            </div>
            <div className="leader-points">+{leader.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChallengesScreen = ({ dispatch, showToast }) => {
  const [challenges, setChallenges] = useState([
    { id: 1, title: '7-Day Streak', reward: '200 pts', progress: 80, time: '2 days left', icon: '🔥', joined: true },
    { id: 2, title: '10k Step Saturday', reward: '50 pts', progress: 0, time: 'Starts in 12h', icon: '👟', joined: false },
    { id: 3, title: 'Karura Explorer', reward: '150 pts', progress: 40, time: '5 days left', icon: '🌳', joined: true },
    { id: 4, title: 'Referral Sprint', reward: '1000 pts', progress: 10, time: '14 days left', icon: '📢', joined: false },
    { id: 5, title: 'Nairobi CBD Loop', reward: '75 pts', progress: 0, time: 'Starts in 2h', icon: '🏙️', joined: false },
  ]);

  const handleJoin = (id) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, joined: true } : c));
    dispatch({ type: 'ADD_POINTS', payload: 50 });
    showToast("Joined! 50 bonus points awarded.");
  };

  return (
    <div className="app-content">
      <div className="screen-header">Challenges</div>
      {challenges.map(c => (
        <div key={c.id} className="challenge-card">
          <div className="challenge-icon">{c.icon}</div>
          <div className="challenge-info">
            <div className="challenge-title">{c.title}</div>
            <div className="challenge-reward">REWARD: {c.reward}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${c.progress}%` }}></div>
            </div>
            <div className="challenge-footer">
              <span>{c.progress}% complete</span>
              <span>{c.time}</span>
            </div>
          </div>
          {!c.joined && <button className="btn-join" onClick={() => handleJoin(c.id)}>JOIN</button>}
        </div>
      ))}
    </div>
  );
};

const RewardsScreen = ({ state, dispatch, showToast }) => {
  const store = [
    { id: 'mpesa', name: 'M-Pesa KSH 100', cost: 1000, icon: '📱' },
    { id: 'airtime', name: 'Airtime KSH 50', cost: 500, icon: '📞' },
    { id: 'tree', name: 'Plant a Tree', cost: 300, icon: '🌳' },
    { id: 'nike', name: 'Nike Voucher', cost: 5000, icon: '👟' },
    { id: 'gym', name: 'Gym Day Pass', cost: 1200, icon: '🏋️' },
    { id: 'marathon', name: 'Nairobi Marathon Entry', cost: 8000, icon: '🏅' },
  ];

  const handleRedeem = (item) => {
    if (state.totalPoints >= item.cost) {
      dispatch({ type: 'SPEND_POINTS', payload: item.cost });
      showToast(`Success! ${item.name} redeemed.`);
    } else {
      showToast("Not enough Hatua Points", "warning");
    }
  };

  return (
    <div className="app-content">
      <div className="screen-header">Rewards</div>
      <div className="points-header">
        <div style={{ fontSize: 14, opacity: 0.8 }}>Current Balance</div>
        <div style={{ fontSize: 42, fontWeight: 900 }}>{state.totalPoints.toLocaleString()}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#ffcc00' }}>HATUA POINTS</div>
      </div>

      <div className="reward-grid">
        {store.map(item => (
          <div key={item.id} className="reward-item" onClick={() => handleRedeem(item)}>
            <div className="reward-img">{item.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, height: 32 }}>{item.name}</div>
            <div className="reward-cost">{item.cost} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileScreen = ({ state, showToast }) => {
  return (
    <div className="app-content">
      <div className="screen-header">Profile</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
        <div className="podium-avatar" style={{ width: 100, height: 100, fontSize: 48, backgroundColor: '#f0f0f0' }}>🐘</div>
        <div style={{ fontSize: 22, fontWeight: 800, marginTop: 10 }}>Jules_Dev</div>
        <div style={{ fontSize: 14, color: '#8e8e93' }}>Hatua Platinum Member</div>
      </div>

      <div className="referral-box">
        <div style={{ fontSize: 14, fontWeight: 700 }}>Your Referral Code</div>
        <div className="ref-code">SIMBA-7K4X</div>
        <button
          className="action-btn btn-start"
          style={{ padding: '10px 20px', fontSize: 14, width: 'auto' }}
          onClick={() => showToast("Code copied to clipboard!")}
        >
          <Share2 size={16} style={{ marginRight: 8 }} />
          SHARE WITH FRIENDS
        </button>
        <div style={{ fontSize: 11, color: '#8e8e93', marginTop: 10 }}>Earn 500 pts per referral!</div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {[
          { icon: <Target />, label: 'Personal Goals' },
          { icon: <Shield />, label: 'Privacy & Security' },
          { icon: <Zap />, label: 'Hatua Points History' },
          { icon: <User />, label: 'Account Settings' },
        ].map((item, i) => (
          <div key={i} className="leader-item" style={{ cursor: 'pointer' }}>
            <div style={{ marginRight: 15, color: '#8e8e93' }}>{item.icon}</div>
            <div className="leader-info" style={{ fontWeight: 600 }}>{item.label}</div>
            <ChevronRight size={20} color="#c7c7cc" />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Logic ---

const initialState = {
  activeTab: 'odometer',
  isTracking: false,
  distance: 0,
  steps: 0,
  elapsedSeconds: 0,
  totalPoints: 2450,
  mode: 'Outdoor',
  activity: 'walk',
  history: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TAB': return { ...state, activeTab: action.payload };
    case 'SET_MODE': return { ...state, mode: action.payload };
    case 'SET_ACTIVITY': return { ...state, activity: action.payload };
    case 'START_TRACKING': return { ...state, isTracking: true, distance: 0, steps: 0, elapsedSeconds: 0 };
    case 'STOP_TRACKING':
      const newPoints = Math.floor(state.steps / 100);
      return {
        ...state,
        isTracking: false,
        totalPoints: state.totalPoints + newPoints,
        history: [{ date: new Date(), steps: state.steps, points: newPoints }, ...state.history]
      };
    case 'TICK':
      if (!state.isTracking) return state;
      const stepInc = state.activity === 'jog' ? 3 : (state.activity === 'bike' ? 1 : 2);
      const distInc = state.activity === 'jog' ? 2.5 : (state.activity === 'bike' ? 6 : 1.5);
      return {
        ...state,
        steps: state.steps + stepInc,
        distance: state.distance + distInc,
        elapsedSeconds: state.elapsedSeconds + 1
      };
    case 'ADD_POINTS': return { ...state, totalPoints: state.totalPoints + action.payload };
    case 'SPEND_POINTS': return { ...state, totalPoints: state.totalPoints - action.payload };
    default: return state;
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timer;
    if (state.isTracking) {
      timer = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    }
    return () => clearInterval(timer);
  }, [state.isTracking]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const renderScreen = () => {
    switch(state.activeTab) {
      case 'odometer': return <OdometerScreen state={state} dispatch={dispatch} showToast={showToast} />;
      case 'map': return <MapScreen state={state} showToast={showToast} />;
      case 'rank': return <LeaderboardScreen state={state} />;
      case 'challenges': return <ChallengesScreen dispatch={dispatch} showToast={showToast} />;
      case 'rewards': return <RewardsScreen state={state} dispatch={dispatch} showToast={showToast} />;
      case 'profile': return <ProfileScreen state={state} showToast={showToast} />;
      default: return <OdometerScreen state={state} dispatch={dispatch} showToast={showToast} />;
    }
  };

  return (
    <div className="phone-frame">
      <div className="status-bar">
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 5 }}>
          <span style={{ fontSize: 12 }}>📶</span>
          <span style={{ fontSize: 12 }}>🔋</span>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}

      {renderScreen()}

      <div className="nav-bar">
        <div className={`nav-item ${state.activeTab === 'odometer' ? 'active' : ''}`} onClick={() => dispatch({ type: 'SET_TAB', payload: 'odometer' })}>
          <Activity size={24} />
          <span>Activity</span>
        </div>
        <div className={`nav-item ${state.activeTab === 'map' ? 'active' : ''}`} onClick={() => dispatch({ type: 'SET_TAB', payload: 'map' })}>
          <MapIcon size={24} />
          <span>Explore</span>
        </div>
        <div className={`nav-item ${state.activeTab === 'challenges' ? 'active' : ''}`} onClick={() => dispatch({ type: 'SET_TAB', payload: 'challenges' })}>
          <Target size={24} />
          <span>Goals</span>
        </div>
        <div className={`nav-item ${state.activeTab === 'rank' ? 'active' : ''}`} onClick={() => dispatch({ type: 'SET_TAB', payload: 'rank' })}>
          <Trophy size={24} />
          <span>Rank</span>
        </div>
        <div className={`nav-item ${state.activeTab === 'rewards' ? 'active' : ''}`} onClick={() => dispatch({ type: 'SET_TAB', payload: 'rewards' })}>
          <ShoppingBag size={24} />
          <span>Store</span>
        </div>
        <div className={`nav-item ${state.activeTab === 'profile' ? 'active' : ''}`} onClick={() => dispatch({ type: 'SET_TAB', payload: 'profile' })}>
          <User size={24} />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}

export default App;
