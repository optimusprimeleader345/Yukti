import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <img src="/Logo2.png" alt="Yukti" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div className="logo-text-group">
            <span className="logo-text">Yukti</span>
            <span className="logo-tagline">AI Engineering Intelligence</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="navbar-links">
          <button onClick={() => scrollTo('features')}>Features</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('testimonial')}>Testimonial</button>
          <button onClick={() => scrollTo('faq')}>FAQ</button>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          <button className="nav-login-btn" onClick={() => navigate('/login')}>Log in</button>
          <button className="nav-cta-btn" onClick={() => navigate('/signup')}>Contact</button>
        </div>
      </div>
    </nav>
  );
};
