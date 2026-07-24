import React, { useState } from 'react';
import './FAQ.css';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'What is Yukti and how does it work?', a: 'Yukti is an AI Engineering Intelligence Operating System. You connect your repositories via GitHub, GitLab, or Bitbucket, and Yukti\'s AI engine analyzes your codebase to surface architecture insights, security risks, technical debt, and more — all in real time.' },
  { q: 'Which languages and frameworks does Yukti support?', a: 'Yukti supports all major languages including TypeScript, JavaScript, Python, Java, Go, Rust, Ruby, and more. Framework detection is automatic and covers React, Next.js, Django, Spring Boot, and dozens of others.' },
  { q: 'Is my code safe with Yukti?', a: 'Absolutely. Yukti uses read-only access to your repositories and never stores your source code. All analysis is done ephemerally, and we are SOC 2 Type II compliant. Your code stays yours.' },
  { q: 'How long does the initial analysis take?', a: 'For most repositories under 100k lines of code, the initial deep analysis completes in under 5 minutes. Larger enterprise codebases are typically done within 20-30 minutes.' },
  { q: 'Can I use Yukti with private repositories?', a: 'Yes. Yukti supports private repositories on GitHub, GitLab, Bitbucket, and Azure DevOps. We use OAuth with minimal required permissions.' },
  { q: 'Is there a free plan available?', a: 'Yes! Our Free plan includes up to 3 repositories with basic code analysis and security scanning — no credit card required. You can upgrade to Pro at any time.' },
];

export const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq-section section" id="faq">
      <div className="container">
        <div className="faq-header">
          <div className="section-label">✦ FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>Everything you need to know about Yukti.</p>
        </div>

        <div className="faq-list glass-panel" style={{ padding: '24px' }}>
          {faqs.map((f, i) => (
            <div className={`faq-item ${open === i ? 'faq-open' : ''}`} key={i} onClick={() => setOpen(open === i ? null : i)}>
              <div className="faq-question">
                <span>{f.q}</span>
                <ChevronDown size={18} className="faq-chevron"/>
              </div>
              {open === i && <div className="faq-answer">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
