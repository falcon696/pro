'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Technologies from '@/components/Technologies';
import Projects from '@/components/Projects';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Navigation />
      <Hero />
      <About />
      <Technologies />
      <Projects />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
