'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const updateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(${hovering ? 1.6 : 1})`;
      }
      rafId = requestAnimationFrame(updateRing);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, input, textarea, [data-cursor="hover"]');
      setHovering(!!interactive);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', checkHover);
    rafId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', checkHover);
      cancelAnimationFrame(rafId);
    };
  }, [hovering]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          transform: 'translate(-100px, -100px)',
          borderColor: hovering ? 'rgba(167, 139, 250, 0.9)' : 'rgba(255, 255, 255, 0.5)',
        }}
      />
    </>
  );
}
