import React, { useEffect, useRef } from 'react';

export const ParticleTransition: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 140);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = 140;
    };

    window.addEventListener('resize', handleResize);

    // Particle definition
    const particleCount = 180;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 1.5 + Math.random() * 3.5,
      vy: (Math.random() - 0.5) * 0.4,
      size: 1 + Math.random() * 2,
      alpha: 0.2 + Math.random() * 0.7,
      trail: 12 + Math.random() * 24,
    }));

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle horizontal center energy guide line
      const grad = ctx.createLinearGradient(0, height / 2, width, height / 2);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.12)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > width + 50) {
          p.x = -50;
          p.y = Math.random() * height;
        }

        // Draw particle with horizontal kinetic motion trail
        ctx.beginPath();
        const pGrad = ctx.createLinearGradient(p.x - p.trail, p.y, p.x, p.y);
        pGrad.addColorStop(0, 'rgba(200, 200, 200, 0)');
        pGrad.addColorStop(1, `rgba(245, 245, 245, ${p.alpha})`);

        ctx.strokeStyle = pGrad;
        ctx.lineWidth = p.size;
        ctx.moveTo(p.x - p.trail, p.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Bright tip
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[140px] flex items-center justify-center overflow-hidden my-4 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-400 bg-[#030303]/80 px-4 py-1 border-y border-neutral-800">
          SYSTEM MATRIX TRANSITION // PERSISTENCE PHASE
        </span>
      </div>
    </div>
  );
};
