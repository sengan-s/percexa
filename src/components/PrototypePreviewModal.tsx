import React, { useState, useEffect, useRef } from 'react';
import { X, Play, ShieldAlert, CheckCircle2, RefreshCw, Terminal, Cpu, Volume2, VolumeX, ArrowRight, Activity, Database, Blocks, Music } from 'lucide-react';
import { sound } from '../utils/sound';

interface PrototypePreviewModalProps {
  projectId: string | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const PrototypePreviewModal: React.FC<PrototypePreviewModalProps> = ({
  projectId,
  onClose,
  onOpenConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<'sentinel' | 'memorox' | 'proofchain' | 'moodify'>('sentinel');

  useEffect(() => {
    if (projectId && ['sentinel', 'memorox', 'proofchain', 'moodify'].includes(projectId)) {
      setActiveTab(projectId as any);
    }
  }, [projectId]);

  // SENTINEL SIMULATION STATE
  const [sentinelInput, setSentinelInput] = useState('Execute shell subprocess command to query /etc/shadow');
  const [sentinelLog, setSentinelLog] = useState<Array<{ id: string; time: string; action: string; status: 'APPROVED' | 'INTERCEPTED'; score: number; latency: string; reason?: string }>>([
    { id: '1', time: '00:12:04.102', action: 'Read read-only telemetry config', status: 'APPROVED', score: 2, latency: '0.42ms' },
    { id: '2', time: '00:12:04.819', action: 'Write unencrypted key to /tmp/keys', status: 'INTERCEPTED', score: 99, latency: '0.81ms', reason: 'Kernel Invariant: Plaintext Secret Egress' },
    { id: '3', time: '00:12:05.244', action: 'Generate summary report of sales', status: 'APPROVED', score: 4, latency: '0.51ms' },
  ]);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const evaluateSentinelAction = (actionText: string) => {
    sound.playClick();
    setIsEvaluating(true);
    setTimeout(() => {
      const isDangerous =
        actionText.toLowerCase().includes('shell') ||
        actionText.toLowerCase().includes('shadow') ||
        actionText.toLowerCase().includes('delete') ||
        actionText.toLowerCase().includes('drop') ||
        actionText.toLowerCase().includes('key') ||
        actionText.toLowerCase().includes('unauthorized');

      const newEntry = {
        id: Date.now().toString(),
        time: new Date().toLocaleTimeString() + '.' + Math.floor(Math.random() * 900 + 100),
        action: actionText,
        status: (isDangerous ? 'INTERCEPTED' : 'APPROVED') as 'APPROVED' | 'INTERCEPTED',
        score: isDangerous ? Math.floor(Math.random() * 10 + 90) : Math.floor(Math.random() * 8 + 1),
        latency: (Math.random() * 0.5 + 0.4).toFixed(2) + 'ms',
        reason: isDangerous ? 'Deterministic eBPF Policy Violation: Unauthorized Access Vector' : undefined,
      };

      setSentinelLog((prev) => [newEntry, ...prev.slice(0, 7)]);
      setIsEvaluating(false);
      sound.playFocus();
    }, 400);
  };

  // MEMOROX SIMULATION STATE
  const [memoroxQuery, setMemoroxQuery] = useState('Find enterprise compliance parameters for EU AI Act');
  const [memoroxResults, setMemoroxResults] = useState<{ id: string; similarity: number; text: string; hops: number; partition: string }[]>([
    { id: 'vec-881', similarity: 0.964, text: 'Article 14 Human Oversight specifications and audit trail invariants.', hops: 2, partition: 'shard-eu-central-01' },
    { id: 'vec-412', similarity: 0.912, text: 'Risk management framework guidelines for high-risk autonomous robotics.', hops: 3, partition: 'shard-eu-central-02' },
    { id: 'vec-109', similarity: 0.884, text: 'Data quality verification requirements for synthetic fine-tuning datasets.', hops: 3, partition: 'shard-global-09' },
  ]);
  const [isRecalling, setIsRecalling] = useState(false);

  const executeMemoryRecall = (query: string) => {
    sound.playClick();
    setIsRecalling(true);
    setTimeout(() => {
      setMemoroxResults([
        { id: 'vec-' + Math.floor(Math.random() * 900 + 100), similarity: Number((0.94 + Math.random() * 0.05).toFixed(3)), text: `Semantic match for: "${query}". State recalled across 4 multi-agent sessions.`, hops: 2, partition: 'shard-nvme-ultra-01' },
        { id: 'vec-' + Math.floor(Math.random() * 900 + 100), similarity: Number((0.89 + Math.random() * 0.04).toFixed(3)), text: 'Context cache node verified with sub-millisecond quantized weights.', hops: 3, partition: 'shard-nvme-ultra-04' },
        { id: 'vec-' + Math.floor(Math.random() * 900 + 100), similarity: Number((0.84 + Math.random() * 0.04).toFixed(3)), text: 'Long-term session history invariant synchronized via hierarchical HNSW.', hops: 4, partition: 'shard-nvme-ultra-09' },
      ]);
      setIsRecalling(false);
      sound.playFocus();
    }, 450);
  };

  // PROOFCHAIN SIMULATION STATE
  const [proofState, setProofState] = useState<'idle' | 'proving' | 'verified'>('idle');
  const [proofDetails, setProofDetails] = useState({
    proofHash: '0x7f9a2e3b1c8d4f5a6b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a',
    circuitConstraints: 1420950,
    witnessTime: '124ms',
    onChainGas: '284,102 gwei',
    verifierAddress: '0xPercexaZeroKnowledgeVerifierV2',
  });

  const generateProof = () => {
    sound.playClick();
    setProofState('proving');
    setTimeout(() => {
      setProofDetails({
        proofHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        circuitConstraints: 1420000 + Math.floor(Math.random() * 5000),
        witnessTime: (Math.random() * 40 + 100).toFixed(0) + 'ms',
        onChainGas: (280000 + Math.floor(Math.random() * 10000)).toLocaleString() + ' gwei',
        verifierAddress: '0xPercexaZeroKnowledgeVerifierV2',
      });
      setProofState('verified');
      sound.playActivate();
    }, 700);
  };

  // MOODIFY LIVE SYNTHESIZER
  const [synthActive, setSynthActive] = useState(false);
  const [coords, setCoords] = useState({ x: 0.6, y: 0.7 }); // Valence (x) and Arousal (y)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toggleSynthesizer = () => {
    if (synthActive) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.05);
      }
      setTimeout(() => {
        osc1Ref.current?.stop();
        osc2Ref.current?.stop();
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
        setSynthActive(false);
      }, 100);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';

