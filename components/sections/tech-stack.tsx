'use client';

import { motion } from 'framer-motion';

const tech = [
  { name: 'Python', emoji: '🐍', color: 'from-blue-500 to-yellow-400' },
  { name: 'Java', emoji: '☕', color: 'from-orange-500 to-red-500' },
  { name: 'C', emoji: '🔵', color: 'from-blue-600 to-cyan-500' },
  { name: 'C++', emoji: '➕', color: 'from-blue-500 to-purple-500' },
  { name: 'HTML', emoji: '🌐', color: 'from-orange-500 to-red-500' },
  { name: 'CSS', emoji: '🎨', color: 'from-blue-500 to-cyan-400' },
  { name: 'JavaScript', emoji: '⚡', color: 'from-yellow-400 to-amber-500' },
  { name: 'Git', emoji: '🌿', color: 'from-orange-600 to-red-600' },
  { name: 'GitHub', emoji: '🐙', color: 'from-gray-600 to-purple-500' },
  { name: 'VS Code', emoji: '📘', color: 'from-blue-500 to-indigo-500' },
  { name: 'Figma', emoji: '🎯', color: 'from-pink-500 to-purple-500' },
  { name: 'Linux', emoji: '🐧', color: 'from-gray-700 to-yellow-500' },
  { name: 'AI', emoji: '🤖', color: 'from-purple-500 to-blue-500' },
  { name: 'OpenAI', emoji: '✨', color: 'from-emerald-500 to-teal-500' },
  { name: 'Responsive', emoji: '📱', color: 'from-cyan-500 to-blue-500' },
];

export function TechStack() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono text-gradient-purple tracking-widest">TECH STACK</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">
            Tools I <span className="text-gradient">Use</span>
          </h2>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="flex gap-4 animate-marquee" style={{ width: 'max-content' }}>
            {[...tech, ...tech].map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 glass rounded-2xl px-6 py-5 flex items-center gap-3 hover:bg-white/10 transition-colors group"
              >
                <span className="text-3xl group-hover:scale-125 transition-transform">{t.emoji}</span>
                <span className="font-medium whitespace-nowrap">{t.name}</span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
