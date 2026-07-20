'use client';

import { useState } from 'react';
import { ParticleBackground } from '@/components/particle-background';
import { AnimatedBlobs } from '@/components/animated-blobs';
import { AnimatedGradient } from '@/components/animated-gradient';
import { CustomCursor } from '@/components/custom-cursor';
import { ScrollProgress } from '@/components/scroll-progress';
import { Loader } from '@/components/loader';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { TechStack } from '@/components/sections/tech-stack';
import { Journey } from '@/components/sections/journey';
import { Projects } from '@/components/sections/projects';
import { Education } from '@/components/sections/education';
import { Services } from '@/components/sections/services';
import { Achievements } from '@/components/sections/achievements';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <CustomCursor />
      <ScrollProgress />
      <div className="noise" />
      <div className="fixed inset-0 aurora-bg pointer-events-none" style={{ zIndex: 0 }} />
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-40" style={{ zIndex: 0 }} />
      <AnimatedBlobs />
      <AnimatedGradient />
      <ParticleBackground />

      <div className="relative" style={{ zIndex: 2 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <TechStack />
          <Projects />
          <Journey />
          <Education />
          <Services />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
