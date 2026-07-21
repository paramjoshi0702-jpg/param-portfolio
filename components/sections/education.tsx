'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Brain, Sparkles } from 'lucide-react';

export function Education() {
  return (
    <section id="education" className="relative py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-xs md:text-sm font-mono text-gradient-purple tracking-widest">06 / EDUCATION</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative glass-strong rounded-3xl p-6 md:p-10 glow-border hover:glow-purple transition-shadow">
            <div className="absolute -top-6 left-6 md:left-8 p-3 md:p-4 rounded-2xl glass-strong glow-purple">
              <GraduationCap className="text-gradient-purple" size={32} />
            </div>

            <div className="mt-6">
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
                Current Student
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                ITM SLS Baroda University
              </h3>
              <p className="text-lg text-gradient-purple font-medium mb-4">
                Bachelor of Technology (B.Tech)
              </p>

              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Brain size={16} className="text-purple-400" />
                  Computer Science Engineering
                </p>
                <p className="flex items-center gap-2">
                  <Sparkles size={16} className="text-purple-400" />
                  Specialization in Artificial Intelligence
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-purple-400" />
                  Gujarat, India
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
