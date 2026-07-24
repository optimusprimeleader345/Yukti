import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/Logo3.png" alt="Yukti" style={{ width: 120, height: 40, objectFit: 'contain' }} />
          </Link>
          <p className="footer-tagline">Understand your code. Discover what matters.</p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <div className="footer-col-title">Product</div>
            <a href="#features">Features</a>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <a href="#about">About</a>
            <a href="#testimonial">Testimonials</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Legal</div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 Yukti. All rights reserved.</span>
        <span>Built with ♥ for engineering teams</span>
      </div>
    </div>
  </footer>
);
