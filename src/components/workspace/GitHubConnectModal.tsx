import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import './GitHubConnectModal.css';

interface GitHubConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ConnectState = 'idle' | 'connecting' | 'success';

export const GitHubConnectModal: React.FC<GitHubConnectModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [connectState, setConnectState] = useState<ConnectState>('idle');
  const [token, setToken] = useState('');

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;
    setConnectState('connecting');
  };

  useEffect(() => {
    if (connectState === 'connecting') {
      const timer1 = setTimeout(() => setConnectState('success'), 1500);
      const timer2 = setTimeout(() => {
        onClose();
        navigate('/workspace/repositories');
      }, 2500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [connectState, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="gh-modal-overlay">
      <div className="gh-modal-content">
        <button className="gh-modal-close" onClick={onClose} disabled={connectState !== 'idle'}>
          <X size={20} />
        </button>

        <div className="gh-modal-header">
          <div className="gh-modal-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </div>
          <h2>Connect GitHub</h2>
          <p>Authorize Yukti to analyze your repositories</p>
        </div>

        <div className="gh-modal-body">
          {connectState === 'idle' && (
            <form className="gh-token-form" onSubmit={handleConnect}>
              <div className="gh-input-group">
                <label>Personal Access Token</label>
                <input 
                  type="password" 
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" 
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                className="gh-connect-btn"
                disabled={!token.trim()}
              >
                Connect to GitHub
              </button>
            </form>
          )}

          {connectState === 'connecting' && (
            <div className="gh-status-container">
              <Loader2 className="gh-spinner" size={24} />
              <span>Authenticating...</span>
            </div>
          )}

          {connectState === 'success' && (
            <div className="gh-status-container success">
              <CheckCircle2 size={24} />
              <span>Connected successfully</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
