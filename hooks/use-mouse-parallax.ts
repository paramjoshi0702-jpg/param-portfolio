'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Mouse parallax — element drifts gently based on cursor position.
 * depth (0–1) controls how far it moves. Disabled on touch devices.
 */
export function useMouseParallax<T extends HTMLElement>(depth = 0.02) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 100 * depth;
      const y = (e.clientY / window.innerHeight - 0.5) * 100 * depth;
      xTo(x);
      yTo(y);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [depth]);

  return ref;
}
