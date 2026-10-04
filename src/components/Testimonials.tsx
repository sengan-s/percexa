import React from 'react';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        'Percexa completely re-engineered our core AI inference gateway. Their precision in delivering sub-2ms safety checks at massive concurrency is unlike any consultancy in the industry.',
      author: 'Marcus Vance',
      role: 'VP of Engineering',
      company: 'Aether Autonomous Systems',
      avatarText: 'MV',
    },
    {
      quote:
        'The combination of Apple-caliber interface craft with hardcore distributed systems capability is exceptionally rare. Percexa didn’t just write software; they set the technological benchmark for our venture.',
      author: 'Elena Rostova',
      role: 'Chief AI Officer',
      company: 'Neural Dynamics Capital',
      avatarText: 'ER',
    },
    {
      quote:
        'From architecture design through Kubernetes multi-region rollout, the team executed with zero downtime and immaculate code discipline. Our engineering team gained a strategic superpower.',
      author: 'David Sterling',
      role: 'Head of Infrastructure',
      company: 'QuantX Distributed Ledger',
      avatarText: 'DS',
    },
  ];

  return (
    <section className="py-28 px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 w-full z-20 relative">
      <div className="max-w-2xl mb-16">
        <span className="text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">
          VERIFIED EXECUTIVE TESTIMONIALS
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          BUILT WITH TRUST
        </h2>
        <p className="text-base text-neutral-400 font-sans font-light">
          Partnering with leadership teams to engineer category-defining products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-[#070707] border border-neutral-800/80 hover:border-neutral-600 rounded p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg"
          >
            <div>
              <Quote className="w-6 h-6 text-neutral-600 mb-6" />
              <p className="text-sm sm:text-base text-neutral-300 font-sans font-light leading-relaxed mb-8">
                “{t.quote}”
              </p>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-neutral-900">
              <div className="w-10 h-10 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center font-heading text-xs font-bold text-white tracking-wider">
                {t.avatarText}
              </div>
              <div>
                <h4 className="font-heading text-sm font-semibold text-white tracking-tight">
                  {t.author}
                </h4>
                <p className="text-xs text-neutral-400 font-sans">
                  {t.role} · <span className="text-neutral-500">{t.company}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
