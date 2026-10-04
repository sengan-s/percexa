import React, { useState, useEffect, useRef } from 'react';

export const Stats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const [count50, setCount50] = useState(0);
  const [count20, setCount20] = useState(0);
  const [count15, setCount15] = useState(0);
  const [count99, setCount99] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // ms
          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCount50(Math.floor(ease * 50));
            setCount20(Math.floor(ease * 20));
            setCount15(Math.floor(ease * 15));
            setCount99(Math.floor(ease * 99));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount50(50);
              setCount20(20);
              setCount15(15);
              setCount99(99);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const stats = [
    { value: `${count50}+`, label: 'Projects Delivered', desc: 'Deployed across fintech, healthcare, and robotics' },
    { value: `${count20}+`, label: 'Technologies', desc: 'Modern high-performance toolchains and frameworks' },
    { value: `${count15}+`, label: 'AI Solutions', desc: 'Proprietary enterprise models and autonomous agents' },
    { value: `${count99}%`, label: 'Client Satisfaction', desc: 'Long-term strategic technology partnerships' },
  ];

  return (
    <section ref={containerRef} className="py-24 px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 w-full z-20 relative">
      <div className="border-y border-neutral-800/80 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-2 tabular-nums">
                {item.value}
              </span>
              <span className="text-sm font-semibold tracking-wide text-neutral-200 uppercase font-sans mb-1">
                {item.label}
              </span>
              <span className="text-xs text-neutral-500 font-sans leading-relaxed">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
