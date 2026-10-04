import React from 'react';
import { X, ArrowRight, ShieldCheck, Cpu, Terminal, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';
import { sound } from '../utils/sound';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenConsultation: () => void;
  onOpenSimulation: (projectId: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenConsultation,
  onOpenSimulation,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#090909] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 bg-[#050505] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
              <span>{project.category}</span>
              <span>·</span>
              <span>{project.year}</span>
              <span>·</span>
              <span className="text-white font-medium">{project.client}</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-sm text-neutral-400 font-sans mt-1">{project.subtitle}</p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8 font-sans">
          {/* Key Metric Banner & Interactive Preview Launcher */}
          <div className="p-5 rounded border border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">
                PRIMARY SYSTEM OUTCOME
              </span>
              <span className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {project.metric}
              </span>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              <span className="text-xs sm:text-sm text-neutral-400 font-sans max-w-xs text-left sm:text-right">
                {project.metricLabel}
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                  onOpenSimulation(project.id);
                }}
                className="px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-400 text-xs font-mono text-white flex items-center gap-2 transition-all shadow-sm cursor-pointer mt-1"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>LAUNCH INTERACTIVE PROTOTYPE PREVIEW</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded border border-neutral-900 bg-[#0b0b0b]">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                01. THE CHALLENGE
              </span>
              <p className="text-sm text-neutral-300 leading-relaxed">{project.challenge}</p>
            </div>

            <div className="p-5 rounded border border-neutral-900 bg-[#0b0b0b]">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                02. PER CEXA SOLUTION
              </span>
              <p className="text-sm text-neutral-300 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Architecture Specifications */}
          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-3">
              TECHNICAL ARCHITECTURE & SPECIFICATIONS
            </span>
            <div className="space-y-2.5">
              {project.architecture.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded border border-neutral-800/80 bg-neutral-900/30 text-xs text-neutral-300 font-sans"
                >
                  <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-3">
              ENGINEERED WITH
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-mono rounded border border-neutral-800 bg-neutral-900 text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-neutral-800 bg-[#050505] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-neutral-500 font-sans">
            Need a similar high-performance architecture built for your enterprise?
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
              onOpenConsultation();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-white text-black hover:bg-neutral-200 rounded text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Consult Executive AI Architect</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
