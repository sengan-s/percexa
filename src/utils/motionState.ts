/**
 * High-Performance Motion State Store
 * Avoids React setState() on scroll and mousemove to guarantee 60 FPS
 */

export interface MotionState {
  scrollProgress: number;
  scrollVelocity: number;
  scrollY: number;
  mouseX: number;
  mouseY: number;
  isMobile: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
}

const checkMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const checkLowEnd = () => {
  if (typeof window === 'undefined') return false;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4;
  return cores <= 4 || memory < 4 || checkMobile();
};

const checkReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const motionState: MotionState = {
  scrollProgress: 0,
  scrollVelocity: 0,
  scrollY: 0,
  mouseX: 0.5,
  mouseY: 0.5,
  isMobile: checkMobile(),
  isLowEnd: checkLowEnd(),
  prefersReducedMotion: checkReducedMotion(),
};

// Check WebGL availability with fallback
export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}
