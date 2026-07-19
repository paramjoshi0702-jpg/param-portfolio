'use client';

import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Code2, Globe, Layout, Briefcase, User, Layers, Brain, Target, Rocket } from 'lucide-react';

const journey = [
  { icon: GraduationCap, title: 'Joined ITM SLS Baroda University', desc: 'Began my academic journey in Computer Science Engineering.' },
  { icon: BookOpen, title: 'Pursuing B.Tech in CSE (AI)', desc: 'Started B.Tech in Computer Science Engineering with specialization in Artificial Intelligence.' },
  { icon: Code2, title: 'Started Learning C Programming', desc: 'Built my programming foundations with the C language.' },
  { icon: Code2, title: 'Learned Python Fundamentals', desc: 'Explored Python and its applications in AI and automation.' },
  { icon: Globe, title: 'Learned HTML5 & CSS3', desc: 'Stepped into web development with HTML5 and CSS3.' },
  { icon: Layout, title: 'Building Responsive Websites', desc: 'Started crafting responsive, mobile-friendly websites.' },
  { icon: Briefcase, title: 'LIC Agent Business Website', desc: 'Built my first real-world project — an LIC Agent Business Website for my mother.' },
  { icon: User, title: 'Personal Portfolio Website', desc: 'Designed and developed my personal portfolio to showcase my skills and projects.' },
  { icon: Layers, title: 'Learning Java, C++, Git & GitHub', desc: 'Currently learning Java, C++, Git, GitHub, and modern development practices.' },
  { icon: Brain, title: 'Exploring Artificial Intelligence', desc: 'Exploring AI and continuously building projects to sharpen my skills.' },
  { icon: Rocket, title: 'Future AI Engineer & Developer', desc: 'Working towards becoming a professional AI Engineer and Software Developer.' },
];

export function Journey() {
  return (
    <section id="journey" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-gradient-purple tracking-widest">04 / JOURNEY</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold">
            My <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-blue-500/0 md:-translate-x-1/2" />

          <div className="space-y-10">
            {journey.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex items-center gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 ring-4 ring-[var(--bg-solid)] shadow-[0_0_15px_rgba(124,58,237,0.7)]" />
                  </div>

                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="glass-strong rounded-2xl p-5 glow-border hover:glow-purple transition-shadow">
                      <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div className="p-2 rounded-xl bg-purple-500/10">
                          <item.icon className="text-purple-400" size={20} />
                        </div>
                        <h3 className="font-display font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
