import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KineticRobotCanvas } from './components/KineticRobotCanvas';
import { Services } from './components/Services';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { ParticleTransition } from './components/ParticleTransition';
import { Work } from './components/Work';
import { TechnologyMarquee } from './components/TechnologyMarquee';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatDrawer } from './components/ChatDrawer';
import { ShowreelModal } from './components/ShowreelModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { PrototypePreviewModal } from './components/PrototypePreviewModal';
import { RobotInspectorModal } from './components/RobotInspectorModal';
import { ServiceBlueprintModal } from './components/ServiceBlueprintModal';
import { Project } from './types';
import { Bot, Eye } from 'lucide-react';
import { sound } from './utils/sound';
import { motionState } from './utils/motionState';

export default function App() {
  // Modal & Drawer UI States (only update when user explicitly opens/closes a modal)
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [previewProjectId, setPreviewProjectId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize unified Lenis smooth scroll without any React state thrashing
  useEffect(() => {
    if (!motionState.prefersReducedMotion) {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      // Update mutable motionState directly - ZERO React re-renders on scroll frames!
      lenis.on('scroll', (e: any) => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        motionState.scrollProgress = total > 0 ? e.scroll / total : 0;
        motionState.scrollVelocity = e.velocity || 0;
        motionState.scrollY = e.scroll;
      });

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    } else {
      const handleNativeScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        motionState.scrollProgress = total > 0 ? window.scrollY / total : 0;
        motionState.scrollY = window.scrollY;
      };
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleNativeScroll);
    }
  }, []);

  // Global mouse tracking - directly updates mutable motionState without re-rendering App!
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      motionState.mouseX = e.clientX / window.innerWidth;
      motionState.mouseY = e.clientY / window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -30, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full m-0 p-0 bg-[#030303] text-[#F5F5F5] selection:bg-neutral-800 selection:text-white overflow-x-hidden">
      {/* Subtle atmospheric noise and moving gradient background */}
      <div className="fixed inset-0 pointer-events-none bg-noise opacity-25 z-0" />
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-15"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(200, 200, 200, 0.1), transparent)',
        }}
      />

      {/* Main 3D Kinetic Humanoid Robot & Particle System */}
      <KineticRobotCanvas />

      {/* Navigation */}
      <Navbar
        onOpenChat={() => setIsChatOpen(true)}
        onNavigate={scrollToSection}
        onOpenInspector={() => setIsInspectorOpen(true)}
        onOpenShowreel={() => setIsShowreelOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-20">
        <Hero
          onStartProject={() => scrollToSection('contact')}
          onWatchShowreel={() => setIsShowreelOpen(true)}
          onOpenInspector={() => setIsInspectorOpen(true)}
        />

        <Services onSelectService={(serviceId) => setSelectedServiceId(serviceId)} />

        <Stats />

        <About />

        {/* Cinematic Horizontal Particle Dissolve & Reassemble Transition */}
        <ParticleTransition />

        <Work
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenPreview={(projectId) => setPreviewProjectId(projectId)}
        />

        <TechnologyMarquee />

        <Testimonials />

        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenConsultation={() => setIsChatOpen(true)}
      />

      {/* Floating Action Launchers (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* 3D Robot Bay Trigger */}
        <button
          onClick={() => {
            sound.playClick();
            setIsInspectorOpen(true);
          }}
          className="px-3.5 py-2.5 bg-[#0e0e0e]/90 backdrop-blur-md border border-neutral-700 hover:border-white rounded-full flex items-center gap-2 shadow-[0_8px_25px_rgba(0,0,0,0.8)] transition-all cursor-pointer text-xs font-mono text-neutral-300 hover:text-white"
          title="Inspect 3D Robot in Virtual Laboratory Bay"
        >
          <Eye className="w-3.5 h-3.5 text-white" />
          <span className="hidden sm:inline">3D Robot Bay</span>
        </button>

        {/* Gemini AI Lab Trigger */}
        <button
          onClick={() => {
            sound.playClick();
            setIsChatOpen(true);
          }}
          className="group relative px-4 py-2.5 bg-[#0e0e0e]/90 backdrop-blur-md border border-neutral-700 hover:border-white rounded-full flex items-center gap-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.8)] transition-all duration-300 cursor-pointer"
          title="Open Percexa AI Lab Assistant"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <Bot className="w-4 h-4 text-neutral-300 group-hover:text-white transition-colors" />
          <span className="text-xs font-mono tracking-wider uppercase text-neutral-300 group-hover:text-white pr-1">
            Consult AI
          </span>
          <span className="absolute inset-0 rounded-full -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform" />
        </button>
      </div>

      {/* MODALS & DRAWERS */}
      {/* 1. Gemini Multi-turn Chat Console */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* 2. 4K Cinematic Research Showreel */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      {/* 3. Case Study Details Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenConsultation={() => setIsChatOpen(true)}
        onOpenSimulation={(projId) => setPreviewProjectId(projId)}
      />

      {/* 4. Interactive Live Prototype Engine Preview Modal */}
      <PrototypePreviewModal
        projectId={previewProjectId}
        onClose={() => setPreviewProjectId(null)}
        onOpenConsultation={() => setIsChatOpen(true)}
      />

      {/* 5. 3D Robot Laboratory 360° Inspector */}
      <RobotInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        onOpenConsultation={() => setIsChatOpen(true)}
      />

      {/* 6. Service Architecture Specification Blueprint */}
      <ServiceBlueprintModal
        serviceId={selectedServiceId}
        onClose={() => setSelectedServiceId(null)}
        onOpenConsultation={() => setIsChatOpen(true)}
      />
    </div>
  );
}
