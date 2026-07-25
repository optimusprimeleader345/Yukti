import React, { useState } from 'react';
import './WorkspaceEntry.css';
import { ChevronRight, UploadCloud, GitBranch, Clock, FileCode, FileText, ShieldAlert } from 'lucide-react';
import { GitHubConnectModal } from '../components/workspace/GitHubConnectModal';
import { ZipUploadModal } from '../components/workspace/ZipUploadModal';
import { RedTeamModal } from '../components/workspace/RedTeamModal';

const recentProjects = [
  { id: 1, name: 'acme-corp/frontend-core', type: 'github', time: '2 hours ago', icon: <GitBranch size={16} /> },
  { id: 2, name: 'SystemDesign_V2.pdf', type: 'document', time: 'Yesterday', icon: <FileText size={16} /> },
  { id: 3, name: 'legacy-api-service.zip', type: 'zip', time: '3 days ago', icon: <FileCode size={16} /> },
];

export const WorkspaceEntry: React.FC = () => {
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isZipModalOpen, setIsZipModalOpen] = useState(false);
  const [isRedTeamModalOpen, setIsRedTeamModalOpen] = useState(false);

  return (
    <div className="ws-entry-root">
      
      {/* Decorative Background Elements */}
      <div className="ws-mesh-bg">
        <div className="ws-mesh-blob purple"></div>
        <div className="ws-mesh-blob blue"></div>
      </div>

      <div className="ws-entry-container">
        
        <div className="ws-entry-header">
          <h1>Welcome back, Engineer.</h1>
          <p>What are we analyzing or stress-testing today?</p>
        </div>

        <div className="ws-action-grid">
          {/* GitHub Connect Card */}
          <button className="ws-premium-card github-card" onClick={() => setIsGitHubModalOpen(true)}>
            <div className="ws-card-glow"></div>
            <div className="ws-card-icon">
              <GitBranch size={28} />
            </div>
            <div className="ws-card-content">
              <h3>Connect Repository</h3>
              <p>Import directly from GitHub via OAuth or Personal Access Token</p>
            </div>
            <div className="ws-card-arrow" style={{ alignSelf: 'flex-end', marginTop: 'auto' }}>
              <ChevronRight size={20} />
            </div>
          </button>

          {/* Local Upload Card */}
          <button className="ws-premium-card local-card" onClick={() => setIsZipModalOpen(true)}>
            <div className="ws-card-glow"></div>
            <div className="ws-card-icon">
              <UploadCloud size={28} />
            </div>
            <div className="ws-card-content">
              <h3>Upload Local Data</h3>
              <p>Extract intelligence from .zip, .md, or .pdf files instantly</p>
            </div>
            <div className="ws-card-arrow" style={{ alignSelf: 'flex-end', marginTop: 'auto' }}>
              <ChevronRight size={20} />
            </div>
          </button>

          {/* AI Red-Team Simulator Card */}
          <button className="ws-premium-card redteam-card" onClick={() => setIsRedTeamModalOpen(true)}>
            <div className="ws-card-glow" style={{ background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.08) 0%, transparent 70%)' }}></div>
            <div className="ws-card-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <ShieldAlert size={28} />
            </div>
            <div className="ws-card-content">
              <h3>AI Red-Team Simulator</h3>
              <p>Autonomous cyber attack stress testing & zero-trust defensive shield generator</p>
            </div>
            <div className="ws-card-arrow" style={{ alignSelf: 'flex-end', marginTop: 'auto', color: '#ef4444' }}>
              <ChevronRight size={20} />
            </div>
          </button>
        </div>

        <div className="ws-recent-section">
          <div className="ws-recent-header">
            <Clock size={16} />
            <h2>Recent Activity</h2>
          </div>
          
          <div className="ws-recent-list">
            {recentProjects.map((proj) => (
              <div key={proj.id} className="ws-recent-item">
                <div className={`ws-recent-icon ${proj.type}`}>
                  {proj.icon}
                </div>
                <div className="ws-recent-details">
                  <h4>{proj.name}</h4>
                  <span>Analyzed {proj.time}</span>
                </div>
                <button className="ws-recent-open">
                  Open Workspace
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      <GitHubConnectModal 
        isOpen={isGitHubModalOpen} 
        onClose={() => setIsGitHubModalOpen(false)} 
      />
      <ZipUploadModal 
        isOpen={isZipModalOpen} 
        onClose={() => setIsZipModalOpen(false)} 
      />
      <RedTeamModal 
        isOpen={isRedTeamModalOpen} 
        onClose={() => setIsRedTeamModalOpen(false)} 
      />
    </div>
  );
};

