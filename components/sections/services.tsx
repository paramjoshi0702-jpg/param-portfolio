'use client';

import { motion } from 'framer-motion';
import { Code2, Layout, Brain, Smartphone, Palette, Lightbulb } from 'lucide-react';

const services = [
  { icon: Code2, title: 'Web Development', desc: 'Building modern, performant websites with clean, maintainable code.' },
  { icon: Layout, title: 'Frontend Development', desc: 'Crafting pixel-perfect, animated UIs with React and Tailwind.' },
  { icon: Brain, title: 'AI Learning', desc: 'Exploring machine learning and integrating AI into real applications.' },
  { icon: Smartphone, title: 'Responsive Websites', desc: 'Delivering flawless experiences across every device and screen.' },
  { icon: Palette, title: 'UI Design', desc: 'Designing intuitive, beautiful interfaces with a premium feel.' },
  { icon: Lightbulb, title: 'Problem Solving', desc: 'Breaking down complex problems into elegant, working solutions.' },
];

export function Services() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-gradient-purple tracking-widest">SERVICES</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold">
            What I <span className="text-gradient">Offer</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-strong rounded-3xl p-6 glow-border hover:glow-purple transition-shadow group"
            >
              <div className="p-3 rounded-2xl bg-purple-500/10 inline-block mb-4 group-hover:scale-110 transition-transform">
                <s.icon className="text-gradient-purple" size={26} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
