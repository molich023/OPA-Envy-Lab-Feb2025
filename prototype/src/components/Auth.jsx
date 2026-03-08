import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { InputField } from './Common';

const MOCK_OTP = "123456";

export const SplashScreen = ({ onNext }) => {
  useEffect(() => {
    const timer = setTimeout(onNext, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-content" style={{ justifyContent: 'center', alignItems: 'center', background: '#007aff' }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <div style={{ background: 'white', width: 100, height: 100, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <Zap size={60} color="#007aff" fill="#007aff" />
        </div>
        <h1 style={{ fontSize: 48, margin: 0, fontWeight: 950, letterSpacing: -2 }}>HATUA</h1>
        <p style={{ fontSize: 16, opacity: 0.9, fontWeight: 600 }}>Kila hatua ni ushindi mdogo</p>
      </div>
    </div>
  );
};

export const RegisterScreen = ({ onBack, onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);

  const checkStrength = (p) => {
    let s = 0;
    if (p.length > 7) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    setStrength(s);
  };

  return (
    <div className="app-content" style={{ padding: 25 }}>
      <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 5, letterSpacing: -1 }}>Join Hatua</h2>
      <p style={{ color: '#8e8e93', marginBottom: 35, fontSize: 15 }}>Create your account to start earning.</p>

      <InputField icon={User} label="FULL NAME" type="text" value={name} onChange={setName} placeholder="e.g. Eliud Kipchoge" />
      <InputField icon={Mail} label="EMAIL ADDRESS" type="email" value={email} onChange={setEmail} placeholder="eliud@run.ke" />
      <InputField icon={Phone} label="M-PESA PHONE" type="tel" value={phone} onChange={setPhone} placeholder="0712 345 678" />
      <InputField icon={Lock} label="PASSWORD" type="password" value={password} onChange={(v) => { setPassword(v); checkStrength(v); }} placeholder="Min 8 characters" />

      <div style={{ display: 'flex', gap: 6, marginBottom: 35 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ height: 5, flex: 1, borderRadius: 2.5, background: i <= strength ? (strength <= 2 ? '#ffcc00' : '#34c759') : '#e5e5ea', transition: 'background 0.3s' }} />
        ))}
      </div>

      <button className="action-btn btn-start" onClick={() => onRegister({ name, email, phone })}>
        REGISTER <ArrowRight size={20} style={{ marginLeft: 8 }} />
      </button>

      <div style={{ textAlign: 'center', marginTop: 25 }}>
        <span style={{ color: '#8e8e93', fontSize: 14 }}>Already have an account? </span>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#007aff', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Login</button>
      </div>
    </div>
  );
};

export const LoginScreen = ({ onNext, onGoRegister, showToast }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleLogin = () => {
    if (attempts >= 5) {
      showToast("Account locked for 15 mins", "warning");
      return;
    }
    if (email && password) {
      onNext(email);
    } else {
      setAttempts(a => a + 1);
      showToast("Invalid credentials", "warning");
    }
  };

  return (
    <div className="app-content" style={{ padding: 25 }}>
      <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 5, letterSpacing: -1 }}>Welcome Back</h2>
      <p style={{ color: '#8e8e93', marginBottom: 35, fontSize: 15 }}>Log in to your Hatua account.</p>

      <InputField icon={Mail} label="EMAIL ADDRESS" type="email" value={email} onChange={setEmail} placeholder="eliud@run.ke" />
      <InputField icon={Lock} label="PASSWORD" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

      <div style={{ textAlign: 'right', marginBottom: 35 }}>
        <button style={{ background: 'none', border: 'none', color: '#007aff', fontWeight: 700, fontSize: 13 }}>Forgot Password?</button>
      </div>

      <button className="action-btn btn-start" onClick={handleLogin}>
        LOG IN <ArrowRight size={20} style={{ marginLeft: 8 }} />
      </button>

      <div style={{ textAlign: 'center', marginTop: 25 }}>
        <span style={{ color: '#8e8e93', fontSize: 14 }}>New to Hatua? </span>
        <button onClick={onGoRegister} style={{ background: 'none', border: 'none', color: '#007aff', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Register</button>
      </div>
    </div>
  );
};

export const OTPScreen = ({ email, onVerify, onResend }) => {
  const [otp, setOtp] = useState('');

  return (
    <div className="app-content" style={{ padding: 25 }}>
      <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 5, letterSpacing: -1 }}>Verify Identity</h2>
      <p style={{ color: '#8e8e93', marginBottom: 35, fontSize: 15 }}>Enter the 6-digit code sent to <b>{email}</b></p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={{
            width: '100%', letterSpacing: 20, textAlign: 'center', fontSize: 36, fontWeight: 950,
            padding: 20, borderRadius: 20, border: '2px solid #007aff', background: '#f0f7ff',
            boxShadow: '0 4px 12px rgba(0,122,255,0.1)', outline: 'none'
          }}
          placeholder="000000"
        />
      </div>

      <button className="action-btn btn-start" onClick={() => otp === MOCK_OTP ? onVerify() : alert("Wrong OTP (Hint: 123456)")}>
        VERIFY NOW
      </button>

      <div style={{ textAlign: 'center', marginTop: 25 }}>
        <button onClick={onResend} style={{ background: 'none', border: 'none', color: '#8e8e93', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, margin: '0 auto' }}>
          <RefreshCw size={15} /> Resend code
        </button>
      </div>
    </div>
  );
};
