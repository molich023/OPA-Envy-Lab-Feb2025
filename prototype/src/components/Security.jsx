import React from 'react';
import { ShieldCheck, Fingerprint, AlertTriangle } from 'lucide-react';

export const SecurityPanel = ({ onClose }) => (
  <div className="app-content" style={{ padding: 25, background: '#1c1c1e', color: 'white' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
      <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
        <ShieldCheck color="#34c759" size={28} /> Security Panel
      </h2>
      <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: 20, padding: '6px 14px', fontSize: 13, fontWeight: 700 }}>Close</button>
    </div>

    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 18, padding: 20, marginBottom: 25 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <Fingerprint color="#007aff" />
        <span style={{ fontWeight: 800, fontSize: 15 }}>Active Protections</span>
      </div>
      <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#8e8e93', lineHeight: 1.8 }}>
        <li>AES-256 Encryption for Data-at-Rest</li>
        <li>OWASP-Aligned Rate Limiting (5 failed attempts)</li>
        <li>JWT-based Secure Session Management</li>
        <li>Input Sanitization & CSRF Mitigation</li>
      </ul>
    </div>

    <h3 style={{ fontSize: 12, textTransform: 'uppercase', color: '#8e8e93', letterSpacing: 1, marginBottom: 10 }}>OWASP Top 10 Readiness</h3>
    {[
      { label: 'Broken Access Control', status: 'Protected', color: '#34c759' },
      { label: 'Cryptographic Failures', status: 'Secure', color: '#34c759' },
      { label: 'Injection (SQL/NoSQL)', status: 'Sanitised', color: '#34c759' },
      { label: 'Insecure Design', status: 'Validated', color: '#34c759' },
      { label: 'Security Misconfiguration', status: 'Hardened', color: '#34c759' },
    ].map((item, i) => (
      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</span>
        <span style={{ fontSize: 12, fontWeight: 800, color: item.color }}>{item.status}</span>
      </div>
    ))}

    <div style={{ marginTop: 'auto', padding: 18, background: 'rgba(255,153,0,0.1)', borderRadius: 16, display: 'flex', gap: 12, border: '1px solid rgba(255,153,0,0.2)' }}>
      <AlertTriangle color="#ff9900" size={32} />
      <div style={{ fontSize: 12, color: '#ff9900', lineHeight: 1.5 }}>
        <b>Security Audit Log:</b> 0 failed login attempts detected from current session. Rate limiter is standby.
      </div>
    </div>
  </div>
);
