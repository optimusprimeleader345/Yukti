import React, { useState, useEffect } from 'react';
import './RedTeamModal.css';
import { X, ShieldAlert, Zap, Lock, RefreshCw, AlertOctagon, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

interface RedTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AttackLayer {
  id: string;
  name: string;
  targetFile: string;
  description: string;
  vulnerabilityType: string;
  initialScore: number;
  simulatedLogs: string[];
  vulnerableCode: string;
  remediatedCode: string;
  patchSummary: string;
}

const attackLayers: AttackLayer[] = [
  {
    id: 'auth',
    name: 'Authentication & OAuth Middleware',
    targetFile: 'src/utils/auth.ts',
    description: 'Simulates token fuzzing and latency-induced session signature bypass under high concurrent request loads.',
    vulnerabilityType: 'Async Race Condition & Token Replay Vulnerability',
    initialScore: 58,
    simulatedLogs: [
      '⚡ Initializing autonomous Red-Team stress agent...',
      '📡 Querying target module: src/utils/auth.ts via virtual sandbox...',
      '💥 Injecting 5,000 requests/sec concurrent brute-force token signatures...',
      '🚨 VULNERABILITY EXPOSED: Async token check lacks atomic mutex locking under database reconnect delays!',
      '⚠️ Result: Attacker can forge transient unverified session tokens during latency spikes.'
    ],
    vulnerableCode: `export async function verifySession(token: string): Promise<UserSession | null> {
  const decoded = decodeTokenUnsafe(token);
  // Unprotected async database read without race condition lock
  const session = await db.sessions.findOne({ id: decoded.sessionId });
  if (session && !session.expired) {
    return session; // Vulnerable to concurrent token replay!
  }
  return null;
}`,
    remediatedCode: `import { Mutex } from 'async-mutex';
import { verifyCryptographicToken, env } from '../config/security';

const sessionMutex = new Mutex();

export async function verifySession(token: string): Promise<UserSession | null> {
  return await sessionMutex.runExclusive(async () => {
    const decoded = verifyCryptographicToken(token, env.JWT_SECRET_KEY);
    if (!decoded) throw new Error("Invalid crypted signature");

    const session = await db.sessions.findOne({ id: decoded.sessionId });
    if (session && session.isValid && Date.now() < session.expiresAt) {
      return { ...session, lastVerified: Date.now() }; // Zero-trust shielded!
    }
    return null;
  });
}`,
    patchSummary: 'Injects an atomic async mutex lock and cryptographic token sanitization barrier to eliminate concurrency replay exploits.'
  },
  {
    id: 'gateway',
    name: 'API Concurrency & Database Gateway',
    targetFile: 'src/services/apiGateway.ts',
    description: 'Runs high-intensity volumetric payload floods to detect unbounded query loops and denial-of-service bottlenecks.',
    vulnerabilityType: 'Unbounded Query Loop & DoS Exhaustion',
    initialScore: 64,
    simulatedLogs: [
      '⚡ Launching distributed volumetric traffic emulation...',
      '📡 Flooding endpoint router src/services/apiGateway.ts with recursive payload chains...',
      '💥 Memory footprint surging: +480MB in 1.4 seconds...',
      '🚨 VULNERABILITY EXPOSED: Unbounded array aggregation in user query handler causes CPU thread lock!',
      '⚠️ Result: 15 concurrent malformed requests trigger catastrophic denial-of-service loop.'
    ],
    vulnerableCode: `export async function handleBulkAggregate(req: Request) {
  const { filters } = req.body;
  // Unbounded query loop without pagination or payload throttling
  const allRecords = await db.records.findAll({ where: filters });
  return allRecords.map(record => complexParse(record)); // DoS vulnerability
}`,
    remediatedCode: `import { RateLimiter } from '../middleware/rateLimiter';
import { PagedResult } from '../types';

const bulkLimiter = new RateLimiter({ maxRequests: 50, windowMs: 1000 });

export async function handleBulkAggregate(req: Request): Promise<PagedResult> {
  await bulkLimiter.consume(req.ip);
  const { filters, page = 1, limit = 100 } = req.body;
  
  // Strict ceiling enforced to protect CPU thread resources
  const safeLimit = Math.min(limit, 100);
  return await db.records.findPaginated({ where: filters, page, limit: safeLimit });
}`,
    patchSummary: 'Enforces strict algorithmic pagination ceiling (max 100 records) and IP rate throttling to completely neutralize denial-of-service floods.'
  },
  {
    id: 'dom',
    name: 'Frontend DOM & State Rendering Engine',
    targetFile: 'src/components/Navbar.tsx',
    description: 'Audits React rendering trees against unescaped DOM clobbering and persistent Cross-Site Scripting (XSS) mutations.',
    vulnerabilityType: 'Unsafe HTML Injection & DOM Clobbering',
    initialScore: 71,
    simulatedLogs: [
      '⚡ Fuzzing React Virtual DOM propagation vectors...',
      '📡 Injecting mutated script payloads into User Profile banner props...',
      '💥 Executing mock DOM clobbering sequence against state storage...',
      '🚨 VULNERABILITY EXPOSED: Raw dangerouslySetInnerHTML usage bypasses standard XSS sanitation barriers!',
      '⚠️ Result: Malicious user avatar payloads can execute arbitrary JavaScript in peer sessions.'
    ],
    vulnerableCode: `export const UserProfileBanner: React.FC<{ biography: string }> = ({ biography }) => {
  return (
    <div 
      className="profile-bio" 
      dangerouslySetInnerHTML={{ __html: biography }} // Severe XSS Vector!
    />
  );
};`,
    remediatedCode: `import React from 'react';
import DOMPurify from 'dompurify';

export const UserProfileBanner: React.FC<{ biography: string }> = ({ biography }) => {
  // Enforce rigid DOM sanitization against arbitrary code execution
  const cleanBio = DOMPurify.sanitize(biography, { ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'] });
  return (
    <div 
      className="profile-bio" 
      dangerouslySetInnerHTML={{ __html: cleanBio }} // 100% XSS Immune!
    />
  );
};`,
    patchSummary: 'Wraps all string propagation through strict DOMPurify HTML element filter lists, nullifying all cross-site script injection exploits.'
  }
];

export const RedTeamModal: React.FC<RedTeamModalProps> = ({ isOpen, onClose }) => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('auth');
  const [simulationStatus, setSimulationStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [logIndex, setLogIndex] = useState(0);
  const [isShieldApplied, setIsShieldApplied] = useState(false);

  const selectedLayer = attackLayers.find(l => l.id === selectedLayerId) || attackLayers[0];

  useEffect(() => {
    if (!isOpen) {
      setSimulationStatus('idle');
      setLogIndex(0);
      setIsShieldApplied(false);
    }
  }, [isOpen]);

  const runSimulation = () => {
    setSimulationStatus('running');
    setLogIndex(0);
    setIsShieldApplied(false);

    const interval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < selectedLayer.simulatedLogs.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setSimulationStatus('completed');
          return prev;
        }
      });
    }, 700);
  };

  const handleApplyShield = () => {
    setIsShieldApplied(true);
  };

  if (!isOpen) return null;

  return (
    <div className="rt-modal-overlay">
      <div className="rt-modal-container">
        
        {/* Modal Header */}
        <div className="rt-modal-header">
          <div className="rt-header-title">
            <div className="rt-icon-box">
              <ShieldAlert size={28} />
            </div>
            <div>
              <h2>Adversarial AI Red-Team Simulator</h2>
              <p>Autonomous chaos drills & high-load exploit testing with automated zero-trust shielding.</p>
            </div>
          </div>
          <button className="rt-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="rt-modal-body">
          
          {/* Layer Selection Column */}
          <div className="rt-layer-select-section">
            <label className="rt-section-label">Select Target Architecture Layer to Attack:</label>
            <div className="rt-layers-grid">
              {attackLayers.map((layer) => (
                <button
                  key={layer.id}
                  className={`rt-layer-card ${selectedLayerId === layer.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLayerId(layer.id);
                    setSimulationStatus('idle');
                    setIsShieldApplied(false);
                  }}
                  disabled={simulationStatus === 'running'}
                >
                  <div className="rt-layer-header">
                    <Cpu size={18} className="cpu-icon" />
                    <strong>{layer.name}</strong>
                  </div>
                  <span className="rt-target-tag">{layer.targetFile}</span>
                  <p>{layer.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button & Terminal Log View */}
          <div className="rt-execution-area">
            {simulationStatus === 'idle' && (
              <div className="rt-idle-panel">
                <div className="rt-idle-content">
                  <AlertOctagon size={48} className="warn-octo" />
                  <h4>Ready to initiate cyber chaos simulation on <code>{selectedLayer.targetFile}</code></h4>
                  <p>This automated test simulates intense volumetric request floods and async signature fuzzing to expose hidden runtime blind spots.</p>
                  <button className="rt-start-btn" onClick={runSimulation}>
                    <Zap size={18} /> Initiate Adversarial Stress Drill
                  </button>
                </div>
              </div>
            )}

            {simulationStatus === 'running' && (
              <div className="rt-terminal-box">
                <div className="rt-terminal-header">
                  <span>⚡ Yukti Cyber Red-Team Terminal — Executing Sandbox Drill</span>
                  <RefreshCw size={14} className="spinning" />
                </div>
                <div className="rt-terminal-logs">
                  {selectedLayer.simulatedLogs.slice(0, logIndex + 1).map((log, idx) => (
                    <div key={idx} className={`rt-log-line ${log.includes('VULNERABILITY') ? 'crit' : ''}`}>
                      {log}
                    </div>
                  ))}
                  <div className="rt-typing-cursor">█</div>
                </div>
              </div>
            )}

            {simulationStatus === 'completed' && (
              <div className="rt-results-panel">
                
                {/* Score & Health Bar */}
                <div className="rt-score-banner">
                  <div className="rt-score-box">
                    <span className="rt-score-label">Adversarial Resilience Score</span>
                    <div className="rt-score-num">
                      <strong className={isShieldApplied ? 'score-safe' : 'score-vuln'}>
                        {isShieldApplied ? '100' : selectedLayer.initialScore}
                      </strong>
                      <span>/100</span>
                      <span className={`rt-badge ${isShieldApplied ? 'safe' : 'danger'}`}>
                        {isShieldApplied ? '🛡️ Impenetrable Zero-Trust' : '🚨 Exploitable Vulnerability'}
                      </span>
                    </div>
                  </div>

                  <div className="rt-actions-right">
                    {!isShieldApplied ? (
                      <button className="rt-shield-btn" onClick={handleApplyShield}>
                        <ShieldCheck size={18} /> Apply Defensive Shield & Verify
                      </button>
                    ) : (
                      <div className="rt-shielded-badge">
                        <CheckCircle2 size={20} className="check-icon" />
                        <span>Defensive Shield Active! Zero Exploits Found.</span>
                      </div>
                    )}
                    <button className="rt-restart-btn" onClick={runSimulation} title="Re-run simulation">
                      <RefreshCw size={16} /> Re-test
                    </button>
                  </div>
                </div>

                {/* Live Diff / Code Comparison */}
                <div className="rt-code-comparison">
                  <div className="rt-code-pane vuln-pane">
                    <div className="rt-pane-title">
                      <span>❌ Unsafe Legacy Implementation ({selectedLayer.targetFile})</span>
                      <strong className="vuln-tag">{selectedLayer.vulnerabilityType}</strong>
                    </div>
                    <pre><code>{selectedLayer.vulnerableCode}</code></pre>
                  </div>

                  <div className={`rt-code-pane shield-pane ${isShieldApplied ? 'active-shield' : ''}`}>
                    <div className="rt-pane-title">
                      <span>{isShieldApplied ? '✅ Installed Zero-Trust Shield' : '⚡ Auto-Generated Defensive Shield Patch'}</span>
                      {isShieldApplied && <span className="applied-tag">Deployed</span>}
                    </div>
                    <pre><code>{selectedLayer.remediatedCode}</code></pre>
                    <div className="rt-patch-note">
                      <strong>Shield Blueprint:</strong> {selectedLayer.patchSummary}
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="rt-modal-footer">
          <span className="rt-footer-note">
            <Lock size={14} /> Hackathon Showstopper: Yukti continuously tests systems against autonomous cyber exploits before deployment.
          </span>
          <button className="rt-done-btn" onClick={onClose}>
            {isShieldApplied ? 'Save & Exit to Workspace' : 'Close Studio'}
          </button>
        </div>

      </div>
    </div>
  );
};
