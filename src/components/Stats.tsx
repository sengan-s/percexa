import React, { useEffect, useRef } from 'react';

export const Stats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const el50Ref = useRef<HTMLSpanElement>(null);
  const el20Ref = useRef<HTMLSpanElement>(null);
  const el15Ref = useRef<HTMLSpanElement>(null);
  const el99Ref = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;

          const duration = 1400; // ms
          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            if (el50Ref.current) el50Ref.current.textContent = `${Math.floor(ease * 50)}+`;
            if (el20Ref.current) el20Ref.current.textContent = `${Math.floor(ease * 20)}+`;
            if (el15Ref.current) el15Ref.current.textContent = `${Math.floor(ease * 15)}+`;
            if (el99Ref.current) el99Ref.current.textContent = `${Math.floor(ease * 99)}%`;

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              if (el50Ref.current) el50Ref.current.textContent = '50+';
              if (el20Ref.current) el20Ref.current.textContent = '20+';
              if (el15Ref.current) el15Ref.current.textContent = '15+';
              if (el99Ref.current) el99Ref.current.textContent = '99%';
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 w-full z-20 relative">
      <div className="border-y border-neutral-800/80 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Stat 1 */}
          <div className="flex flex-col">
            <span ref={el50Ref} className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-2 tabular-nums">
              50+
            </span>
            <span className="text-sm font-semibold tracking-wide text-neutral-200 uppercase font-sans mb-1">
              Projects Delivered
            </span>
            <span className="text-xs text-neutral-500 font-sans leading-relaxed">
              Deployed across fintech, healthcare, and robotics
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col">
            <span ref={el20Ref} className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-2 tabular-nums">
              20+
            </span>
            <span className="text-sm font-semibold tracking-wide text-neutral-200 uppercase font-sans mb-1">
              Technologies
            </span>
            <span className="text-xs text-neutral-500 font-sans leading-relaxed">
              Modern high-performance toolchains and frameworks
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col">
            <span ref={el15Ref} className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-2 tabular-nums">
              15+
            </span>
            <span className="text-sm font-semibold tracking-wide text-neutral-200 uppercase font-sans mb-1">
              AI Solutions
            </span>
            <span className="text-xs text-neutral-500 font-sans leading-relaxed">
              Proprietary enterprise models and autonomous agents
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col">
            <span ref={el99Ref} className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-2 tabular-nums">
              99%
            </span>
            <span className="text-sm font-semibold tracking-wide text-neutral-200 uppercase font-sans mb-1">
              Client Satisfaction
            </span>
            <span className="text-xs text-neutral-500 font-sans leading-relaxed">
              Long-term strategic technology partnerships
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
