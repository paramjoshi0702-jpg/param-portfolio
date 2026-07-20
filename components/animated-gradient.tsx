'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Animated gradient background — a large, slowly-rotating conic gradient
 * that shifts hue over time. Sits behind everything (z-0).
 */
export function AnimatedGradient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed -inset-[50%] pointer-events-none"
      style={{
        zIndex: 0,
        background:
          'conic-gradient(from 0deg at 50% 50%, rgba(124,58,237,0.08), rgba(37,99,235,0.08), rgba(139,92,246,0.06), rgba(124,58,237,0.08))',
        filter: 'blur(80px)',
      }}
    />
  );
}
