'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, GitBranch, Sparkles } from 'lucide-react';

type Skill = { name: string; level: number; tag?: string };

const groups: { title: string; icon: typeof Code2; skills: Skill[] }[] = [
  {
    title: 'Programming',
    icon: Code2,
    skills: [
      { name: 'Python', level: 80 },
      { name: 'Java', level: 45, tag: 'Learning' },
      { name: 'C Language', level: 70 },
      { name: 'C++', level: 40, tag: 'Learning' },
      { name: 'HTML5', level: 85 },
      { name: 'CSS3', level: 80 },
      { name: 'JavaScript', level: 50, tag: 'Learning' },
    ],
  },
  {
    title: 'Version Control',
    icon: GitBranch,
    skills: [
      { name: 'Git', level: 70 },
      { name: 'GitHub', level: 75 },
    ],
  },
  {
    title: 'Other',
    icon: Sparkles,
    skills: [
      { name: 'Artificial Intelligence', level: 55 },
      { name: 'Problem Solving', level: 75 },
      { name: 'Responsive Web Design', level: 80 },
      { name: 'Software Development', level: 60 },
      { name: 'Learning DSA', level: 50, tag: 'Learning' },
    ],
  },
];

function ProgressBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2">
          {skill.name}
          {skill.tag && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {skill.tag}
            </span>
          )}
        </span>
        <span className="text-muted-foreground font-mono text-xs">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        >
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
        </motion.div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-xs md:text-sm font-mono text-gradient-purple tracking-widest">02 / SKILLS</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl font-bold">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A growing toolkit of languages, tools, and concepts I&apos;m actively mastering.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.15 }}
              className="glass-strong rounded-3xl p-5 md:p-6 glow-border hover:glow-purple transition-shadow group"
            >
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <div className="p-2 md:p-2.5 rounded-xl bg-purple-500/10 group-hover:scale-110 transition-transform">
                  <g.icon className="text-gradient-purple" size={20} />
                </div>
                <h3 className="font-display text-lg md:text-xl font-semibold">{g.title}</h3>
              </div>
              <div className="space-y-4 md:space-y-5">
                {g.skills.map((s, i) => (
                  <ProgressBar key={s.name} skill={s} delay={i * 0.08} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
