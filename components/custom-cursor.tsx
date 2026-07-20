'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;
    let hovering = false;
    let clicking = false;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: mouseX - 4,
          y: mouseY - 4,
          duration: 0.15,
          ease: 'power3',
        });
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ringRef.current) {
        const scale = clicking ? 0.7 : hovering ? 1.8 : 1;
        gsap.to(ringRef.current, {
          x: ringX - 20,
          y: ringY - 20,
          scale,
          duration: 0.3,
          ease: 'power3',
        });
      }
      rafId = requestAnimationFrame(animate);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      hovering = !!target.closest('a, button, input, textarea, [data-cursor="hover"]');
    };

    const onDown = () => { clicking = true; };
    const onUp = () => { clicking = false; };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', checkHover);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', checkHover);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ transform: 'translate(-100px, -100px)' }} />
      <div ref={ringRef} className="cursor-ring" style={{ transform: 'translate(-100px, -100px)' }} />
    </>
  );
}
