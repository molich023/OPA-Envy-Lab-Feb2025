import React, { useState, useEffect, useReducer } from 'react';
import {
  Activity as ActivityIcon, Map as MapIcon, Trophy, Target, ShoppingBag, User as UserIcon
} from 'lucide-react';

import { Toast } from './components/Common';
import { SplashScreen, RegisterScreen, LoginScreen, OTPScreen } from './components/Auth';
import { SecurityPanel } from './components/Security';
import { OdometerScreen } from './components/Activity';
import { MapScreen } from './components/Map';
import { ChallengesScreen, RankingsScreen, RewardsScreen, ProfileScreen } from './components/Social';

// --- Global Constants & Persistence ---
const STORAGE_KEY = 'HATUA_APP_DATA_V3';

const loadData = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return {
    user: null,
    totalPoints: 2450,
    history: [],
    challenges: [
      { id: 1, title: '7-Day Streak', reward: '200 pts', progress: 80, time: '2 days left', icon: '🔥', joined: true },
      { id: 2, title: '10k Step Saturday', reward: '50 pts', progress: 0, time: 'Starts in 12h', icon: '👟', joined: false },
      { id: 3, title: 'Karura Explorer', reward: '150 pts', progress: 40, time: '5 days left', icon: '🌳', joined: true },
      { id: 4, title: 'Referral Sprint', reward: '1000 pts', progress: 10, time: '14 days left', icon: '📢', joined: false },
      { id: 5, title: 'Nairobi CBD Loop', reward: '75 pts', progress: 0, time: 'Starts in 2h', icon: '🏙️', joined: false },
    ],
    screen: 'splash',
    activeTab: 'odometer',
    isTracking: false,
    distance: 0,
    steps: 0,
    elapsedSeconds: 0,
    mode: 'Outdoor',
    activity: 'walk',
    safetyMode: false,
    referrals: 3
  };
};

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// --- Main Reducer & Logic ---

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case 'SET_SCREEN': newState = { ...state, screen: action.payload }; break;
    case 'SET_TAB': newState = { ...state, activeTab: action.payload }; break;
    case 'SET_MODE': newState = { ...state, mode: action.payload }; break;
    case 'SET_ACTIVITY': newState = { ...state, activity: action.payload }; break;
    case 'START_TRACKING': newState = { ...state, isTracking: true, distance: 0, steps: 0, elapsedSeconds: 0 }; break;
    case 'STOP_TRACKING':
      const newPoints = Math.floor(state.steps / 100);
      newState = {
        ...state,
        isTracking: false,
        totalPoints: state.totalPoints + newPoints,
        history: [{ date: new Date(), steps: state.steps, points: newPoints }, ...state.history]
      };
      break;
    case 'TICK':
      if (!state.isTracking) return state;
      const stepInc = state.activity === 'jog' ? 3 : (state.activity === 'bike' ? 1 : 2);
      const distInc = state.activity === 'jog' ? 2.5 : (state.activity === 'bike' ? 6 : 1.5);
      return { ...state, steps: state.steps + stepInc, distance: state.distance + distInc, elapsedSeconds: state.elapsedSeconds + 1 };
    case 'REGISTER': newState = { ...state, user: action.payload, screen: 'login' }; break;
    case 'LOGIN': newState = { ...state, authEmail: action.payload, screen: 'otp' }; break;
    case 'VERIFY': newState = { ...state, screen: 'main', activeTab: 'odometer' }; break;
    case 'LOGOUT': newState = { ...state, user: null, screen: 'login' }; break;
    case 'TOGGLE_SAFETY': newState = { ...state, safetyMode: !state.safetyMode }; break;
    case 'JOIN_CHALLENGE':
      newState = {
        ...state,
        challenges: state.challenges.map(c => c.id === action.payload ? { ...c, joined: true } : c),
        totalPoints: state.totalPoints + 50
      };
      break;
    default: return state;
  }
  saveData(newState);
  return newState;
}

function App() {
  const [state, dispatch] = useReducer(reducer, null, loadData);
  const [toast, setToast] = useState(null);
  const [showSecurity, setShowSecurity] = useState(false);

  useEffect(() => {
    let timer;
    if (state.isTracking) timer = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(timer);
  }, [state.isTracking]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (!state) return null;

  if (showSecurity) return <SecurityPanel onClose={() => setShowSecurity(false)} />;

  const renderAuthenticatedScreen = () => {
    switch(state.activeTab) {
      case 'odometer': return <OdometerScreen state={state} dispatch={dispatch} showToast={showToast} />;
      case 'map': return <MapScreen state={state} dispatch={dispatch} showToast={showToast} setShowSecurity={setShowSecurity} />;
      case 'challenges': return <ChallengesScreen state={state} dispatch={dispatch} showToast={showToast} />;
      case 'rank': return <RankingsScreen state={state} />;
      case 'rewards': return <RewardsScreen state={state} showToast={showToast} />;
      case 'profile': return <ProfileScreen state={state} dispatch={dispatch} />;
    }
  };

  const renderScreen = () => {
    if (state.screen === 'splash') return <SplashScreen onNext={() => dispatch({ type: 'SET_SCREEN', payload: state.user ? 'login' : 'register' })} />;
    if (state.screen === 'register') return <RegisterScreen onBack={() => dispatch({ type: 'SET_SCREEN', payload: 'login' })} onRegister={(u) => { dispatch({ type: 'REGISTER', payload: u }); showToast("Account created! Please log in."); }} />;
    if (state.screen === 'login') return <LoginScreen onNext={(e) => dispatch({ type: 'LOGIN', payload: e })} onGoRegister={() => dispatch({ type: 'SET_SCREEN', payload: 'register' })} showToast={showToast} />;
    if (state.screen === 'otp') return <OTPScreen email={state.authEmail} onVerify={() => { dispatch({ type: 'VERIFY' }); showToast("Welcome to Hatua!"); }} onResend={() => showToast("New OTP sent")} />;
    return renderAuthenticatedScreen();
  };

  return (
    <div className="phone-frame">
      <div className="status-bar">
        <span style={{ fontWeight: 800 }}>9:41</span>
        <div style={{ display: 'flex', gap: 6 }}><span>📶</span><span>🔋</span></div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} />}
      {renderScreen()}
      {state.screen === 'main' && (
        <div className="nav-bar">
          <div className={`nav-item ${state.activeTab === 'odometer' ? 'active' : ''}`} onClick={() => dispatch({ type: 'SET_TAB', payload: 'odometer' })}><ActivityIcon size={24} /></div>
          <div className={`nav-item ${state.activeTab === 'map' ? 'active' : ''}`} onClick={() => dispatch({ type: 'SET_TAB', payload: 'map' })}><MapIcon size={24} /></div>
          <div className={`nav-item ${state.activeTab === 'challenges' ? 'active' : ''}`} onClick={() => dispatch({ type: 'SET_TAB', payload: 'challenges' })}><Target size={24} /></div>
          <div className={`nav-item ${state.activeTab === 'rank' ? 'active' : ''}`} onClick={() => dispatch({ type: 'SET_TAB', payload: 'rank' })}><Trophy size={24} /></div>
          <div className={`nav-item ${state.activeTab === 'rewards' ? 'active' : ''}`} onClick={() => dispatch({ type: 'SET_TAB', payload: 'rewards' })}><ShoppingBag size={24} /></div>
          <div className={`nav-item ${state.activeTab === 'profile' ? 'active' : ''}`} onClick={() => dispatch({ type: 'SET_TAB', payload: 'profile' })}><UserIcon size={24} /></div>
        </div>
      )}
    </div>
  );
}

export default App;