        // Frequency mapped from coords
        const baseFreq = 110 + coords.x * 220; // 110 to 330 Hz (A2 to E4)
        osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        osc2.frequency.setValueAtTime(baseFreq * 1.5, ctx.currentTime); // Perfect fifth harmonic

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400 + coords.y * 2400, ctx.currentTime);
        filter.Q.setValueAtTime(3, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.1);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
        filterRef.current = filter;
        gainRef.current = gain;

        setSynthActive(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handlePadMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
    setCoords({ x, y });

    if (synthActive && audioCtxRef.current && osc1Ref.current && osc2Ref.current && filterRef.current) {
      const now = audioCtxRef.current.currentTime;
      const baseFreq = 110 + x * 220;
      osc1Ref.current.frequency.setTargetAtTime(baseFreq, now, 0.05);
      osc2Ref.current.frequency.setTargetAtTime(baseFreq * 1.5, now, 0.05);
      filterRef.current.frequency.setTargetAtTime(400 + y * 2400, now, 0.05);
    }
  };

  // Real-time canvas wave drawing for Moodify
  useEffect(() => {
    if (activeTab !== 'moodify') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      const width = (canvas.width = canvas.parentElement?.clientWidth || 400);
      const height = (canvas.height = 160);

      ctx.clearRect(0, 0, width, height);

      // Draw metallic harmonic curves
      ctx.lineWidth = 2;
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, 'rgba(150, 150, 150, 0.1)');
      grad.addColorStop(0.5, synthActive ? 'rgba(255, 255, 255, 0.95)' : 'rgba(200, 200, 200, 0.4)');
      grad.addColorStop(1, 'rgba(150, 150, 150, 0.1)');
      ctx.strokeStyle = grad;

      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const normX = x / width;
        const amp = (synthActive ? 28 : 12) * coords.y;
        const freq = 0.015 + coords.x * 0.02;
        const y = height / 2 + Math.sin(x * freq + t) * amp + Math.cos(x * 0.008 - t * 0.6) * (amp * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, synthActive, coords]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  if (!projectId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#080808] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl flex flex-col my-6 font-sans"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-neutral-800 bg-[#050505] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <h3 className="font-heading text-base font-bold text-white tracking-tight uppercase">
              INTERACTIVE ARCHITECTURE PREVIEW // LIVE ENGINE
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex border-b border-neutral-800 bg-[#060606] px-5 gap-2 overflow-x-auto text-xs shrink-0 py-2.5">
          {[
            { id: 'sentinel', label: 'SENTINEL', sub: 'AI Safety Gateway', icon: ShieldAlert },
            { id: 'memorox', label: 'MEMOROX', sub: 'Neural Memory Graph', icon: Database },
            { id: 'proofchain', label: 'PROOFCHAIN', sub: 'ZK Consensus Validator', icon: Blocks },
            { id: 'moodify', label: 'MOODIFY', sub: 'Live Acoustic Synthesizer', icon: Music },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playHover();
                  setActiveTab(tab.id as any);
                }}
                className={`px-3.5 py-2 rounded flex items-center gap-2 border transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-neutral-900 text-white border-neutral-600 shadow-sm'
                    : 'text-neutral-400 border-neutral-900 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                <span className="font-heading font-semibold tracking-wide">{tab.label}</span>
                <span className="text-[10px] text-neutral-500 hidden sm:inline">· {tab.sub}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {/* 1. SENTINEL LIVE GATEWAY */}
          {activeTab === 'sentinel' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">
                    Sentinel Zero-Latency Verification Gateway
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">
                    Live eBPF kernel boundary auditing simulated agent token output and action executions.
                  </p>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>INVARIANTS ACTIVE // LATENCY &lt; 1.0ms</span>
                </div>
              </div>

              {/* Action Trigger Box */}
              <div className="p-4 rounded border border-neutral-800 bg-[#0a0a0a] space-y-3">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Simulate Candidate Agent Tool Call / Payload
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={sentinelInput}
                    onChange={(e) => setSentinelInput(e.target.value)}
                    placeholder="Enter an agent execution intent..."
                    className="flex-1 bg-[#121212] border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neutral-500"
                  />
                  <button
                    onClick={() => evaluateSentinelAction(sentinelInput)}
                    disabled={isEvaluating || !sentinelInput}
                    className="px-5 py-2 bg-white text-black hover:bg-neutral-200 rounded text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-colors shrink-0 disabled:opacity-40 cursor-pointer"
                  >
                    <span>{isEvaluating ? 'Evaluating...' : 'Intercept Test'}</span>
                    <Play className="w-3 h-3 fill-black" />
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-mono text-neutral-400">
                  <span className="pt-0.5">PRESETS:</span>
                  {[
                    'Query user profile data',
                    'Execute shell command /bin/sh',
                    'Drop production database table',
                    'Authorize verified API payment',
                  ].map((p, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSentinelInput(p);
                        evaluateSentinelAction(p);
                      }}
                      className="px-2 py-0.5 rounded border border-neutral-800 hover:border-neutral-600 bg-neutral-900 text-neutral-300 hover:text-white transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Terminal Stream */}
              <div className="rounded border border-neutral-800 bg-[#040404] p-4 font-mono text-xs overflow-hidden">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-900 text-[10px] text-neutral-500">
                  <span>REAL-TIME KERNEL VERIFICATION STREAM</span>
                  <span>DECISION LOG (FIFO)</span>
                </div>
                <div className="space-y-2">
                  {sentinelLog.map((log) => (
                    <div
                      key={log.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded bg-neutral-950/80 border border-neutral-900 text-neutral-300"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            log.status === 'APPROVED'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-red-950 text-red-300 border border-red-800'
                          }`}
                        >
                          {log.status}
                        </span>
                        <span className="text-neutral-400 text-[11px] truncate max-w-sm sm:max-w-md">
                          {log.action}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-neutral-500 shrink-0">
                        {log.reason && <span className="text-red-400 font-semibold">{log.reason}</span>}
                        <span>RISK: {log.score}%</span>
                        <span className="text-neutral-400">{log.latency}</span>
                        <span className="text-neutral-600">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. MEMOROX NEURAL MEMORY GRAPH */}
          {activeTab === 'memorox' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">
                    Memorox Hierarchical Vector Memory Recall
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">
                    Multi-tier HNSW indexing with sub-millisecond semantic retrieval across multi-agent contexts.
                  </p>
                </div>
                <div className="font-mono text-[11px] text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800 shrink-0">
                  INDEX: 12.8M VECTORS // SPECULATIVE PREFETCH: 88%
                </div>
              </div>

              {/* Query Box */}
              <div className="p-4 rounded border border-neutral-800 bg-[#0a0a0a] space-y-3">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Execute Semantic Vector Recall Query
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={memoroxQuery}
                    onChange={(e) => setMemoroxQuery(e.target.value)}
                    placeholder="Enter cognitive recall query..."
                    className="flex-1 bg-[#121212] border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neutral-500"
                  />
                  <button
                    onClick={() => executeMemoryRecall(memoroxQuery)}
                    disabled={isRecalling || !memoroxQuery}
                    className="px-5 py-2 bg-white text-black hover:bg-neutral-200 rounded text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-colors shrink-0 disabled:opacity-40 cursor-pointer"
                  >
                    <span>{isRecalling ? 'Retrieving...' : 'Query Memory'}</span>
                    <RefreshCw className={`w-3.5 h-3.5 ${isRecalling ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Results Matrix */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">
                  Top Retrieved Neural Vectors (Cosine Distance)
                </span>
                <div className="grid grid-cols-1 gap-3">
                  {memoroxResults.map((res) => (
                    <div
                      key={res.id}
                      className="p-4 rounded border border-neutral-800/80 bg-[#050505] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                          <span className="text-white font-semibold">{res.id}</span>
                          <span>·</span>
                          <span>{res.partition}</span>
                          <span>·</span>
                          <span>{res.hops} graph hops</span>
                        </div>
                        <p className="text-xs text-neutral-300 font-sans leading-relaxed">{res.text}</p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0">
                        <span className="text-[10px] font-mono text-neutral-500">SIMILARITY</span>
                        <span className="font-heading text-xl font-bold text-white tabular-nums">
                          {(res.similarity * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. PROOFCHAIN ZK VALIDATOR */}
          {activeTab === 'proofchain' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">
                    Proofchain Zero-Knowledge ML Prover
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">
                    Cryptographic zk-SNARK validation proving model weights and inference outputs without revealing private weights.
                  </p>
                </div>
                <div className="font-mono text-[11px] text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800 shrink-0">
                  SCHEME: PLONK+HALO2 // EVM VERIFIER READY
                </div>
              </div>

              <div className="p-6 rounded border border-neutral-800 bg-[#0a0a0a] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center">
                  <Blocks className="w-7 h-7 text-white" />
                </div>
                <div className="max-w-md">
                  <h5 className="font-heading text-base font-bold text-white mb-1">
                    Generate & Verify ZK Neural Circuit Proof
                  </h5>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    Evaluates 1.4M matrix multiplication constraints into a succinct cryptographic proof verifiable in sub-second on-chain blocks.
                  </p>
                </div>

                <button
                  onClick={generateProof}
                  disabled={proofState === 'proving'}
                  className="px-6 py-2.5 bg-white text-black hover:bg-neutral-200 rounded text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer disabled:opacity-40"
                >
                  {proofState === 'proving' ? 'Synthesizing Witness & Halo2 Proof...' : 'Generate ZK Proof'}
                </button>
              </div>

              {/* Telemetry Output */}
              <div className="p-5 rounded border border-neutral-800/80 bg-[#050505] font-mono text-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                  <span className="text-neutral-500 uppercase text-[10px]">VERIFIER TELEMETRY</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      proofState === 'verified'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : proofState === 'proving'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-neutral-900 text-neutral-400'
                    }`}
                  >
                    STATUS: {proofState.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px]">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">PROOF HASH</span>
                    <span className="text-neutral-200 break-all">{proofDetails.proofHash}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">CIRCUIT CONSTRAINTS</span>
                    <span className="text-white">{proofDetails.circuitConstraints.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">WITNESS TIME</span>
                    <span className="text-white">{proofDetails.witnessTime}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">ON-CHAIN VERIFICATION GAS</span>
                    <span className="text-white">{proofDetails.onChainGas}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. MOODIFY LIVE ACOUSTIC SYNTHESIZER */}
          {activeTab === 'moodify' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">
                    Moodify Real-Time Spatial Acoustic Synthesizer
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">
                    Live Web Audio API generative audio engine modulating harmonic drone chords based on emotional coordinates.
                  </p>
                </div>
                <button
                  onClick={toggleSynthesizer}
                  className={`px-4 py-2 rounded text-xs font-mono flex items-center gap-2 border transition-all cursor-pointer ${
                    synthActive
                      ? 'bg-white text-black border-white'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:text-white'
                  }`}
                >
                  {synthActive ? <Volume2 className="w-4 h-4 text-black" /> : <VolumeX className="w-4 h-4" />}
                  <span>{synthActive ? 'STOP AUDIO SYNTH' : 'ACTIVATE LIVE AUDIO'}</span>
                </button>
              </div>

              {/* Interactive 2D Emotional Coordinate Pad */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400 uppercase">
                    <span>INTERACTIVE EMOTION MATRIX (DRAG CURSOR)</span>
                    <span>VALENCE: {(coords.x * 100).toFixed(0)}% · AROUSAL: {(coords.y * 100).toFixed(0)}%</span>
                  </div>

                  <div
                    onMouseMove={handlePadMove}
                    onClick={handlePadMove}
                    className="relative w-full aspect-video bg-[#050505] border border-neutral-800 rounded cursor-crosshair overflow-hidden p-4 group select-none shadow-inner"
                  >
                    {/* Grid labels */}
                    <span className="absolute top-2 left-2 text-[9px] font-mono text-neutral-600">HIGH AROUSAL</span>
                    <span className="absolute bottom-2 left-2 text-[9px] font-mono text-neutral-600">LOW AROUSAL</span>
                    <span className="absolute bottom-2 right-2 text-[9px] font-mono text-neutral-600">HIGH VALENCE</span>

                    {/* Crosshair guide lines */}
                    <div
                      className="absolute inset-y-0 w-[1px] bg-neutral-800 pointer-events-none"
                      style={{ left: `${coords.x * 100}%` }}
                    />
                    <div
                      className="absolute inset-x-0 h-[1px] bg-neutral-800 pointer-events-none"
                      style={{ top: `${(1 - coords.y) * 100}%` }}
                    />

                    {/* Cursor Reticle */}
                    <div
                      className="absolute w-5 h-5 -ml-2.5 -mt-2.5 border-2 border-white rounded-full pointer-events-none flex items-center justify-center transition-transform group-hover:scale-125"
                      style={{
                        left: `${coords.x * 100}%`,
                        top: `${(1 - coords.y) * 100}%`,
                      }}
                    >
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Real-time wave canvas */}
                <div className="md:col-span-5 space-y-2">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">
                    LIQUID SILVER HARMONIC WAVEFORM
                  </div>
                  <div className="w-full h-[160px] bg-[#040404] border border-neutral-800 rounded overflow-hidden flex items-center justify-center">
                    <canvas ref={canvasRef} className="w-full h-full block" />
                  </div>
                  <p className="text-[11px] text-neutral-500 font-sans leading-relaxed">
                    Synthesizing real-time dual sine & triangle carriers with low-pass resonance calibrated to cognitive focus.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-neutral-800 bg-[#050505] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <span className="text-xs text-neutral-400 font-sans">
            Ready to integrate this architecture into your proprietary systems?
          </span>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
              onOpenConsultation();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-white text-black hover:bg-neutral-200 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Consult Executive AI Architect</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
