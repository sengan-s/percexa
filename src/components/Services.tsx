import React, { useState } from 'react';
import { ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import { Service3DObject } from './Service3DObject';
import { sound } from '../utils/sound';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const services = [
    {
      id: 'software',
      number: '01',
      title: 'SOFTWARE DEVELOPMENT',
      description: 'Scalable and high-performance software engineered around your business.',
      objectType: 'cube' as const,
      capabilities: ['High-throughput distributed systems', 'Native web & mobile platforms', 'Low-latency backend pipelines'],
    },
    {
      id: 'ai',
      number: '02',
      title: 'AI SOLUTIONS',
      description: 'Intelligent systems that automate and create new possibilities.',
      objectType: 'neural' as const,
      capabilities: ['Custom LLMs & neural architectures', 'Autonomous agents & workflows', 'Computer vision & real-time inference'],
    },
    {
      id: 'design',
      number: '03',
      title: 'DESIGN',
      description: 'Beautiful and intuitive digital experiences.',
      objectType: 'torus' as const,
      capabilities: ['Kinetic interaction design', 'Design systems & micro-interactions', 'Spatial 3D web interfaces'],
    },
    {
      id: 'cloud',
      number: '04',
      title: 'CLOUD & DEVOPS',
      description: 'Reliable, scalable and modern infrastructure.',
      objectType: 'cloud' as const,
      capabilities: ['Multi-region Kubernetes orchestration', 'Zero-downtime CI/CD automation', 'Telemetry, observability & reliability'],
    },
    {
      id: 'consulting',
      number: '05',
      title: 'CONSULTING',
      description: 'Strategic technology guidance for long-term growth.',
      objectType: 'crystal' as const,
      capabilities: ['Architecture technical due diligence', 'AI transformation roadmap', 'Scalability & security audit'],
    },
  ];

  return (
    <section id="services" className="relative py-28 px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 w-full z-20">
      {/* Section Header */}
      <div className="max-w-2xl mb-16">
        <span className="text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">
          CAPABILITIES & DISCIPLINES
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          TURNING IDEAS INTO REALITY
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 font-sans font-light">
          End-to-end technology services to build, scale and innovate.
        </p>
      </div>

      {/* 5 Minimal Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item, idx) => {
          const isHovered = hoveredCard === item.id;
          const isLarge = idx === 0 || idx === 1;

          return (
            <div
              key={item.id}
              onMouseEnter={() => {
                sound.playHover();
                setHoveredCard(item.id);
              }}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                sound.playClick();
                onSelectService(item.id);
              }}
              className={`group relative bg-[#070707] border transition-all duration-500 rounded p-7 sm:p-8 flex flex-col justify-between overflow-hidden cursor-pointer ${
                isLarge ? 'md:col-span-1 lg:col-span-1' : ''
              } ${
                isHovered
                  ? 'border-neutral-500 -translate-y-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.8)]'
                  : 'border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              {/* Dynamic light reflection sweep on hover */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent ${
                  isHovered ? 'opacity-100 translate-x-full duration-1000' : 'opacity-0 -translate-x-full'
                }`}
              />

              {/* Radial cursor highlight placeholder */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl pointer-events-none" />

              {/* Top Row: Service Number and 3D Metallic Object */}
              <div>
                <div className="flex items-start justify-between mb-6">
                  <span className="font-heading text-4xl font-bold text-neutral-600 group-hover:text-neutral-300 transition-colors tracking-tighter">
                    {item.number}
                  </span>

                  {/* 3D WebGL Object Canvas */}
                  <Service3DObject type={item.objectType} isHovered={isHovered} />
                </div>

                <h3 className="font-heading text-xl font-bold tracking-tight text-white mb-3 group-hover:text-neutral-100 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-neutral-400 font-sans leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Bottom Capabilities & Action */}
              <div className="pt-6 border-t border-neutral-900">
                <ul className="space-y-2 mb-6">
                  {item.capabilities.map((cap, cIdx) => (
                    <li key={cIdx} className="text-xs text-neutral-400 font-sans flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-neutral-400 transition-colors" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
                  <span className="tracking-wider uppercase">VIEW BLUEPRINT SPECIFICATION</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
