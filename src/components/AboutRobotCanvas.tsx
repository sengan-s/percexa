import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Zap, Activity } from 'lucide-react';

export const AboutRobotCanvas: React.FC = () => {
  const [synapsePulse, setSynapsePulse] = useState(0);
  const [telemetry, setTelemetry] = useState({
    latency: '0.82ms',
    coherence: '99.94%',
    coreTemp: '37.8°C',
    fps: '60.0',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSynapsePulse((p) => (p + 1) % 100);
      setTelemetry({
        latency: (0.75 + Math.random() * 0.15).toFixed(2) + 'ms',
        coherence: (99.88 + Math.random() * 0.1).toFixed(2) + '%',
        coreTemp: (37.6 + Math.random() * 0.4).toFixed(1) + '°C',
        fps: (59.8 + Math.random() * 0.4).toFixed(1),
      });
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full p-6 flex flex-col justify-between select-none overflow-hidden bg-gradient-to-br from-[#0c0c0c] to-[#040404]">
      {/* Background Holographic Grid */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top Header: System Spec & Node Status */}
      <div className="relative z-10 flex items-center justify-between border-b border-neutral-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-neutral-300 uppercase">
            PERCEXA AI RESEARCH LAB // UNIT 01
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-750">
          PROTOTYPE REVISION 4.2
        </span>
      </div>

      {/* Center Biomechanical Robot Silhouette & Core Optic */}
      <div className="relative z-10 my-auto flex items-center justify-center">
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Outer Orbital Targeting Reticle */}
          <div className="absolute inset-0 rounded-full border border-neutral-800 animate-spin-slow" />
          <div className="absolute inset-3 rounded-full border border-dashed border-neutral-700/60" />
          <div className="absolute inset-8 rounded-full border border-neutral-700/40" />

          {/* Precision Robot Cranium Silhouette (SVG) */}
          <svg className="w-36 h-36 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]" viewBox="0 0 100 100" fill="none">
            {/* Cranium shell */}
            <path
              d="M30 35 C30 18, 70 18, 70 35 C70 52, 64 68, 50 78 C36 68, 30 52, 30 35 Z"
              fill="url(#craniumMetal)"
              stroke="#555555"
              strokeWidth="1.2"
            />
            {/* Visor slit */}
            <rect
              x="36"
              y="38"
              width="28"
              height="3.5"
              rx="1.5"
              fill="#ffffff"
              className="drop-shadow-[0_0_8px_#ffffff]"
            />
            {/* Jaw / Chin structure */}
            <path
              d="M40 70 L50 82 L60 70 Z"
              fill="#181818"
              stroke="#444444"
              strokeWidth="1"
            />
            {/* Neck vertebra */}
            <line x1="44" y1="84" x2="56" y2="84" stroke="#666666" strokeWidth="1.5" />
            <line x1="42" y1="88" x2="58" y2="88" stroke="#666666" strokeWidth="1.5" />
            <line x1="40" y1="92" x2="60" y2="92" stroke="#666666" strokeWidth="1.5" />

            <defs>
              <linearGradient id="craniumMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#282828" />
                <stop offset="40%" stopColor="#141414" />
                <stop offset="80%" stopColor="#0a0a0a" />
                <stop offset="100%" stopColor="#1c1c1c" />
              </linearGradient>
            </defs>
          </svg>

          {/* Micro HUD Crosshairs */}
          <div className="absolute top-2 left-2 text-[9px] font-mono text-neutral-300">
            [SYS_SYNC: OK]
          </div>
          <div className="absolute bottom-2 right-2 text-[9px] font-mono text-neutral-300">
            [NEURAL_GATE: ARMED]
          </div>
        </div>
      </div>

      {/* Bottom Live Telemetry HUD Cluster */}
      <div className="relative z-10 grid grid-cols-4 gap-2 pt-4 border-t border-neutral-800/80 bg-black/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-4">
        <div>
          <span className="block text-[9px] font-mono text-neutral-300 uppercase">Latency</span>
          <span className="text-xs font-mono font-semibold text-white">{telemetry.latency}</span>
        </div>
        <div>
          <span className="block text-[9px] font-mono text-neutral-300 uppercase">Coherence</span>
          <span className="text-xs font-mono font-semibold text-white">{telemetry.coherence}</span>
        </div>
        <div>
          <span className="block text-[9px] font-mono text-neutral-300 uppercase">Core Temp</span>
          <span className="text-xs font-mono font-semibold text-neutral-200">{telemetry.coreTemp}</span>
        </div>
        <div>
          <span className="block text-[9px] font-mono text-neutral-300 uppercase">Engine FPS</span>
          <span className="text-xs font-mono font-semibold text-neutral-200">{telemetry.fps}</span>
        </div>
      </div>
    </div>
  );
};
