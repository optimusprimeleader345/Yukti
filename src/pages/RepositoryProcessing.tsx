import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RepositoryProcessing.css';

const steps = [
  "Reading repository files...",
  "Understanding architectural patterns...",
  "Indexing components and creating embeddings...",
  "Building knowledge graph...",
  "Analyzing dependencies and security...",
  "Preparing your AI workspace..."
];

export const RepositoryProcessing: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 1; // 1% every 30ms = 3000ms total roughly
      });
    }, 30);

    // Step text animation
    const stepInterval = setInterval(() => {
      setCurrentStep(s => {
        if (s >= steps.length - 1) {
          clearInterval(stepInterval);
          return s;
        }
        return s + 1;
      });
    }, 500); // Change step every 500ms

    // Finish and route
    const finishTimeout = setTimeout(() => {
      navigate('/workspace/chat');
    }, 3200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(finishTimeout);
    };
  }, [navigate]);

  return (
    <div className="processing-root">
      <div className="processing-container">
        
        <div className="processing-spinner">
          <div className="processing-ring"></div>
        </div>

        <h2 className="processing-title">Analyzing Repository</h2>
        
        <div className="processing-step-container">
          {steps.map((step, index) => (
            <p 
              key={index} 
              className={`processing-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            >
              {step}
            </p>
          ))}
        </div>

        <div className="processing-bar-container">
          <div className="processing-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="processing-percent">{progress}%</div>

      </div>
    </div>
  );
};
