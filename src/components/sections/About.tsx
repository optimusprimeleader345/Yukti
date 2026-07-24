import React from 'react';
import './About.css';

export const About: React.FC = () => (
  <section className="about-section section" id="about">
    <div className="container">
      <div className="about-inner glass-panel">
        <div className="about-left">
          <div className="section-label">✦ About Yukti</div>
          <h2 className="section-title">Built for Engineers,<br/>by Engineers</h2>
          <p className="section-subtitle" style={{ marginBottom: 24 }}>
            Yukti was born from a simple frustration: modern engineering teams drown in complexity, technical debt, and invisible architecture risks. We built Yukti to give every team the intelligence to see clearly and move fast.
          </p>
          <p className="about-text">
            Our AI doesn't just scan code — it understands intent, maps relationships, and surfaces insights that humans would take weeks to discover. From solo founders to enterprise teams, Yukti makes your codebase a strategic asset.
          </p>
        </div>

        <div className="about-right">
          <div className="about-stats-grid">
            {[
              { num: '10K+', lbl: 'Repositories Analyzed' },
              { num: '98%',  lbl: 'Average Security Score' },
              { num: '40%',  lbl: 'Reduction in Tech Debt' },
              { num: '3x',   lbl: 'Faster Code Reviews' },
            ].map((s) => (
              <div className="about-stat-card" key={s.lbl}>
                <div className="about-stat-num">{s.num}</div>
                <div className="about-stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
