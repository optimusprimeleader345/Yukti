import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import { HeroVisual } from './HeroVisual';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-icon">✦</span> BUSINESS & SOLUTION
          </div>

          <h1 className="hero-title">
            Understand Your Code.<br />
            Discover What Matters.
          </h1>

          <p className="hero-subtitle">
            Yukti helps you connect, manage, and optimize your codebase effortlessly. Unlock powerful architectural insights and automate technical debt resolution.
          </p>

          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={() => navigate('/signup')}>
              Get Started
            </button>
            <button className="hero-btn-secondary" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              Book a Demo
            </button>
          </div>
        </div>

        <div className="hero-visual-col">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};
