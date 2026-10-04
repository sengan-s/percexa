import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavbarProps {
  onOpenChat: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenInspector?: () => void;
  onOpenShowreel?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat, onNavigate, onOpenInspector, onOpenShowreel }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(sound.enabled);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const next = sound.toggle();
    setAudioEnabled(next);
  };

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Services', target: 'services' },
    { label: 'Work', target: 'work' },
    { label: 'About', target: 'about' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030303]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 flex items-center justify-between">
          {/* Brand Mark */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('hero');
            }}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded border border-neutral-700 bg-neutral-900/80 flex items-center justify-center font-heading font-bold text-white text-base tracking-tighter group-hover:border-neutral-400 group-hover:scale-105 transition-all">
              <span>P</span>
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-neutral-200 transition-colors">
              PER CEXA
            </span>
          </button>

          {/* Center Navigation Links (Clean text with hover indicators) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  sound.playHover();
                  onNavigate(link.target);
                }}
                className="hover:text-white transition-colors relative py-1 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={audioEnabled ? 'Mute Interface Sound' : 'Enable Subtle Interface Sound'}
              className="p-2 rounded border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Sound Toggle"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* 3D Robot Inspector Preview Button */}
            {onOpenInspector && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenInspector();
                }}
                title="Inspect 3D Robot Laboratory Model"
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>3D Robot Bay</span>
              </button>
            )}

            {/* Consult AI Lab */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenChat();
              }}
              title="Consult Percexa AI Architect"
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-neutral-300" />
              <span>Consult AI Lab</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('contact');
              }}
              className="relative px-4 py-2 text-xs font-medium text-white bg-black border border-neutral-700 hover:border-neutral-300 rounded transition-all duration-300 group overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            >
              <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-neutral-400 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 pt-24 px-6 md:hidden flex flex-col justify-between pb-8">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  onNavigate(link.target);
                }}
                className="block w-full text-left py-3 text-lg font-heading font-medium text-neutral-300 hover:text-white border-b border-neutral-900"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full text-left py-3 text-sm font-mono text-neutral-400 hover:text-white flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Consult AI Lab (Gemini)</span>
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
                onNavigate('contact');
              }}
              className="w-full py-3 text-center bg-white text-black font-medium text-sm rounded"
            >
              Start a Project →
            </button>
          </div>
        </div>
      )}
    </>
  );
};
