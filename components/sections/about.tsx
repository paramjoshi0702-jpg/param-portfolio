'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Code2, Rocket, Layers, RefreshCw } from 'lucide-react';

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * to));
      if (p < 1) requestAnimationFrame(step);
      else setValue(to);
    };
    requestAnimationFrame(step);
  }, [inView, to]);

  return <span ref={ref}>{value}{suffix}</span>;
}

const stats = [
  { icon: Code2,     label: 'Programming Languages', value: 6,   suffix: '+' },
  { icon: Rocket,    label: 'Projects Built',         value: 8,   suffix: '+' },
  { icon: Layers,    label: 'Technologies Explored',  value: 15,  suffix: '+' },
  { icon: RefreshCw, label: 'Continuous Learner',     value: 100, suffix: '%' },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-gradient-purple tracking-widest">01 / ABOUT</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Photo side ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Outer glow blob */}
            <div
              className="absolute -inset-8 rounded-3xl blur-3xl opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 40% 60%, #7c3aed, #2563eb, transparent 70%)' }}
            />

            <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden glow-border shadow-2xl shadow-purple-900/30">
              {/* Actual photo */}
              <Image
                src="/images/param.jpg"
                alt="Param Joshi"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 448px"
              />

              {/* Gradient tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05030f]/70 via-transparent to-transparent" />

              {/* Bottom info pill */}
              <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-4">
                <div className="text-sm text-muted-foreground">Computer Science Engineering</div>
                <div className="text-base font-semibold text-gradient-purple">AI Specialization — ITM SLS</div>
              </div>

              {/* Status badge */}
              <div className="absolute top-5 right-5 glass rounded-full px-3 py-1.5 text-xs">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse-glow" />
                Currently Learning
              </div>
            </div>
          </motion.div>

          {/* ── Text side ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-5">
              Passionate about <span className="text-gradient">AI</span> &amp; Software Development
            </h3>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I am{' '}
                <span className="text-foreground font-medium">Param Sandeepbhai Joshi</span>, a passionate
                Computer Science Engineering student specializing in{' '}
                <span className="text-gradient-purple font-medium">Artificial Intelligence</span> at ITM
                SLS Baroda University.
              </p>
              <p>
                My journey into software development began after joining university, where I started
                learning programming and web development from scratch. I learned C programming, Python,
                HTML, and CSS, and gradually began building real-world projects to strengthen my practical
                skills.
              </p>
              <p>
                Currently, I am learning{' '}
                <span className="text-foreground font-medium">Java</span>,{' '}
                <span className="text-foreground font-medium">C++</span>, Git, and GitHub while
                continuously improving my understanding of software development, Artificial Intelligence,
                problem-solving, and modern technologies.
              </p>
              <p className="text-foreground/75 italic border-l-2 border-purple-500 pl-4">
                I enjoy exploring new technologies, creating meaningful projects, and continuously
                challenging myself to become a better developer. My long-term goal is to become a highly
                skilled AI Engineer and Full Stack Software Developer capable of building innovative and
                impactful digital solutions.
              </p>
            </div>

            {/* Stats grid */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-4 hover:bg-white/[0.07] transition-colors group"
                >
                  <s.icon
                    className="text-purple-400 mb-2 group-hover:scale-110 transition-transform"
                    size={22}
                  />
                  <div className="font-display text-3xl font-bold text-gradient">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
