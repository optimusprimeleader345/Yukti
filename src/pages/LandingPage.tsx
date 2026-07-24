import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { About } from '@/components/sections/About';
import { Testimonial } from '@/components/sections/Testimonial';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/sections/Footer';

export const LandingPage: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Features />
      <About />
      <Testimonial />
      <FAQ />
    </main>
    <Footer />
  </>
);
