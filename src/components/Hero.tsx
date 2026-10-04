import React, { useState } from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeroProps {
  onStartProject: () => void;
  onWatchShowreel: () => void;
  onOpenInspector: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onWatchShowreel, onOpenInspector }) => {
  const line1 = 'WE BUILD';
  const line2 = "WHAT'S NEXT.";

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-between pt-28 pb-16 px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 z-20 pointer-events-none"
    >
      {/* Left Content Column */}
      <div className="max-w-2xl xl:max-w-3xl pointer-events-auto">
        {/* Small label */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span className="text-[11px] md:text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
            TECHNOLOGY FOR A BETTER TOMORROW
          </span>
        </div>

        {/* Large kinetic headline letter-by-letter reveal */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[0.98] mb-8 select-none">
          <div className="flex flex-wrap overflow-hidden py-1">
            {line1.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block transition-all duration-700 ease-out animate-letter-reveal"
                style={{
                  animationDelay: `${index * 45}ms`,
                  marginRight: char === ' ' ? '0.3em' : '0.02em',
                }}
              >
                {char}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap overflow-hidden py-1 text-neutral-200">
            {line2.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block transition-all duration-700 ease-out animate-letter-reveal"
                style={{
                  animationDelay: `${(line1.length + index) * 45 + 150}ms`,
                  marginRight: char === ' ' ? '0.3em' : '0.02em',
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </h1>

        {/* Supporting text */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-400 font-sans font-light leading-relaxed max-w-xl mb-10 text-balance">
          Percexa builds intelligent software, AI solutions and digital experiences for a smarter future.
        </p>

        {/* Interactive CTA buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Start a Project (Magnetic hover & inner highlight sweep) */}
          <button
            onClick={() => {
              sound.playClick();
              onStartProject();
            }}
            onMouseEnter={() => sound.playHover()}
            className="relative px-7 py-3.5 bg-black border border-neutral-700 hover:border-neutral-200 text-white rounded text-sm font-medium tracking-wide flex items-center justify-center gap-2 group overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform" />
          </button>

          {/* Watch Showreel */}
          <button
            onClick={() => {
              sound.playClick();
              onWatchShowreel();
            }}
            onMouseEnter={() => sound.playHover()}
            className="px-6 py-3.5 bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white rounded text-sm font-medium tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer"
          >
            <span className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
              <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
            </span>
            <span>Watch Showreel</span>
          </button>
        </div>
      </div>

      {/* Right spacer for 3D robot */}
      <div className="hidden lg:block w-[45%] h-[550px]" aria-hidden="true" />

      {/* Scroll indicator (Bottom-Left) */}
      <div className="absolute bottom-8 left-6 sm:left-10 md:left-14 lg:left-20 xl:left-24 flex items-center gap-3 pointer-events-auto">
        <div className="w-[1px] h-10 bg-neutral-800 relative overflow-hidden">
          <div className="w-full h-4 bg-white animate-scroll-down" />
        </div>
        <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
          SCROLL TO EXPLORE
        </span>
      </div>

      <style>{`
        @keyframes letterReveal {
          0% {
            opacity: 0;
            transform: translateY(32px);
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        .animate-letter-reveal {
          animation: letterReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes scrollDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(250%);
          }
        }
        .animate-scroll-down {
          animation: scrollDown 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
