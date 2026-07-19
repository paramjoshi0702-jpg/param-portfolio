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
          }, 400);
          return 100;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="text-6xl md:text-8xl font-display font-bold text-gradient">PJ</div>
            <motion.div
              className="absolute -inset-8 rounded-full blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)' }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div className="mt-10 w-56 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <motion.p
            className="mt-4 text-sm text-muted-foreground font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.min(Math.floor(progress), 100)}% — Loading experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
