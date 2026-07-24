import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pricing.css';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    desc: 'Perfect for individuals exploring their codebase.',
    features: ['Up to 3 repositories', 'Basic code analysis', 'Security scanner', 'Community support'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₹1,499',
    period: 'per month',
    desc: 'For professional engineers and growing teams.',
    features: ['Unlimited repositories', 'Full AI analysis suite', 'Knowledge Graph', 'AI Roadmap generation', 'Priority support', 'AI Chat workspace'],
    cta: 'Start Pro Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    desc: 'For large teams with advanced security and compliance needs.',
    features: ['Everything in Pro', 'SSO & SAML', 'Custom integrations', 'Dedicated support', 'SLA guarantees', 'On-prem deployment'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export const Pricing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="pricing-section section" id="pricing">
      <div className="container">
        <div className="pricing-header">
          <div className="section-label">✦ Pricing</div>
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Start free. Upgrade when your team is ready. No hidden fees.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((p, i) => (
            <div className={`pricing-card ${p.highlight ? 'pricing-highlight' : ''}`} key={i}>
              {p.highlight && <div className="pricing-badge">Most Popular</div>}
              <div className="pricing-name">{p.name}</div>
              <div className="pricing-price">
                {p.price}<span className="pricing-period"> / {p.period}</span>
              </div>
              <p className="pricing-desc">{p.desc}</p>
              <ul className="pricing-features">
                {p.features.map((f) => (
                  <li key={f}><Check size={14}/> {f}</li>
                ))}
              </ul>
              <button
                className={`pricing-cta ${p.highlight ? 'pricing-cta-primary' : 'pricing-cta-secondary'}`}
                onClick={() => navigate('/signup')}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
