import React from 'react';
import './Features.css';
import { GitBranch, Shield, Cpu, Map, MessageSquare, TrendingDown } from 'lucide-react';

const features = [
  { icon: <Cpu size={22}/>, title: 'AI Repository Intelligence', desc: 'Deep analysis of your entire codebase. Understand dependencies, hotspots, and architecture patterns instantly.' },
  { icon: <Shield size={22}/>, title: 'Security Analysis', desc: 'Continuously scans for vulnerabilities, exposed secrets, and compliance issues before they hit production.' },
  { icon: <GitBranch size={22}/>, title: 'Knowledge Graph', desc: 'A living, interactive map of your entire engineering knowledge — components, owners, and relationships.' },
  { icon: <TrendingDown size={22}/>, title: 'Technical Debt Engine', desc: 'Quantifies and prioritises debt across your repositories so your team knows exactly what to fix next.' },
  { icon: <Map size={22}/>, title: 'AI Roadmap Generation', desc: 'Generates sprint-ready, prioritised roadmaps based on your codebase health and business goals.' },
  { icon: <MessageSquare size={22}/>, title: 'AI Chat Workspace', desc: 'Ask anything about your code. Get contextual explanations, refactoring suggestions, and instant docs.' },
];

export const Features: React.FC = () => (
  <section className="features-section section" id="features">
    <div className="container">
      <div className="features-header">
        <div className="section-label">✦ Features</div>
        <h2 className="section-title">Everything Your Engineering<br/>Team Needs</h2>
        <p className="section-subtitle">
          Yukti combines six powerful intelligence modules into one seamless platform — built for modern engineering teams.
        </p>
      </div>

      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card glass-panel glass-panel-hover" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
