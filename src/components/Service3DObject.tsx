import React from 'react';

interface Service3DObjectProps {
  type: 'cube' | 'neural' | 'torus' | 'cloud' | 'crystal';
  isHovered: boolean;
}

export const Service3DObject: React.FC<Service3DObjectProps> = ({ type, isHovered }) => {
  return (
    <div
      className="w-24 h-24 relative flex items-center justify-center pointer-events-none select-none transition-transform duration-500 ease-out"
      style={{
        perspective: '600px',
        transform: isHovered ? 'scale(1.08)' : 'scale(1.0)',
      }}
    >
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered ? 'rotateY(24deg) rotateX(-12deg)' : 'rotateY(0deg) rotateX(0deg)',
        }}
      >
        {/* Subtle ambient metallic glow */}
        <div
          className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-500 ${
            isHovered ? 'opacity-35 bg-white/20' : 'opacity-10 bg-white/10'
          }`}
        />

        {/* 1. SOFTWARE DEVELOPMENT: Precision Metallic Cube & Wireframe Core */}
        {type === 'cube' && (
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Outer Rotating Wireframe Cage */}
            <svg
              className={`absolute inset-0 w-full h-full transition-transform duration-1000 ${
                isHovered ? 'rotate-45 scale-105' : 'rotate-0'
              }`}
              viewBox="0 0 64 64"
              fill="none"
            >
              <rect
                x="8"
                y="8"
                width="48"
                height="48"
                rx="4"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.2"
                strokeDasharray="4 2"
              />
              <path
                d="M8 8L24 24M56 8L40 24M8 56L24 40M56 56L40 40"
                stroke="rgba(200,200,200,0.3)"
                strokeWidth="1"
              />
            </svg>

            {/* Inner Metallic Solid Cube */}
            <div
              className={`w-9 h-9 rounded border border-neutral-400 bg-gradient-to-br from-neutral-200 via-neutral-400 to-neutral-800 shadow-[0_0_15px_rgba(255,255,255,0.15)] flex items-center justify-center transition-all duration-500 ${
                isHovered ? 'border-white shadow-[0_0_25px_rgba(255,255,255,0.35)]' : ''
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-sm bg-black/80 border border-white/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* 2. AI SOLUTIONS: Multi-Dimensional Neural Lattice */}
        {type === 'neural' && (
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Orbital Rings */}
            <svg
              className={`absolute inset-0 w-full h-full transition-transform duration-1000 ${
                isHovered ? 'rotate-90 scale-110' : 'rotate-12'
              }`}
              viewBox="0 0 64 64"
              fill="none"
            >
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="6 3"
              />
              <ellipse
                cx="32"
                cy="32"
                rx="26"
                ry="12"
                stroke="rgba(200,200,200,0.35)"
                strokeWidth="1"
                transform="rotate(45 32 32)"
              />
              <ellipse
                cx="32"
                cy="32"
                rx="26"
                ry="12"
                stroke="rgba(200,200,200,0.35)"
                strokeWidth="1"
                transform="rotate(-45 32 32)"
              />
            </svg>

            {/* Neural Synapse Nodes */}
            <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#fff] top-3 left-6 animate-pulse" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-neutral-300 bottom-3 right-6" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-neutral-300 top-8 right-2" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-neutral-300 bottom-8 left-2" />

            {/* Central Cognitive Core */}
            <div
              className={`w-7 h-7 rounded-full bg-gradient-to-tr from-neutral-800 via-neutral-300 to-white border border-white flex items-center justify-center transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.25)] ${
                isHovered ? 'scale-110 shadow-[0_0_30px_rgba(255,255,255,0.5)]' : ''
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-white/80" />
            </div>
          </div>
        )}

        {/* 3. DESIGN: Kinetic Torus & Golden Ratio Gyro */}
        {type === 'torus' && (
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Metallic Torus Ring */}
            <svg
              className={`w-14 h-14 transition-transform duration-700 ${
                isHovered ? 'rotate-180 scale-105' : 'rotate-0'
              }`}
              viewBox="0 0 64 64"
              fill="none"
            >
              <defs>
                <linearGradient id="torusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#999999" />
                  <stop offset="100%" stopColor="#1a1a1a" />
                </linearGradient>
              </defs>
              <circle
                cx="32"
                cy="32"
                r="22"
                stroke="url(#torusGrad)"
                strokeWidth="5"
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
              />
              <circle
                cx="32"
                cy="32"
                r="16"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              <circle
                cx="32"
                cy="32"
                r="27"
                stroke="rgba(200,200,200,0.25)"
                strokeWidth="0.8"
              />
            </svg>

            {/* Center Prismatic Axis */}
            <div
              className={`absolute w-3.5 h-3.5 rounded-full border border-neutral-300 bg-white transition-all duration-500 shadow-[0_0_12px_#fff] ${
                isHovered ? 'scale-125' : ''
              }`}
            />
          </div>
        )}

        {/* 4. CLOUD & DEVOPS: Distributed Orbital Infrastructure */}
        {type === 'cloud' && (
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Cluster Boundary Ring */}
            <svg
              className={`absolute inset-0 w-full h-full transition-transform duration-1000 ${
                isHovered ? 'rotate-90' : 'rotate-0'
              }`}
              viewBox="0 0 64 64"
              fill="none"
            >
              <circle
                cx="32"
                cy="32"
                r="27"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="5 3"
              />
              <path
                d="M18 36L32 20L46 36"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.2"
              />
            </svg>

            {/* Cloud Nodes */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-7 h-7 rounded-full bg-gradient-to-b from-neutral-200 via-neutral-400 to-neutral-700 border border-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-transform duration-500 ${
                  isHovered ? 'scale-110' : ''
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-neutral-900" />
              </div>
              <div className="absolute -left-3 top-1 w-5 h-5 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-800 border border-neutral-400/80 -z-10" />
              <div className="absolute -right-3 top-1 w-5 h-5 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-800 border border-neutral-400/80 -z-10" />
            </div>
          </div>
        )}

        {/* 5. CONSULTING: Titanium Monolith Crystal */}
        {type === 'crystal' && (
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Geometric Orbit */}
            <svg
              className={`absolute inset-0 w-full h-full transition-transform duration-1000 ${
                isHovered ? 'rotate-60 scale-105' : 'rotate-0'
              }`}
              viewBox="0 0 64 64"
              fill="none"
            >
              <polygon
                points="32,4 58,56 6,56"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
            </svg>

            {/* Multi-Faceted Crystal */}
            <div
              className={`relative w-6 h-11 transition-transform duration-500 ${
                isHovered ? 'scale-110' : ''
              }`}
            >
              <div className="w-full h-full bg-gradient-to-b from-white via-neutral-400 to-neutral-900 border border-white/80 shadow-[0_0_18px_rgba(255,255,255,0.3)] clip-crystal" />
            </div>
          </div>
        )}
      </div>

      <style>{`
        .clip-crystal {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
  );
};
