'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Linkedin, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useMagnetic } from '@/hooks/use-magnetic';
import { useMouseParallax } from '@/hooks/use-mouse-parallax';

const roles = [
  'Artificial Intelligence',
  'Java Developer',
  'Python Developer',
  'Problem Solver',
  'Creative Thinker',
  'Tech Explorer',
];

function useTyping() {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[idx % roles.length];
    const speed = deleting ? 45 : 90;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1600);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === '') { setDeleting(false); setIdx((i) => i + 1); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, idx]);

  return text;
}

const GITHUB = 'https://github.com/paramjoshi0702-jpg';

const headingVariants = {
  hidden: { y: 40, opacity: 0, filter: 'blur(10px)' },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const typed = useTyping();
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const btn1Ref = useMagnetic<HTMLButtonElement>(0.25);
  const btn2Ref = useMagnetic<HTMLButtonElement>(0.2);
  const photoRef = useMouseParallax<HTMLDivElement>(0.015);
  const badge1Ref = useMouseParallax<HTMLDivElement>(0.03);
  const badge2Ref = useMouseParallax<HTMLDivElement>(0.025);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Text side ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground mb-6"
            >
              <Sparkles size={14} className="text-purple-400 animate-pulse-glow" />
              Available for opportunities
            </motion.div>

            <h1 className="font-display text-4xl xs:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              <motion.span
                className="block text-foreground/90 overflow-hidden"
                custom={0}
                variants={headingVariants}
                initial="hidden"
                animate="visible"
              >
                Hi,
              </motion.span>
              <motion.span
                className="block text-gradient overflow-hidden"
                custom={1}
                variants={headingVariants}
                initial="hidden"
                animate="visible"
              >
                I&apos;m Param Joshi
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 text-lg xs:text-xl md:text-2xl text-muted-foreground font-light space-y-0.5"
            >
              <span className="block">AI Enthusiast</span>
              <span className="block">Software Developer</span>
              <span className="block text-gradient-purple font-medium">Future AI Engineer</span>
            </motion.div>

            {/* Typing line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 h-9 text-base xs:text-lg md:text-xl font-mono"
            >
              <span className="text-muted-foreground">{'> '}</span>
              <span className="text-gradient-purple font-semibold">{typed}</span>
              <span className="inline-block w-[2px] h-5 bg-purple-400 ml-1 animate-pulse-glow align-middle" />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
              className="mt-8 flex flex-wrap gap-3 sm:gap-4"
            >
              <button
                ref={btn1Ref}
                onClick={() => scrollTo('#projects')}
                className="group relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-white overflow-hidden glow-purple text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <button
                ref={btn2Ref}
                onClick={() => scrollTo('#contact')}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium glass hover:bg-white/10 transition-colors text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-8 flex items-center gap-3"
            >
              {[
                { icon: Github, href: GITHUB, label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/param-joshi-a10360380?utm_source=share_via&utm_content=profile&utm_medium=member_android', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:paramjoshi0702@gmail.com', label: 'Email' },
              ].map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl glass hover:bg-white/10 transition-colors"
                  aria-label={s.label}
                >
                  <s.icon size={18} className="text-muted-foreground" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Photo side ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div ref={photoRef} className="relative w-[220px] h-[220px] xs:w-[260px] xs:h-[260px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] lg:w-[440px] lg:h-[440px]">
              {/* Rotating conic glow */}
              <div
                className="absolute -inset-6 rounded-full animate-spin-slow pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0%, rgba(124,58,237,0.55) 25%, transparent 50%, rgba(37,99,235,0.55) 75%, transparent 100%)',
                  filter: 'blur(22px)',
                }}
              />

              {/* Soft inner glow ring */}
              <div
                className="absolute -inset-2 rounded-full pointer-events-none animate-pulse-glow"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)' }}
              />

              {/* Photo frame */}
              <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-purple-500/40 shadow-[0_0_60px_rgba(124,58,237,0.4)]">
                <Image
                  src="/images/param.jpg"
                  alt="Param Joshi"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 400px) 220px, (max-width: 640px) 260px, (max-width: 768px) 320px, (max-width: 1024px) 400px, 440px"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-purple-900/40 to-transparent" />
              </div>

              {/* Floating badge — top right */}
              <motion.div
                ref={badge1Ref}
                className="absolute -top-2 right-2 sm:-top-3 sm:-right-3 md:top-2 md:-right-6 glass rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-medium shadow-lg z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-gradient-purple font-semibold">AI</span> Student
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                ref={badge2Ref}
                className="absolute -bottom-2 left-2 sm:-bottom-3 sm:-left-3 md:bottom-2 md:-left-6 glass rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-medium shadow-lg z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-gradient-purple font-semibold">CSE</span> @ ITM SLS
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
