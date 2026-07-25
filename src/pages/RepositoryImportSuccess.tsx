import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, FileCode, FolderTree, HardDrive, ArrowRight, ShieldCheck, Zap, Activity, Globe } from 'lucide-react';
import './RepositoryImportSuccess.css';

export const RepositoryImportSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Read real file data passed from the upload modal, fallback to mock if none
  const fileData = location.state?.fileData || { name: 'acme-corp-frontend.zip', size: '14.2 MB' };
  
  // Determine if this is a document or a codebase based on extension
  const isDocument = fileData.name.endsWith('.md') || fileData.name.endsWith('.pdf') || fileData.name.endsWith('.txt');

  return (
    <div className="import-success-root">
      <div className="import-success-container">
        
        <div className="import-success-header">
          <div className="import-success-icon">
            <CheckCircle2 size={32} />
          </div>
          <h1>{isDocument ? 'Document Intelligence' : 'Repository Intelligence'}</h1>
          <p>AI has successfully analyzed <strong>{fileData.name}</strong></p>
        </div>

        <div className="import-dashboard-grid">
          
          {/* Left Column: Project DNA */}
          <div className="import-dna-panel">
            <h3>Project DNA</h3>
            <div className="dna-stats">
              <div className="dna-stat-row">
                <HardDrive size={16} /> 
                <span>File Size</span>
                <strong>{fileData.size}</strong>
              </div>
              {!isDocument && (
                <>
                  <div className="dna-stat-row">
                    <FileCode size={16} /> 
                    <span>Total Files</span>
                    <strong>1,248</strong>
                  </div>
                  <div className="dna-stat-row">
                    <FolderTree size={16} /> 
                    <span>Directories</span>
                    <strong>142</strong>
                  </div>
                </>
              )}
            </div>
            
            {!isDocument && (
              <div className="dna-languages">
                <h4>Language Distribution</h4>
                <div className="lang-bar-chart">
                  <div className="lang-segment ts" style={{ width: '65%' }} title="TypeScript 65%"></div>
                  <div className="lang-segment react" style={{ width: '25%' }} title="React/TSX 25%"></div>
                  <div className="lang-segment css" style={{ width: '10%' }} title="CSS 10%"></div>
                </div>
                <div className="lang-legend">
                  <span><div className="lang-dot ts"></div> TS (65%)</span>
                  <span><div className="lang-dot react"></div> TSX (25%)</span>
                  <span><div className="lang-dot css"></div> CSS (10%)</span>
                </div>
              </div>
            )}
            
            {isDocument && (
              <div className="dna-languages">
                <h4>Content Type</h4>
                <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>Technical Documentation / System Architecture Guidelines</p>
              </div>
            )}
          </div>

          {/* Right Column: AI Insights */}
          <div className="import-insights-panel">
            <h3>AI Quick Insights</h3>
            
            <div className="insight-card">
              <div className="insight-icon shield"><ShieldCheck size={18} /></div>
              <div className="insight-content">
                <h4>Security Health Score</h4>
                <p><strong>98/100 (A+)</strong> — No critical vulnerabilities found.</p>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon zap"><Zap size={18} /></div>
              <div className="insight-content">
                <h4>Architecture Pattern</h4>
                <p>{isDocument ? 'System Design Specification' : 'React Single Page Application (SPA)'}</p>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon activity"><Activity size={18} /></div>
              <div className="insight-content">
                <h4>Technical Debt Estimate</h4>
                <p><strong>Low</strong> — Approx. 4 hours to resolve minor warnings.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="import-success-actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button className="import-btn-primary" onClick={() => navigate('/workspace/processing', { state: { fileData } })}>
            Initialize AI Workspace <ArrowRight size={18} />
          </button>
          <button 
            className="import-btn-primary" 
            style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #4f46e5 100%)', boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)', border: 'none' }}
            onClick={() => navigate('/workspace/chat', { state: { initialTab: 'market', topic: fileData.name } })}
          >
            <Globe size={18} style={{ marginRight: '8px' }} /> Run Reddit & Social Validation
          </button>
          <button className="import-btn-secondary" onClick={() => navigate('/workspace')}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
