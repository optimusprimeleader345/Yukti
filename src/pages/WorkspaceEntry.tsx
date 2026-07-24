import React, { useState } from 'react';
import './WorkspaceEntry.css';
import { Folder, ChevronRight, Clock, Plus } from 'lucide-react';
import { GitHubConnectModal } from '../components/workspace/GitHubConnectModal';

export const WorkspaceEntry: React.FC = () => {
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  return (
    <div className="ws-entry-root">
      <div className="ws-entry-container">
        
        <div className="ws-entry-header">
          <h1>Good morning.</h1>
          <p>What are we building today?</p>
        </div>

        {/* Global Command/Search Placeholder */}
        <div className="ws-search-bar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Search repositories, open projects, or ask AI..." />
          <div className="ws-search-shortcut">⌘K</div>
        </div>

        <div className="ws-entry-content">
          
          {/* Main Actions */}
          <div className="ws-actions-grid">
            <button className="ws-action-card" onClick={() => setIsGitHubModalOpen(true)}>
              <div className="ws-action-icon github">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.4-3.6 5.3 5.3 0 0 0-.1-3.5s-1.2-.38-3.9 1.4a13.38 13.38 0 0 0-7 0C4.3 2.5 3 2.9 3 2.9a5.3 5.3 0 0 0-.1 3.5A5.2 5.2 0 0 0 1.5 10c0 5.23 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"/><path d="M9 20a1 1 0 0 1-1 1H7a3 3 0 0 1-3-3 2 2 0 0 0-2-2"/></svg>
              </div>
              <div className="ws-action-text">
                <h3>Connect GitHub</h3>
                <p>Import and analyze repositories</p>
              </div>
              <ChevronRight size={16} className="ws-action-chevron" />
            </button>

            <button className="ws-action-card">
              <div className="ws-action-icon local"><Folder size={20} /></div>
              <div className="ws-action-text">
                <h3>Local Project</h3>
                <p>Open a folder from your machine</p>
              </div>
              <ChevronRight size={16} className="ws-action-chevron" />
            </button>
          </div>

          {/* Recent Projects */}
          <div className="ws-recent-section">
            <div className="ws-recent-header">
              <h3>Recent Projects</h3>
              <button className="ws-recent-new"><Plus size={14}/> New</button>
            </div>

            <div className="ws-recent-list">
              {[
                { name: 'frontend-core', desc: 'React, Vite, Tailwind', time: '2 hours ago' },
                { name: 'auth-service', desc: 'Node.js, Express, Redis', time: 'Yesterday' },
                { name: 'infrastructure-aws', desc: 'Terraform, Python', time: '3 days ago' },
              ].map((proj) => (
                <div className="ws-recent-item" key={proj.name}>
                  <div className="ws-recent-item-icon">
                    <Clock size={14} />
                  </div>
                  <div className="ws-recent-item-info">
                    <span className="ws-proj-name">{proj.name}</span>
                    <span className="ws-proj-desc">{proj.desc}</span>
                  </div>
                  <div className="ws-recent-item-time">{proj.time}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <GitHubConnectModal 
        isOpen={isGitHubModalOpen} 
        onClose={() => setIsGitHubModalOpen(false)} 
      />
    </div>
  );
};
