'use client';

import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const socials = [
  { icon: Github, href: 'https://github.com/paramjoshi0702-jpg', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:paramjoshi0702@gmail.com', label: 'Email' },
];

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="font-display text-2xl font-bold text-gradient">PJ</div>
            <div>
              <div className="font-medium text-sm">Param Joshi</div>
              <div className="text-xs text-muted-foreground">AI Enthusiast & Software Developer</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                whileHover={{ y: -4 }}
                className="p-2.5 rounded-xl glass hover:bg-white/10 transition-colors"
                aria-label={s.label}
              >
                <s.icon size={18} className="text-muted-foreground hover:text-foreground transition-colors" />
              </motion.a>
            ))}
          </div>

          <button
            onClick={scrollTop}
            className="p-3 rounded-xl glass hover:bg-white/10 transition-colors group"
            aria-label="Back to top"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            Designed and Developed by <span className="text-foreground font-medium">Param Joshi</span>
            <Heart size={12} className="text-purple-400 fill-purple-400" />
          </p>
          <p>© 2026 Param Joshi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
