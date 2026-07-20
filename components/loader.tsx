'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            onComplete();
          }, 500);
          return 100;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  const pct = Math.min(Math.floor(progress), 100);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Sweep panel behind for layered exit */}
          <motion.div
            className="absolute inset-0 bg-background"
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
          />

          <div className="relative flex flex-col items-center">
            {/* Rotating ring around monogram */}
            <motion.div
              className="absolute -inset-12 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, rgba(124,58,237,0.6) 25%, transparent 50%, rgba(37,99,235,0.6) 75%, transparent 100%)',
                filter: 'blur(20px)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Monogram */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-6xl md:text-8xl font-display font-bold text-gradient"
            >
              PJ
            </motion.div>

            {/* Progress ring (SVG) */}
            <svg className="absolute -inset-8 w-[calc(100%+64px)] h-[calc(100%+64px)] -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#loader-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 54}
                strokeDashoffset={2 * Math.PI * 54 * (1 - pct / 100)}
                style={{ transition: 'stroke-dashoffset 0.2s ease-out' }}
              />
              <defs>
                <linearGradient id="loader-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Progress bar */}
          <div className="mt-12 w-56 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }}
              animate={{ width: `${pct}%` }}
            />
          </div>

          <motion.p
            className="mt-4 text-sm text-muted-foreground font-mono tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {pct}% — Loading experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
