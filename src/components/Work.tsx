import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, ShieldCheck, Database, Blocks, Music } from 'lucide-react';
import { Project } from '../types';
import { sound } from '../utils/sound';

interface WorkProps {
  onSelectProject: (project: Project) => void;
  onOpenPreview: (projectId: string) => void;
}

export const Work: React.FC<WorkProps> = ({ onSelectProject, onOpenPreview }) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: 'sentinel',
      title: 'SENTINEL',
      subtitle: 'AI Safety & Governance',
      tagline: 'Deterministic safety boundary interceptor for autonomous enterprise agents',
      description:
        'Sentinel provides a zero-latency verification gateway that intercepts unauthorized tool calls and hallucinations in real-time before reaching production systems.',
      metric: '99.98%',
      metricLabel: 'Deterministic anomaly mitigation across 12M live agent interactions',
      category: 'AI Safety & Verification',
      tags: ['Autonomous Agents', 'Zero-Trust', 'Rust Core', 'Real-time Intercept'],
      techStack: ['Rust', 'WebAssembly', 'Python', 'eBPF', 'Kafka'],
      challenge:
        'Enterprise deployment of autonomous reasoning models faced strict regulatory compliance and the danger of non-deterministic tool executions that could corrupt master records.',
      solution:
        'Engineered a deterministic eBPF + WebAssembly security mesh that audits candidate tokens and system tool calls within sub-millisecond budgets.',
      architecture: [
        'Kernel-level eBPF network intercept for agent egress filtering',
        'Sub-1.2ms latency budget using compiled Rust verification state machines',
        'Cryptographic audit trail with immutable SHA-256 state proofs',
      ],
      client: 'Global Autonomous Systems Lab',
      year: '2026',
    },
    {
      id: 'memorox',
      title: 'MEMOROX',
      subtitle: 'AI Memory Platform',
      tagline: 'Sub-millisecond persistent neural recall across multi-modal sessions',
      description:
        'A vector-native distributed memory fabric that allows large language models and cognitive assistants to retain state across years of enterprise interactions.',
      metric: '4.2x',
      metricLabel: 'Retrieval speed improvement compared to standard RAG pipelines',
      category: 'Distributed Neural Storage',
      tags: ['Vector Database', 'Semantic Caching', 'Hierarchical HNSW', 'Distributed Go'],
      techStack: ['Go', 'C++', 'gRPC', 'CUDA', 'PostgreSQL'],
      challenge:
        'Context window exhaustion and slow vector lookups crippled conversational continuity across multi-agent enterprise workflows.',
      solution:
        'Architected a tiered hierarchical memory graph with GPU-accelerated quantization and speculative pre-fetching for instantaneous context retrieval.',
      architecture: [
        'Hardware-accelerated hierarchical HNSW vector indexing',
        'Speculative pre-fetching predicting user query paths with 88% precision',
        'Zero-copy memory mapped buffers on high-bandwidth NVMe clusters',
      ],
      client: 'Decentralized Cognitive Cloud',
      year: '2026',
    },
    {
      id: 'proofchain',
      title: 'PROOFCHAIN',
      subtitle: 'AI & Blockchain Intelligence',
      tagline: 'Cryptographic consensus mechanism powered by verified neural models',
      description:
        'Proofchain combines decentralized ledger integrity with verifiable AI computation, proving the validity of model weights and inference outputs on-chain.',
      metric: '100k+',
      metricLabel: 'Zero-knowledge ML inference proofs validated per second',
      category: 'Cryptographic Intelligence',
      tags: ['ZK-SNARKs', 'Decentralized Consensus', 'Model Verification', 'Solidity'],
      techStack: ['Solidity', 'Circom', 'Rust', 'TypeScript', 'Foundry'],
      challenge:
        'Verifying that an AI model executed inference correctly without revealing proprietary model weights or raw proprietary training datasets.',
      solution:
        'Built a ZK-ML zero-knowledge proof generation pipeline tailored for quantized transformer neural layers, verified on EVM-compatible networks.',
      architecture: [
        'Optimized halo2 proving backend for matrix multiplication constraints',
        'Sub-second on-chain verification smart contracts on Layer 2 rollups',
        'Audited multi-sig governance contract with hardware enclave keys',
      ],
      client: 'Apex Financial Cryptography',
      year: '2025',
    },
    {
      id: 'moodify',
      title: 'MOODIFY',
      subtitle: 'Emotion-Based Music Intelligence',
      tagline: 'Generative adaptive acoustic synthesis driven by biometric sentiment',
      description:
        'A spatial audio intelligence engine that generates real-time, biologically-adaptive soundscapes for cognitive focus and emotional modulation.',
      metric: '+43%',
      metricLabel: 'Sustained user cognitive flow duration measured across 50,000 trial sessions',
      category: 'Spatial Audio & Biosensors',
      tags: ['Generative Audio', 'Biometric Feedback', 'Web Audio API', 'Spatial 3D Sound'],
      techStack: ['Web Audio API', 'PyTorch', 'C++', 'Next.js', 'WebSockets'],
      challenge:
        'Static audio playlists fail to adapt to changing human cognitive states and stress biometric triggers throughout intensive knowledge work.',
      solution:
        'Developed a continuous parametric neural synthesizer that dynamically adjusts harmonic resonance, tempo, and spatial panning based on live EEG and heart rate variability.',
      architecture: [
        'Real-time low-latency procedural audio graph synthesized directly in-browser',
        'Bayesian reinforcement loop adapting musical textures to user focus indicators',
        'Ambisonic spatial binaural panning with head-tracking coordinates',
      ],
      client: 'NeuroSonic Labs',
      year: '2025',
    },
  ];

  return (
    <section id="work" className="relative py-28 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full z-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">
            PORTFOLIO OF IMPACT
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white">
            SELECTED WORK
          </h2>
        </div>
        <p className="text-sm md:text-base text-neutral-400 font-sans max-w-md">
          A selection of proprietary architectures, intelligent platforms, and critical engineering breakthroughs.
        </p>
      </div>

      {/* 4 Large Minimal Case Study Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj) => {
          const isHovered = hoveredProject === proj.id;

          return (
            <div
              key={proj.id}
              onMouseEnter={() => {
                sound.playHover();
                setHoveredProject(proj.id);
              }}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => {
                sound.playClick();
                onSelectProject(proj);
              }}
              className="group relative bg-[#070707] border border-neutral-800/90 hover:border-neutral-500 rounded overflow-hidden flex flex-col justify-between transition-all duration-500 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            >
              {/* Visual Presentation Area (Minimalist Geometric Canvas Preview) */}
              <div className="relative w-full h-64 sm:h-72 bg-[#040404] border-b border-neutral-900 flex items-center justify-center overflow-hidden">
                {/* Background grid */}
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                  style={{
                    backgroundImage:
                      'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Abstract Stylized 3D Metallic Graphic */}
                <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center transform transition-transform duration-700 group-hover:scale-105">
                  <div className="w-20 h-20 rounded-full border border-neutral-700 group-hover:border-neutral-300 bg-neutral-900/60 flex items-center justify-center mb-4 transition-all shadow-lg">
                    {proj.id === 'sentinel' && <ShieldCheck className="w-9 h-9 text-neutral-300" />}
                    {proj.id === 'memorox' && <Database className="w-9 h-9 text-neutral-300" />}
                    {proj.id === 'proofchain' && <Blocks className="w-9 h-9 text-neutral-300" />}
                    {proj.id === 'moodify' && <Music className="w-9 h-9 text-neutral-300" />}
                  </div>

                  <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
                    {proj.category}
                  </span>
                </div>

                {/* Corner tags */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-neutral-500 bg-black/60 px-2 py-0.5 rounded border border-neutral-800">
                  {proj.client}
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-xs font-semibold text-white bg-black/80 px-2.5 py-1 rounded border border-neutral-700">
                  {proj.metric}
                </div>
              </div>

              {/* Card Meta & Copy */}
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-white group-hover:text-neutral-100 transition-colors">
                      {proj.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-neutral-800 group-hover:border-neutral-500 flex items-center justify-center text-neutral-400 group-hover:text-white transition-all group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">
                    {proj.subtitle}
                  </p>

                  <p className="text-sm text-neutral-400 font-sans leading-relaxed mb-6">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono text-neutral-400 bg-neutral-900/60 px-2 py-0.5 rounded border border-neutral-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playClick();
                      onOpenPreview(proj.id);
                    }}
                    className="px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-400 text-xs font-mono text-white flex items-center justify-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Preview</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
