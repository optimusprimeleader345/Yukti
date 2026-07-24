import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/workspace');
  };

  return (
    <div className="login-root">
      {/* Subtle 3D floating background elements */}
      <div className="login-cube login-cube-1"></div>
      <div className="login-cube login-cube-2"></div>
      
      <div className="login-glass-modal glass-panel">
        <div className="login-brand-center">
          <Link to="/" className="login-brand">
            <div className="login-brand-icon" style={{ background: 'transparent', border: 'none', boxShadow: 'none', width: '160px', height: '56px' }}>
              <img src="/Logo2.png" alt="Yukti" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </Link>
        </div>

        <div className="login-header">
          <h2>Welcome back</h2>
          <p>Sign in to your intelligent workspace</p>
        </div>

        <button className="login-google-btn glass-btn">
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <div className="login-divider"><span>or continue with email</span></div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required className="glass-input" />
          </div>
          <div className="login-field">
            <label htmlFor="password">
              Password
              <a href="#" className="login-forgot">Forgot?</a>
            </label>
            <input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="glass-input" />
          </div>
          <button type="submit" className="login-submit-btn">Sign In</button>
        </form>

        <button type="button" onClick={() => navigate('/workspace')} className="login-demo-btn">
          Access Demo Workspace
        </button>

        <p className="login-switch">
          Don't have an account? <Link to="/signup">Create one free</Link>
        </p>
      </div>
    </div>
  );
};
