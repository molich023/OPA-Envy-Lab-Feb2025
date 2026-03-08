import React from 'react';
import { ShieldCheck, Navigation, Search, Layers, Zap, ChevronRight } from 'lucide-react';

export const MapScreen = ({ state, dispatch, showToast, setShowSecurity }) => {
  return (
    <div className="app-content">
      <div className="map-placeholder" style={{ background: '#cadfb1' }}>
        <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 100, pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div onClick={() => setShowSecurity(true)} style={{ background: 'white', padding: 8, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
            <ShieldCheck color="#34c759" size={24} />
          </div>
          <div onClick={() => { dispatch({ type: 'TOGGLE_SAFETY' }); showToast(state.safetyMode ? "Safety Mode Disabled" : "Safety Mode: 'Walk With Me' Active", state.safetyMode ? "warning" : "success"); }}
               style={{ background: state.safetyMode ? '#ff3b30' : 'white', padding: 8, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
            <Navigation size={24} color={state.safetyMode ? 'white' : '#007aff'} />
          </div>
        </div>
        <div className="map-ui-overlay">
          <div className="search-bar">
            <Search size={18} color="#8e8e93" />
            <span style={{ color: '#8e8e93', fontSize: 14 }}>Find routes in Nairobi...</span>
          </div>
        </div>
        <div className="route-card-scroll">
          {[
            { name: 'Uhuru Park Loop', dist: '2.4km', active: true },
            { name: 'Karura Forest', dist: '5.1km' },
            { name: 'Jevanjee Gardens', dist: '0.8km' },
            { name: 'Ngong Hills', dist: '12km' }
          ].map((r, i) => (
            <div key={i} className={`route-card ${r.active ? 'active' : ''}`}>
              <div className="route-name">{r.name}</div>
              <div className="route-meta">{r.dist} • Easy</div>
            </div>
          ))}
        </div>

        <svg width="100%" height="100%" viewBox="0 0 400 600" style={{ opacity: 0.6 }}>
          <path d="M50,300 Q150,250 200,300 T350,300" stroke="#007aff" strokeWidth="6" fill="none" strokeDasharray="10,5" />
          <circle cx="50" cy="300" r="6" fill="#007aff" />
          <circle cx="350" cy="300" r="8" fill="#ff3b30" />
        </svg>

        <div className="map-controls">
          <div className="map-btn"><Navigation size={20} color="#007aff" /></div>
          <div className="map-btn"><Layers size={20} color="#8e8e93" /></div>
        </div>

        <div className="route-suggestion">
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 10 }}><Zap size={20} /></div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8 }}>AI SUGGESTION</div>
            <div style={{ fontSize: 13, fontWeight: 800 }}>Morning Run: CBD to Westlands</div>
          </div>
          <ChevronRight size={20} style={{ marginLeft: 'auto' }} />
        </div>
      </div>
    </div>
  );
};
