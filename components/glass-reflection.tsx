'use client';

import { useRef, ReactNode } from 'react';

/**
 * Glass reflection overlay — a subtle moving sheen that follows the mouse.
 * Place inside a `relative overflow-hidden` parent. The parent should forward
 * mouse events via the exported `trackSheen` helper, or wrap children with
 * the component to get automatic tracking.
 */
export function GlassReflection({
  children,
  className = '',
  opacity = 0.12,
}: {
  children?: ReactNode;
  className?: string;
  opacity?: number;
}) {
  const sheenRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = sheenRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(circle 220px at ${x}px ${y}px, rgba(255,255,255,${opacity}), transparent 60%)`;
  };

  const handleLeave = () => {
    const el = sheenRef.current;
    if (el) el.style.background = 'transparent';
  };

  if (children) {
    return (
      <div className={`relative overflow-hidden ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave}>
        <div ref={sheenRef} className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500" style={{ background: 'transparent' }} />
        {children}
      </div>
    );
  }

  return <div ref={sheenRef} className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ${className}`} style={{ background: 'transparent' }} />;
}

/**
 * Hook to attach sheen tracking to an existing mouse move handler.
 * Returns a ref to place on the sheen div, and a function to call on mousemove.
 */
export function useGlassSheen(opacity = 0.12) {
  const sheenRef = useRef<HTMLDivElement>(null);

  const track = (e: MouseEvent | React.MouseEvent, container: HTMLElement) => {
    const el = sheenRef.current;
    if (!el) return;
    const rect = container.getBoundingClientRect();
    const x = (e as MouseEvent).clientX - rect.left;
    const y = (e as MouseEvent).clientY - rect.top;
    el.style.background = `radial-gradient(circle 220px at ${x}px ${y}px, rgba(255,255,255,${opacity}), transparent 60%)`;
  };

  const clear = () => {
    const el = sheenRef.current;
    if (el) el.style.background = 'transparent';
  };

  return { sheenRef, track, clear };
}
