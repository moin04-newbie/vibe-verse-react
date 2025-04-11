
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Text reveal animation for CTA section
    ScrollTrigger.create({
      trigger: ".cta-section",
      start: "top 70%",
      onEnter: () => {
        gsap.to(".cta-text", {
          backgroundSize: "100%",
          duration: 1,
          ease: "power4.out"
        });
        gsap.from(".cta-button", {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "back.out(1.7)"
        });
      },
      // Cleanup function
      onLeave: () => {},
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section className="py-16 bg-gradient-to-r from-viber-pastel-pink to-viber-pastel-blue cta-section">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="max-w-3xl mx-auto text-center text-gray-800">
          <h2 
            className="text-3xl font-bold mb-6 cta-text"
            style={{ 
              backgroundImage: 'linear-gradient(to right, #8B5CF6 0%, #EC4899 100%)',
              backgroundSize: '0%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Ready to experience a new way to chat?
          </h2>
          <p className="mb-8 text-gray-600">
            Join the VIBER community and start expressing yourself in ways traditional messaging apps don't allow.
          </p>
          <motion.button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 rounded-full font-medium bg-white text-viber-purple shadow-lg hover:shadow-xl hover:scale-105 transition-all cta-button flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Open VIBER Now</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
