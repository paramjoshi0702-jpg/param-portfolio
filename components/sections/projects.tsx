'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Github, ExternalLink, Briefcase, User, Monitor } from 'lucide-react';
import { useMagnetic } from '@/hooks/use-magnetic';

const GITHUB_BASE = 'https://github.com/paramjoshi0702-jpg';

const projects = [
  {
    title: 'LIC Agent Business Website',
    category: 'Business Website',
    icon: Briefcase,
    desc: 'I designed and developed a professional website for my mother, who is an LIC (Life Insurance Corporation) Agent. The website helps establish her online presence, allows potential clients to learn about LIC insurance plans, simplifies communication, and makes it easier for people to connect with her for financial and insurance services.',
    outcome: 'This project strengthened my frontend development skills while solving a real-world business problem.',
    features: [
      'Professional Business Website',
      'Responsive Design',
      'Contact Form',
      'Insurance Services Section',
      'Client Enquiry Form',
      'Mobile Friendly',
      'Clean UI',
      'SEO Friendly Layout',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    accent: '#2563eb',
    liveUrl: `${GITHUB_BASE}/lic-website`,
    githubUrl: `${GITHUB_BASE}/lic-website`,
    urlSlug: 'lic-website',
  },
  {
    title: 'Personal Portfolio Website',
    category: 'Portfolio Website',
    icon: User,
    desc: 'I designed and developed my personal portfolio website to showcase my skills, education, projects, learning journey, and passion for Artificial Intelligence and software development.',
    outcome: 'The website represents my growth as a Computer Science Engineering student specializing in Artificial Intelligence and serves as my professional online identity.',
    features: [
      'About Me',
      'Skills Section',
      'Education',
      'Learning Journey',
      'Projects Showcase',
      'Contact Section',
      'Responsive Design',
      'Interactive UI',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    gradient: 'from-purple-600 via-fuchsia-600 to-pink-600',
    accent: '#a855f7',
    liveUrl: `${GITHUB_BASE}/portfolio`,
    githubUrl: `${GITHUB_BASE}/portfolio`,
    urlSlug: 'portfolio',
  },
];

function LaptopMockup({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: 460 }}>
      {/* Screen */}
      <div className="relative rounded-t-xl p-2.5 glass-strong border-b-0" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))' }}>
        <div className="relative rounded-lg overflow-hidden aspect-[16/10] bg-[#0a0820]">
          {/* Browser bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-black/40 border-b border-white/5">
            <span className="w-2 h-2 rounded-full bg-red-400/70" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
            <span className="w-2 h-2 rounded-full bg-green-400/70" />
            <div className="ml-3 flex-1 h-4 rounded bg-white/5 flex items-center px-2">
              <span className="text-[8px] text-muted-foreground font-mono truncate">github.com/paramjoshi0702-jpg/{project.urlSlug}</span>
            </div>
          </div>
          {/* Mock content */}
          <div className={`relative h-full bg-gradient-to-br ${project.gradient} opacity-90`}>
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md mb-3">
                <project.icon className="text-white" size={28} />
              </div>
              <div className="text-white font-display font-bold text-lg leading-tight">{project.title}</div>
              <div className="text-white/70 text-[10px] mt-1 tracking-widest uppercase">{project.category}</div>
              <div className="mt-3 flex gap-1.5 flex-wrap justify-center max-w-[80%]">
                {project.tags.map((t) => (
                  <span key={t} className="text-[8px] px-2 py-0.5 rounded-full bg-white/15 text-white/90 backdrop-blur-sm">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Base */}
      <div className="relative h-3 mx-auto" style={{ width: '108%' }}>
        <div className="absolute inset-x-0 top-0 h-3 rounded-b-xl bg-gradient-to-b from-white/15 to-white/5" />
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-20 h-1.5 rounded-full bg-white/20" />
      </div>
    </div>
  );
}

function TiltCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  const layerX = useTransform(mx, [-0.5, 0.5], [-12, 12]);
  const layerY = useTransform(my, [-0.5, 0.5], [-8, 8]);
  const liveBtnRef = useMagnetic<HTMLAnchorElement>(0.2);
  const ghBtnRef = useMagnetic<HTMLAnchorElement>(0.2);
  const sheenRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    // Glass sheen tracking
    const sheen = sheenRef.current;
    if (sheen) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      sheen.style.background = `radial-gradient(circle 220px at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 60%)`;
    }
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
    const sheen = sheenRef.current;
    if (sheen) sheen.style.background = 'transparent';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className={`relative ${index % 2 === 1 ? 'lg:translate-y-16' : ''}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="glass-strong rounded-3xl p-6 md:p-8 glow-border hover:glow-purple transition-shadow group"
      >
        <div ref={sheenRef} className="pointer-events-none absolute inset-0 z-10 rounded-3xl transition-opacity duration-500" style={{ background: 'transparent' }} />
        <div className="relative z-20">
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-gradient-purple font-medium">
            <Monitor size={12} /> {project.category}
          </span>
          <span className="text-xs font-mono text-muted-foreground">0{index + 1}</span>
        </div>

        {/* Laptop mockup with parallax */}
        <motion.div style={{ x: layerX, y: layerY }} className="mb-6">
          <LaptopMockup project={project} />
        </motion.div>

        {/* Title */}
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 group-hover:text-gradient-purple transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{project.desc}</p>
        <p className="text-sm text-foreground/80 italic mb-5">{project.outcome}</p>

        {/* Features */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-gradient-purple uppercase tracking-wider mb-3">Key Features</div>
          <div className="grid grid-cols-2 gap-2">
            {project.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((t) => (
            <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-foreground">
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <a
            ref={liveBtnRef}
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-white transition-all hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
          >
            <ExternalLink size={15} /> View Project
          </a>
          <a
            ref={ghBtnRef}
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium glass hover:bg-white/10 transition-colors"
          >
            <Github size={15} /> GitHub
          </a>
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-gradient-purple tracking-widest">03 / PROJECTS</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Real-world projects I&apos;ve designed and built — each one a step forward in my journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {projects.map((p, i) => (
            <TiltCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
