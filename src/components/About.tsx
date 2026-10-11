import React from 'react';
import { AboutRobotCanvas } from './AboutRobotCanvas';

export const About: React.FC = () => {
  const pillars = [
    {
      title: 'Precision Engineering',
      desc: 'Zero-tolerance quality standards for enterprise critical systems and resilient architectures.',
    },
    {
      title: 'Autonomous AI Synthesis',
      desc: 'Next-generation neural models engineered to operate independently in production.',
    },
    {
      title: 'Design as Differentiation',
      desc: 'Apple-level minimalism paired with intuitive spatial micro-interactions.',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-28 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full z-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & Philosophy */}
        <div className="lg:col-span-7">
          <span className="text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">
            WHO WE ARE // CORE CONVICTION
          </span>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-6">
            A TEAM THAT
            <br />
            <span className="text-neutral-300">BUILDS THE FUTURE</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed mb-8 max-w-xl">
            We combine technology, creativity and strategy to build products that make a real impact.
          </p>

          <p className="text-sm text-neutral-400 font-sans leading-relaxed mb-10 max-w-xl">
            Headquartered at the intersection of AI research, high-performance systems engineering, and spatial interface craft, Percexa partners with pioneering ventures and Fortune 500 enterprises to invent and scale their most demanding digital frontiers.
          </p>

          <div className="space-y-6 pt-4 border-t border-neutral-900">
            {pillars.map((p, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="font-mono text-xs text-neutral-500 pt-0.5">0{idx + 1}</span>
                <div>
                  <h4 className="font-heading text-base font-semibold text-white mb-1">
                    {p.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Second Cinematic Robot in Darkness */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full rounded border border-neutral-900 bg-[#060606] overflow-hidden p-2">
            {/* 3D Dark Silhouette Robot Canvas (Self-contained, pauses when off-screen) */}
            <AboutRobotCanvas />

            {/* Subtle corner tech coordinates */}
            <div className="absolute top-4 left-4 font-mono text-[9px] text-neutral-600 uppercase tracking-widest">
              MODEL: PERCEXA-X1 RESEARCH PROTOTYPE
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[9px] text-neutral-600">
              OPTICS: CALIBRATED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
