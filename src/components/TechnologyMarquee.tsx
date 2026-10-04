import React from 'react';

export const TechnologyMarquee: React.FC = () => {
  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Framework' },
    { name: 'Node.js', category: 'Runtime' },
    { name: 'Python', category: 'Machine Learning' },
    { name: 'Java', category: 'Enterprise' },
    { name: 'Three.js', category: 'Spatial 3D' },
    { name: 'TensorFlow', category: 'Deep Learning' },
    { name: 'OpenAI', category: 'AI Inference' },
    { name: 'AWS', category: 'Cloud Infrastructure' },
    { name: 'Docker', category: 'Containerization' },
    { name: 'PostgreSQL', category: 'Relational DB' },
    { name: 'MongoDB', category: 'Document Store' },
    { name: 'Rust', category: 'Systems' },
    { name: 'Kubernetes', category: 'Orchestration' },
  ];

  return (
    <section className="py-24 border-y border-neutral-900 bg-[#040404] overflow-hidden z-20 relative">
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 mb-12 text-center">
        <span className="text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-2">
          ENGINEERING TOOLCHAIN
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white">
          BUILT WITH MODERN TECHNOLOGY
        </h2>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative w-full overflow-hidden flex items-center mb-4">
        {/* Left & Right gradient fades */}
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#040404] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#040404] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-8 whitespace-nowrap">
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3.5 rounded border border-neutral-800/80 bg-[#070707] hover:border-neutral-500 transition-colors group cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-white transition-colors" />
              <span className="font-heading text-base font-semibold text-neutral-200 group-hover:text-white transition-colors tracking-tight">
                {tech.name}
              </span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
