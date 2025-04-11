
import React from 'react';
import { TextPlugin } from 'gsap/TextPlugin';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import the new components
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import AppFeaturesSection from '../components/landing/AppFeaturesSection';
import ShowcaseSection from '../components/landing/ShowcaseSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-viber-pastel-pink/30 via-viber-pastel-blue/20 to-viber-pastel-purple/30 overflow-x-hidden w-full">
      <Header />
      <main className="w-full">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <AppFeaturesSection />
        <ShowcaseSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
