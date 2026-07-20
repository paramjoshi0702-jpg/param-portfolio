'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Premium text reveal — splits text into words and staggers them up
 * with a blur-to-sharp transition when scrolled into view.
 */
export function TextReveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
}: {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll('.reveal-word');
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 100, opacity: 0, filter: 'blur(8px)' },
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger]);

  const words = children.split(' ');

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: '0.1em' }}>
          <span className="reveal-word inline-block">{word}</span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </div>
  );
}
