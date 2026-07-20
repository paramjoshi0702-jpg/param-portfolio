'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scroll-triggered reveal wrapper. Animates children from y+offset+blur
 * to natural position when the element enters the viewport.
 */
export function ScrollReveal({
  children,
  className = '',
  y = 40,
  duration = 0.8,
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
