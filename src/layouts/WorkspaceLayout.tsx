import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './WorkspaceLayout.css';
import { Settings, User, Bell } from 'lucide-react';

export const WorkspaceLayout: React.FC = () => {
  return (
    <div className="workspace-layout">
      {/* Topbar Navigation */}
      <header className="ws-topbar">
        <div className="ws-topbar-left">
          <Link to="/workspace" className="ws-brand">
            <div className="ws-brand-icon" style={{ background: 'transparent', width: '100px', height: '32px' }}>
              <img src="/Logo3.png" alt="Yukti" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span className="ws-brand-name">Yukti</span>
          </Link>
          <div className="ws-topbar-divider"></div>
          <span className="ws-breadcrumbs">Workspace</span>
        </div>
        
        <div className="ws-topbar-right">
          <button className="ws-icon-btn"><Bell size={16} /></button>
          <button className="ws-icon-btn"><Settings size={16} /></button>
          <button className="ws-icon-btn ws-user-btn"><User size={16} /></button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="ws-main">
        <Outlet />
      </main>
    </div>
  );
};
