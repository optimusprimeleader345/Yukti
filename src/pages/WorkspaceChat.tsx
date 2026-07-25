import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './WorkspaceChat.css';
import { MessageSquare, FileText, Settings, PanelRightClose, PanelRightOpen, Paperclip, ArrowUp, Zap, Shield, GitBranch, ChevronRight, ChevronDown, FileCode, Folder, Globe } from 'lucide-react';
import { SocialValidationView } from '../components/workspace/SocialValidationView';

// Custom hook for typing effect
const useTypingEffect = (text: string, speed: number = 20) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};

// Mock File Tree component
const FileTreeNode: React.FC<{ name: string; isFolder?: boolean; children?: React.ReactNode }> = ({ name, isFolder, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="ws-file-node">
      <div className="ws-file-row" onClick={() => isFolder && setIsOpen(!isOpen)}>
        {isFolder ? (
          isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
        ) : (
          <span style={{ width: 14 }}></span>
        )}
        {isFolder ? <Folder size={14} className="folder-icon" /> : <FileCode size={14} className="file-icon" />}
        <span className="ws-file-name">{name}</span>
      </div>
      {isFolder && isOpen && <div className="ws-file-children">{children}</div>}
    </div>
  );
};

export const WorkspaceChat: React.FC = () => {
  const location = useLocation();
  const initialTab = location.state?.initialTab || 'chat';
  const projectTopic = location.state?.topic || 'acme-corp/frontend-core';

  const [activeTab, setActiveTab] = useState<'chat' | 'files' | 'market'>(initialTab);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Mock messages
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'I have successfully analyzed `acme-corp/frontend-core`. The repository consists of 142 TypeScript files primarily using React and TailwindCSS. I noticed a circular dependency in `src/utils/auth.ts`. How can I help you today?',
      isCode: false
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isTyping) return;
    
    setMessages([...messages, { role: 'user', content: prompt, isCode: false }]);
    setPrompt('');
    setIsTyping(true);
    
    // Simulate network delay then respond
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Here is a secure implementation of the authentication hook you requested. I have resolved the circular dependency by extracting the JWT logic into a separate service.\n\n\`\`\`typescript\nimport { useState, useEffect } from 'react';\nimport { authService } from '../services/authService';\n\nexport const useAuth = () => {\n  const [user, setUser] = useState(null);\n  const [isLoading, setIsLoading] = useState(true);\n\n  useEffect(() => {\n    authService.verifyToken()\n      .then(user => setUser(user))\n      .finally(() => setIsLoading(false));\n  }, []);\n\n  return { user, isLoading };\n};\n\`\`\``,
        isCode: true
      }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="ws-chat-root">
      
      {/* LEFT SIDEBAR - Navigation */}
      <aside className="ws-sidebar-left">
        <div className="ws-sidebar-nav">
          <button className={`ws-nav-btn ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')} title="Chat"><MessageSquare size={18} /></button>
          <button className={`ws-nav-btn ${activeTab === 'files' ? 'active' : ''}`} onClick={() => setActiveTab('files')} title="Files"><FileText size={18} /></button>
          <button className={`ws-nav-btn ${activeTab === 'market' ? 'active' : ''}`} style={activeTab === 'market' ? { color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.15)' } : {}} onClick={() => setActiveTab('market')} title="Market & Social Validation"><Globe size={18} /></button>
        </div>
        <div className="ws-sidebar-bottom">
          <button className="ws-nav-btn" title="Settings"><Settings size={18} /></button>
        </div>
      </aside>

      {/* SECONDARY SIDEBAR - File Explorer */}
      {activeTab === 'files' && (
        <aside className="ws-sidebar-secondary">
          <div className="ws-explorer-header">
            <h3>Explorer</h3>
          </div>
          <div className="ws-file-tree">
            <FileTreeNode name="src" isFolder>
              <FileTreeNode name="components" isFolder>
                <FileTreeNode name="Button.tsx" />
                <FileTreeNode name="Navbar.tsx" />
              </FileTreeNode>
              <FileTreeNode name="utils" isFolder>
                <FileTreeNode name="auth.ts" />
                <FileTreeNode name="api.ts" />
              </FileTreeNode>
              <FileTreeNode name="App.tsx" />
              <FileTreeNode name="index.css" />
              <FileTreeNode name="main.tsx" />
            </FileTreeNode>
            <FileTreeNode name="public" isFolder>
              <FileTreeNode name="Logo3.png" />
            </FileTreeNode>
            <FileTreeNode name="package.json" />
            <FileTreeNode name="vite.config.ts" />
          </div>
        </aside>
      )}

      {/* CENTER - Canvas */}
      <main className="ws-chat-canvas" style={{ padding: activeTab === 'market' ? 0 : undefined, overflow: activeTab === 'market' ? 'hidden' : undefined }}>
        {activeTab === 'market' ? (
          <SocialValidationView initialTopic={projectTopic} />
        ) : (
          <>
            <div className="ws-chat-header">
              <div className="ws-chat-repo-badge">
                <GitBranch size={14} /> acme-corp/frontend-core
              </div>
              <button 
                className="ws-panel-toggle" 
                onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                title="Toggle Context Panel"
              >
                {isRightPanelOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
              </button>
            </div>

            <div className="ws-messages-container">
              {messages.map((msg, idx) => (
                <div key={idx} className={`ws-message-row ${msg.role}`}>
                  {msg.role === 'assistant' && (
                    <div className="ws-msg-avatar ai">✦</div>
                  )}
                  <div className="ws-msg-bubble">
                    {msg.role === 'assistant' && idx === messages.length - 1 && !msg.isCode ? (
                      <StreamingText text={msg.content} />
                    ) : msg.isCode ? (
                      <CodeBlock content={msg.content} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="ws-message-row assistant">
                  <div className="ws-msg-avatar ai">✦</div>
                  <div className="ws-msg-bubble typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
            </div>

            <div className="ws-prompt-container">
              <form className="ws-prompt-box" onSubmit={handleSubmit}>
                <button type="button" className="ws-prompt-attach"><Paperclip size={18} /></button>
                <input 
                  type="text" 
                  placeholder="Ask anything about your codebase..." 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isTyping}
                />
                <button type="submit" className="ws-prompt-submit" disabled={!prompt.trim() || isTyping}>
                  <ArrowUp size={18} />
                </button>
              </form>
              <div className="ws-prompt-footer">
                Yukti AI can make mistakes. Consider verifying critical architectural changes.
              </div>
            </div>
          </>
        )}
      </main>

      {/* RIGHT SIDEBAR - Context Panel */}
      {isRightPanelOpen && (
        <aside className="ws-sidebar-right">
          <div className="ws-ctx-header">
            <h3>Repository Context</h3>
          </div>
          
          <div className="ws-ctx-section">
            <div className="ws-ctx-title"><Zap size={14} /> Architecture Insights</div>
            <div className="ws-ctx-card">
              <p><strong>Primary Stack:</strong> React, Vite, TS</p>
              <p><strong>Complexity Score:</strong> B+</p>
              <p className="warn">1 Circular Dependency detected</p>
            </div>
          </div>

          <div className="ws-ctx-section">
            <div className="ws-ctx-title"><Shield size={14} /> Security Scan</div>
            <div className="ws-ctx-card">
              <p className="success">0 Critical Vulnerabilities</p>
              <p>2 Outdated dependencies</p>
            </div>
          </div>
        </aside>
      )}

    </div>
  );
};

// Helper for streaming text
const StreamingText: React.FC<{ text: string }> = ({ text }) => {
  const displayedText = useTypingEffect(text, 10);
  return <>{displayedText}</>;
};

// Helper for code block
const CodeBlock: React.FC<{ content: string }> = ({ content }) => {
  const displayedText = useTypingEffect(content, 10);
  
  // Very simple markdown parser for demo purposes
  const parts = displayedText.split('```');
  
  return (
    <div className="ws-code-wrapper">
      <p>{parts[0]}</p>
      {parts.length > 1 && (
        <pre className="ws-code-block">
          <code>{parts[1].replace('typescript\n', '')}</code>
        </pre>
      )}
    </div>
  );
};
