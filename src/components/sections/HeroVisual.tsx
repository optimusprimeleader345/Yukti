import React from 'react';
import './HeroVisual.css';

export const HeroVisual: React.FC = () => {
  return (
    <div className="hero-visual">
      {/* 3D Cubes */}
      <div className="cube cube-left">
        <div className="cube-face front"></div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
      </div>
      
      <div className="cube cube-right">
        <div className="cube-face front"></div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
      </div>
      
      <div className="chat-glass-panel">
        <div className="chat-messages">
          <div className="message user-message">
            <div className="bubble">Hey, I need help analyzing the new authentication module. Can you check for vulnerabilities?</div>
            <div className="avatar user-avatar"><img src="https://i.pravatar.cc/100?img=5" alt="User" /></div>
          </div>
          
          <div className="message ai-message">
            <div className="avatar ai-avatar">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><path d="M16 3L4 10v12l12 7 12-7V10L16 3z" fill="white"/></svg>
            </div>
            <div className="bubble">Of course! I'll scan the authentication module for security risks and technical debt. Would you like a full report or just critical issues?</div>
          </div>
          
          <div className="message user-message">
            <div className="bubble">Just the critical issues for now.</div>
            <div className="avatar user-avatar"><img src="https://i.pravatar.cc/100?img=5" alt="User" /></div>
          </div>
        </div>
        
        <div className="chat-input-area">
          <div className="input-options">
            <span className="badge-option">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Yukti AI <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
            </span>
            <span className="badge-option">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              Search
            </span>
          </div>
          <div className="input-box">
            <input type="text" placeholder="Ask anything about your codebase..." />
            <button className="send-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
