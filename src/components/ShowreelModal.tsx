import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(24);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { title: '01. Kinetic Humanoid Prototyping', time: '0:00 - 0:45', code: 'SYS-701' },
    { title: '02. Neural Latent Memory Engines', time: '0:45 - 1:30', code: 'NET-402' },
    { title: '03. Enterprise Real-Time Cloud Scale', time: '1:30 - 2:15', code: 'CLD-910' },
    { title: '04. Sovereign Cryptographic Intelligence', time: '2:15 - 3:00', code: 'CRX-554' },
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.4;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  useEffect(() => {
    const chapterIdx = Math.min(Math.floor((progress / 100) * chapters.length), chapters.length - 1);
    setActiveChapter(chapterIdx);
  }, [progress, chapters.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#080808] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl flex flex-col">
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 border-b border-neutral-800 bg-[#040404] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-heading text-xs tracking-[0.2em] font-semibold text-white uppercase">
              PER CEXA // 2026 RESEARCH & ENGINEERING SHOWREEL
            </span>
            <span className="text-[10px] font-mono text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 hidden sm:inline">
              4K CINEMATIC MASTER
            </span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Simulation Screen */}
        <div className="relative w-full aspect-video bg-[#020202] flex items-center justify-center overflow-hidden">
          {/* Futuristic grid background with animated scanner line */}
          <div className="absolute inset-0 bg-noise opacity-30" />
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Holographic central visualization */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 max-w-lg">
            <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 border border-neutral-700 rounded-full animate-spin [animation-duration:12s]" />
              <div className="absolute inset-3 border border-neutral-500/40 rounded-full animate-spin [animation-direction:reverse] [animation-duration:8s]" />
              <div className="w-12 h-12 bg-neutral-900 border border-white/40 rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
            </div>

            <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase mb-1">
              {chapters[activeChapter].code} // CHAPTER 0{activeChapter + 1}
            </span>
            <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-white mb-2">
              {chapters[activeChapter].title}
            </h3>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              Real-world client deployments in high-frequency algorithmic robotics, zero-latency machine learning clusters, and fault-tolerant infrastructure.
            </p>
          </div>

          {/* Live Telemetry Overlays */}
          <div className="absolute top-4 left-4 z-20 font-mono text-[10px] text-neutral-500 space-y-1 bg-black/60 backdrop-blur-sm p-2 rounded border border-neutral-800">
            <div>CAM_01 // 60.0 FPS</div>
            <div>STATUS: SYNCHRONIZED</div>
            <div>LATENCY: 0.84ms</div>
          </div>

          <div className="absolute bottom-4 right-4 z-20 font-mono text-[10px] text-neutral-500 bg-black/60 backdrop-blur-sm p-2 rounded border border-neutral-800">
            <span>RES: 3840 x 2160 HDR</span>
          </div>
        </div>

        {/* Video Scrub Bar & Controls */}
        <div className="p-4 bg-[#050505] border-t border-neutral-800 space-y-3">
          {/* Progress bar */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newPct = (clickX / rect.width) * 100;
              setProgress(Math.max(0, Math.min(100, newPct)));
            }}
            className="w-full h-1.5 bg-neutral-800 rounded-full cursor-pointer relative overflow-hidden group"
          >
            <div
              className="h-full bg-neutral-200 transition-all duration-100 group-hover:bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Lower controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsPlaying(!isPlaying);
                }}
                className="w-8 h-8 rounded border border-neutral-700 bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>

              <button
                onClick={() => setProgress(0)}
                title="Replay"
                className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="font-mono text-xs text-neutral-400">
                <span>0:{Math.floor((progress / 100) * 180).toString().padStart(2, '0')}</span>
                <span className="text-neutral-600"> / 3:00</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => setProgress((idx / chapters.length) * 100)}
                  className={`px-2 py-1 text-[10px] font-mono rounded border transition-colors hidden md:inline-block ${
                    activeChapter === idx
                      ? 'bg-neutral-800 text-white border-neutral-600'
                      : 'text-neutral-500 border-neutral-900 hover:text-neutral-300'
                  }`}
                >
                  {ch.code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
