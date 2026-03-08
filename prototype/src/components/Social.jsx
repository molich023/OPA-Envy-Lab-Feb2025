import React from 'react';

export const ChallengesScreen = ({ state, dispatch, showToast }) => (
  <div className="app-content"><div className="screen-header">Challenges</div>
    {state.challenges.map(c => (
      <div key={c.id} className="challenge-card">
        <div className="challenge-icon">{c.icon}</div>
        <div className="challenge-info">
          <div className="challenge-title">{c.title}</div>
          <div className="challenge-reward">REWARD: {c.reward}</div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${c.progress}%` }}></div></div>
        </div>
        {!c.joined && <button className="btn-join" onClick={() => { dispatch({ type: 'JOIN_CHALLENGE', payload: c.id }); showToast("Joined! +50 pts"); }}>JOIN</button>}
      </div>
    ))}
  </div>
);

export const RankingsScreen = ({ state }) => (
  <div className="app-content">
    <div className="screen-header">Rankings</div>
    <div className="tabs">
      <div className="tab active">Nairobi</div>
      <div className="tab">National</div>
      <div className="tab">Friends</div>
    </div>
    <div className="podium">
      <div className="podium-item p-2">
        <div className="podium-avatar">🐆</div>
        <div className="p-name">Muthoni</div>
        <div className="p-steps">12.4k</div>
      </div>
      <div className="podium-item p-1">
        <div className="podium-avatar">🦁</div>
        <div className="p-name">Kipchoge</div>
        <div className="p-steps">25.1k</div>
      </div>
      <div className="podium-item p-3">
        <div className="podium-avatar">🦅</div>
        <div className="p-name">Omanyala</div>
        <div className="p-steps">10.8k</div>
      </div>
    </div>
    <div className="leaderboard-list">
      {[
        { rank: 4, name: state.user?.name || 'You', steps: '9,204', points: '+92', icon: '🐘', me: true },
        { rank: 5, name: 'Kamau', steps: '8,100', points: '+81', icon: '🦏' },
        { rank: 6, name: 'Achieng', steps: '7,500', points: '+75', icon: '🦒' },
        { rank: 7, name: 'Wanjiku', steps: '6,200', points: '+62', icon: '🦓' },
      ].map((item, i) => (
        <div key={i} className={`leader-item ${item.me ? 'my-rank-row' : ''}`}>
          <div className="rank">{item.rank}</div>
          <div className="avatar">{item.icon}</div>
          <div className="leader-info">
            <div className="leader-name">{item.name}</div>
            <div className="leader-steps">{item.steps} steps</div>
          </div>
          <div className="leader-points">{item.points}</div>
        </div>
      ))}
    </div>
  </div>
);

export const RewardsScreen = ({ state, showToast }) => (
  <div className="app-content"><div className="screen-header">Rewards</div>
    <div className="points-header">
      <div style={{ fontSize: 14, opacity: 0.8 }}>Balance</div>
      <div style={{ fontSize: 48, fontWeight: 950 }}>{state.totalPoints}</div>
      <div style={{ color: '#ffcc00', fontWeight: 800 }}>HATUA POINTS</div>
    </div>
    <div className="reward-grid">
      {['M-Pesa 100', 'Airtime 50', 'Plant Tree', 'Nike Code'].map((r, i) => (
        <div key={i} className="reward-item" onClick={() => showToast("Processing redemption...")}><div style={{ fontSize: 24 }}>{['📱','📞','🌳','👟'][i]}</div><b>{r}</b></div>
      ))}
    </div>
  </div>
);

export const ProfileScreen = ({ state, dispatch }) => (
  <div className="app-content" style={{ padding: 20 }}><div className="screen-header">Profile</div>
    <div style={{ textAlign: 'center', marginBottom: 35 }}>
      <div className="podium-avatar" style={{ margin: '0 auto', fontSize: 48, width: 100, height: 100 }}>🐘</div>
      <h3 style={{ margin: '15px 0 0', fontSize: 22, fontWeight: 900 }}>{state.user?.name || "Guest Runner"}</h3>
      <p style={{ color: '#8e8e93', margin: 5 }}>Dhahabu Member</p>
    </div>
    <div className="referral-box">
      <div style={{ fontSize: 12, color: '#8e8e93', marginBottom: 5 }}>REFERRAL PROGRAMME</div>
      Your Code: <b style={{ color: '#007aff' }}>SIMBA-7K4X</b>
      <div style={{ fontSize: 11, marginTop: 10, color: '#34c759', fontWeight: 700 }}>{state.referrals}/10 for 2x Multiplier</div>
    </div>
    <button className="action-btn btn-stop" style={{ marginTop: 'auto' }} onClick={() => dispatch({ type: 'LOGOUT' })}>LOG OUT</button>
  </div>
);
