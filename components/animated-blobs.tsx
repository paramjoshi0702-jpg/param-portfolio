'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function AnimatedBlobs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const blobs = [blob1Ref.current, blob2Ref.current, blob3Ref.current].filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      // Organic floating motion
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: () => gsap.utils.random(-40, 40),
          y: () => gsap.utils.random(-40, 40),
          scale: () => gsap.utils.random(0.9, 1.15),
          duration: gsap.utils.random(10, 16),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 2,
        });
      });

      // Mouse parallax (desktop only)
      if (!isTouch) {
        const xTo1 = gsap.quickTo(blob1Ref.current!, 'xPercent', { duration: 2, ease: 'power3' });
        const yTo1 = gsap.quickTo(blob1Ref.current!, 'yPercent', { duration: 2, ease: 'power3' });
        const xTo2 = gsap.quickTo(blob2Ref.current!, 'xPercent', { duration: 2.5, ease: 'power3' });
        const yTo2 = gsap.quickTo(blob2Ref.current!, 'yPercent', { duration: 2.5, ease: 'power3' });
        const xTo3 = gsap.quickTo(blob3Ref.current!, 'xPercent', { duration: 3, ease: 'power3' });
        const yTo3 = gsap.quickTo(blob3Ref.current!, 'yPercent', { duration: 3, ease: 'power3' });

        const onMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5);
          const y = (e.clientY / window.innerHeight - 0.5);
          xTo1(x * 8);
          yTo1(y * 8);
          xTo2(x * -10);
          yTo2(y * -10);
          xTo3(x * 6);
          yTo3(y * 6);
        };

        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div
        ref={blob1Ref}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />
      <div
        ref={blob2Ref}
        className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-25"
        style={{ background: 'radial-gradient(circle, #2563eb, transparent 70%)' }}
      />
      <div
        ref={blob3Ref}
        className="absolute bottom-[-10%] left-[30%] w-[450px] h-[450px] rounded-full blur-[120px] opacity-20"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
      />
    </div>
  );
}
