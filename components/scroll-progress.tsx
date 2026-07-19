'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #7c3aed, #2563eb, #8b5cf6)',
        boxShadow: '0 0 12px rgba(124, 58, 237, 0.7)',
      }}
    />
  );
}
