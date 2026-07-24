import React, { useState } from 'react';
import { Search, GitBranch, Clock, ChevronRight, Lock, Globe } from 'lucide-react';
import './RepositorySelector.css';

const mockRepos = [
  { id: 1, name: 'acme-corp/frontend-core', private: true, lang: 'TypeScript', time: '2 hours ago', branch: 'main' },
  { id: 2, name: 'acme-corp/auth-service', private: true, lang: 'Go', time: 'Yesterday', branch: 'master' },
  { id: 3, name: 'acme-corp/infrastructure', private: true, lang: 'Terraform', time: '3 days ago', branch: 'main' },
  { id: 4, name: 'acme-corp/design-system', private: false, lang: 'TypeScript', time: 'Last week', branch: 'main' },
  { id: 5, name: 'acme-corp/data-pipeline', private: true, lang: 'Python', time: '2 weeks ago', branch: 'development' },
];

export const RepositorySelector: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredRepos = mockRepos.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  const handleSelectRepo = (repoId: number) => {
    // Phase 3 transition
    console.log("Selected repo:", repoId);
    // navigate('/workspace/importing'); // Will be implemented in Phase 3
  };

  return (
    <div className="repo-selector-root">
      <div className="repo-selector-container">
        
        <div className="repo-header">
          <h1>Select a Repository</h1>
          <p>Choose a project to analyze and add to your workspace.</p>
        </div>

        <div className="repo-search-box">
          <Search size={18} className="repo-search-icon" />
          <input 
            type="text" 
            placeholder="Search your repositories..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <div className="repo-list">
          {filteredRepos.map(repo => (
            <button 
              key={repo.id} 
              className="repo-item"
              onClick={() => handleSelectRepo(repo.id)}
            >
              <div className="repo-item-main">
                <div className="repo-icon">
                  {repo.private ? <Lock size={16} /> : <Globe size={16} />}
                </div>
                <div className="repo-details">
                  <div className="repo-name">{repo.name}</div>
                  <div className="repo-meta">
                    <span className="repo-lang">
                      <span className="lang-dot" data-lang={repo.lang}></span>
                      {repo.lang}
                    </span>
                    <span className="repo-branch">
                      <GitBranch size={12} /> {repo.branch}
                    </span>
                    <span className="repo-time">
                      <Clock size={12} /> {repo.time}
                    </span>
                  </div>
                </div>
              </div>
              <div className="repo-action">
                <span>Connect</span>
                <ChevronRight size={16} />
              </div>
            </button>
          ))}
          
          {filteredRepos.length === 0 && (
            <div className="repo-empty">
              <p>No repositories found matching "{search}"</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
