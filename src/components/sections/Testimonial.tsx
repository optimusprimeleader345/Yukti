import React from 'react';
import './Testimonial.css';

const testimonials = [
  {
    quote: "Yukti surfaced a circular dependency we'd been chasing for 3 months in under 10 minutes. It's genuinely the smartest tool in our stack.",
    name: 'Priya Sharma',
    role: 'Lead Engineer, Razorpay',
    avatar: 'PS',
    color: '#7c3aed',
  },
  {
    quote: "The AI roadmap feature replaced an entire planning sprint. Our CTO saw the output and asked 'how long did this take?' — I said 4 minutes.",
    name: 'Arjun Mehta',
    role: 'CTO, Turing Labs',
    avatar: 'AM',
    color: '#4f46e5',
  },
  {
    quote: "Security analysis caught an exposed API key before our staging deploy. Yukti paid for itself in the first 48 hours.",
    name: 'Divya Krishnan',
    role: 'Head of Platform, Groww',
    avatar: 'DK',
    color: '#db2777',
  },
];

export const Testimonial: React.FC = () => (
  <section className="testimonial-section section" id="testimonial">
    <div className="container">
      <div className="testimonial-header">
        <div className="section-label">✦ Testimonials</div>
        <h2 className="section-title">Trusted by Engineering Teams</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          See what teams building world-class products say about Yukti.
        </p>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((t, i) => (
          <div className="testimonial-card glass-panel glass-panel-hover" key={i}>
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">"{t.quote}"</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar" style={{ background: t.color }}>{t.avatar}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
