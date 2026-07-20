'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Brain, Code2, FolderGit2, Compass } from 'lucide-react';

const achievements = [
  { icon: RefreshCw, title: 'Continuous Learner', desc: 'Always expanding my skill set across languages and domains.' },
  { icon: Brain, title: 'AI Enthusiast', desc: 'Deeply curious about artificial intelligence and its real-world impact.' },
  { icon: Code2, title: 'Programming Journey', desc: 'Progressing from C fundamentals to modern development workflows.' },
  { icon: FolderGit2, title: 'Project Builder', desc: 'Turning ideas into working applications, one project at a time.' },
  { icon: Compass, title: 'Technology Explorer', desc: 'Exploring new tools, frameworks, and paradigms constantly.' },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-gradient-purple tracking-widest">08 / HIGHLIGHTS</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold">
            My <span className="text-gradient">Highlights</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="glass-strong rounded-3xl p-6 text-center glow-border hover:glow-purple transition-shadow group"
            >
              <div className="mx-auto w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <a.icon className="text-gradient-purple" size={26} />
              </div>
              <h3 className="font-display font-semibold mb-2 text-sm">{a.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
