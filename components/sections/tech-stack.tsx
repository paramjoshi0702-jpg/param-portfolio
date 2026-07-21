'use client';

import { motion } from 'framer-motion';
import {
  Code2, Coffee, FileCode2, Plus, Globe, Palette,
  Zap, GitBranch, Github, Monitor, Figma, Terminal,
  Bot, Sparkles, Smartphone,
} from 'lucide-react';

const tech = [
  { name: 'Python', icon: Code2, color: 'text-blue-400' },
  { name: 'Java', icon: Coffee, color: 'text-orange-400' },
  { name: 'C', icon: FileCode2, color: 'text-cyan-400' },
  { name: 'C++', icon: Plus, color: 'text-purple-400' },
  { name: 'HTML', icon: Globe, color: 'text-orange-500' },
  { name: 'CSS', icon: Palette, color: 'text-blue-500' },
  { name: 'JavaScript', icon: Zap, color: 'text-yellow-400' },
  { name: 'Git', icon: GitBranch, color: 'text-orange-600' },
  { name: 'GitHub', icon: Github, color: 'text-gray-300' },
  { name: 'VS Code', icon: Monitor, color: 'text-blue-400' },
  { name: 'Figma', icon: Figma, color: 'text-pink-400' },
  { name: 'Linux', icon: Terminal, color: 'text-yellow-500' },
  { name: 'AI', icon: Bot, color: 'text-purple-400' },
  { name: 'OpenAI', icon: Sparkles, color: 'text-emerald-400' },
  { name: 'Responsive', icon: Smartphone, color: 'text-cyan-400' },
];

export function TechStack() {
  return (
    <section className="relative py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="text-xs md:text-sm font-mono text-gradient-purple tracking-widest">03 / TECH STACK</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">
            Tools I <span className="text-gradient">Use</span>
          </h2>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="flex gap-3 md:gap-4 animate-marquee" style={{ width: 'max-content' }}>
            {[...tech, ...tech].map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="flex-shrink-0 glass rounded-2xl px-4 py-3 md:px-6 md:py-5 flex items-center gap-2.5 md:gap-3 hover:bg-white/10 transition-colors group"
              >
                <t.icon className={`${t.color} group-hover:scale-125 transition-transform`} size={24} strokeWidth={1.5} />
                <span className="font-medium whitespace-nowrap text-xs md:text-base">{t.name}</span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
