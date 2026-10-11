import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { sound } from '../utils/sound';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultation }) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020202] border-t border-neutral-900 pt-20 pb-12 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full z-20 relative font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Brand & Tagline Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-neutral-700 bg-neutral-900 flex items-center justify-center font-heading font-bold text-white text-base">
              <span>P</span>
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-white">
              PER CEXA
            </span>
          </div>

          <p className="font-heading text-lg font-medium text-neutral-300 tracking-wide">
            Build. Innovate. Grow.
          </p>

          <p className="text-xs text-neutral-500 font-sans leading-relaxed max-w-sm">
            Next-generation software engineering, artificial intelligence laboratory solutions, spatial interfaces, and enterprise technology consulting.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            {[
              { label: 'GitHub', icon: Github, url: 'https://github.com' },
              { label: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
              { label: 'X', icon: Twitter, url: 'https://x.com' },
              { label: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded border border-neutral-800 bg-neutral-950 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Column 1: Services */}
        <div>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-4">
            Services
          </span>
          <ul className="space-y-2.5 text-xs text-neutral-500">
            <li>
              <button
                onClick={() => onNavigate('services')}
                className="hover:text-neutral-200 transition-colors cursor-pointer text-left"
              >
                Software Development
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('services')}
                className="hover:text-neutral-200 transition-colors cursor-pointer text-left"
              >
                AI Solutions & LLMs
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('services')}
                className="hover:text-neutral-200 transition-colors cursor-pointer text-left"
              >
                Product & Spatial Design
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('services')}
                className="hover:text-neutral-200 transition-colors cursor-pointer text-left"
              >
                Cloud Infrastructure & DevOps
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('services')}
                className="hover:text-neutral-200 transition-colors cursor-pointer text-left"
              >
                Executive Tech Consulting
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: Company */}
        <div>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-4">
            Company
          </span>
          <ul className="space-y-2.5 text-xs text-neutral-500">
            <li>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-neutral-200 transition-colors cursor-pointer text-left"
              >
                About Percexa
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('work')}
                className="hover:text-neutral-200 transition-colors cursor-pointer text-left"
              >
                Selected Work
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenConsultation()}
                className="hover:text-neutral-200 transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <span>AI Lab Console</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              </button>
            </li>
            <li>
              <span className="text-neutral-600">Research Publications</span>
            </li>
            <li>
              <span className="text-neutral-600">Careers (Invite-only)</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-4">
            Contact
          </span>
          <ul className="space-y-2.5 text-xs text-neutral-500">
            <li>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-neutral-200 transition-colors cursor-pointer text-left"
              >
                Initiate Project
              </button>
            </li>
            <li>
              <a href="mailto:inquiries@percexa.com" className="hover:text-neutral-200 transition-colors">
                inquiries@percexa.com
              </a>
            </li>
            <li>
              <span className="text-neutral-600">San Francisco HQ</span>
            </li>
            <li>
              <span className="text-neutral-600">Zurich Robotics Lab</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        <div>© 2026 Percexa. All rights reserved.</div>

        <div className="flex items-center gap-6">
          <span className="hover:text-neutral-400 transition-colors cursor-pointer">Privacy Standard</span>
          <span className="hover:text-neutral-400 transition-colors cursor-pointer">Terms of Engagement</span>
          <button
            onClick={scrollToTop}
            title="Back to Top"
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
