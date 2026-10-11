import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { ContactRobotCanvas } from './ContactRobotCanvas';
import { sound } from '../utils/sound';

export const Contact: React.FC = () => {
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'AI Solutions & Engineering',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFocus = () => {
    setIsFormFocused(true);
    sound.playFocus();
  };

  const handleBlur = () => {
    setIsFormFocused(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmittedRef(data.referenceId || 'PCX-SUCCESS');
      sound.playActivate();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error transmitting dispatch. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen py-28 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full z-20 flex items-center">
      {/* Background 3D Robot Head (Optic activates on form focus!) */}
      <ContactRobotCanvas isFormFocused={isFormFocused} />

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading & Contact Info */}
        <div className="lg:col-span-6">
          <span className="text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">
            INITIATE ENGAGEMENT
          </span>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.02] mb-6">
            LET’S BUILD
            <br />
            <span className="text-neutral-300">WHAT’S NEXT.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 font-sans font-light leading-relaxed mb-10 max-w-lg">
            Have an idea, challenge or ambitious product in mind? Let’s turn it into something real.
          </p>

          <div className="space-y-4 pt-6 border-t border-neutral-900 font-sans text-sm text-neutral-400">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-neutral-500" />
              <span>inquiries@percexa.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-neutral-500" />
              <span>San Francisco · Zurich · Tokyo</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-neutral-500" />
              <span>Strict Mutual NDA & Enterprise Security Standard</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-6">
          <div className="bg-[#080808]/90 backdrop-blur-md border border-neutral-800 rounded-lg p-7 sm:p-9 shadow-2xl relative">
            {submittedRef ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border border-neutral-600 bg-neutral-900 flex items-center justify-center text-white mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white">
                  Transmission Confirmed
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto font-sans leading-relaxed">
                  Your project scope has been logged with system dispatch code{' '}
                  <span className="font-mono text-white font-semibold">{submittedRef}</span>. An Executive AI Architect will review your parameters within 24 hours.
                </p>
                <button
                  onClick={() => setSubmittedRef(null)}
                  className="mt-4 px-5 py-2 text-xs font-mono text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 rounded transition-colors"
                >
                  TRANSMIT ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder="e.g. Dr. Julian Vance"
                      className="w-full bg-[#101010] border border-neutral-800 focus:border-neutral-400 rounded px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder="julian@enterprise.com"
                      className="w-full bg-[#101010] border border-neutral-800 focus:border-neutral-400 rounded px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                      Organization / Venture
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder="Aether Robotics Inc."
                      className="w-full bg-[#101010] border border-neutral-800 focus:border-neutral-400 rounded px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                      Project Discipline
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="w-full bg-[#101010] border border-neutral-800 focus:border-neutral-400 rounded px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="AI Solutions & Engineering">AI Solutions & Engineering</option>
                      <option value="Custom High-Performance Software">Custom High-Performance Software</option>
                      <option value="Spatial Interface & Kinetic Design">Spatial Interface & Kinetic Design</option>
                      <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                      <option value="Executive Technology Consulting">Executive Technology Consulting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Project Scope & Objectives *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Describe your technical objectives, architectural bottlenecks, or target timeline..."
                    className="w-full bg-[#101010] border border-neutral-800 focus:border-neutral-400 rounded px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="text-xs font-mono text-red-400 bg-red-950/30 border border-red-900/60 p-2.5 rounded">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full relative px-6 py-3.5 bg-black border border-neutral-700 hover:border-white text-white rounded text-sm font-medium tracking-wide flex items-center justify-center gap-2 group overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{submitting ? 'Transmitting Dispatch...' : 'Start the Conversation'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
