import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const Toast = ({ message, type = 'success' }) => (
  <div className="toast-container" style={{ background: type === 'warning' ? '#ffcc00' : 'rgba(0,0,0,0.85)', color: type === 'warning' ? '#000' : '#fff' }}>
    {type === 'success' ? <CheckCircle2 size={20} color="#34c759" /> : <AlertCircle size={20} />}
    <span style={{ fontSize: 14, fontWeight: 600 }}>{message}</span>
  </div>
);

export const InputField = ({ icon: Icon, label, type, value, onChange, placeholder, error }) => (
  <div style={{ marginBottom: 15 }}>
    <label style={{ fontSize: 11, fontWeight: 800, color: '#8e8e93', display: 'block', marginBottom: 5, letterSpacing: 1 }}>{label}</label>
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', left: 12, color: '#8e8e93' }}>
        <Icon size={18} />
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '14px 14px 14px 40px', borderRadius: 14, border: '1px solid #e5e5ea',
          fontSize: 15, outline: 'none', background: '#f8f9fa'
        }}
      />
    </div>
    {error && <div style={{ fontSize: 11, color: '#ff3b30', marginTop: 4, fontWeight: 600 }}>{error}</div>}
  </div>
);
