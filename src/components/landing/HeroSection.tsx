
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import VibeMeter from '../VibeMeter';
import { moods } from '../../lib/mockData';
import { Sparkles, ArrowRight } from "lucide-react";
import gsap from 'gsap';

const HeroSection = () => {
  const navigate = useNavigate();
  const [isHoveringPhone, setIsHoveringPhone] = useState(false);
  
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const phoneRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    // Hero section entrance animation
    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      duration: 1.2,
      y: 50,
      opacity: 0,
      ease: "power3.out"
    })
    .from(subtitleRef.current, {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power3.out"
    }, "-=0.6")
    .from(ctaRef.current.children, {
      duration: 0.6,
      y: 20,
      opacity: 0,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .from(phoneRef.current, {
      duration: 1.5,
      scale: 0.8,
      y: 30,
      opacity: 0,
      rotate: -5,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.8");
  }, []);
  
  return (
    <section ref={heroRef} className="container mx-auto py-16 px-4 lg:px-0">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Chat with <span className="genz-gradient-text">
              Vibes
            </span>, not just messages
          </h2>
          <p ref={subtitleRef} className="text-lg text-gray-600 mb-8">
            Express your mood, share your status, and get AI-powered conversation insights with the next-gen messaging app.
          </p>
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.5)" 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="pastel-button flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(139, 92, 246, 0.1)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full font-medium border-2 border-viber-pastel-purple text-viber-purple hover:bg-viber-pastel-purple/10 transition-colors"
            >
              <span>Learn More</span>
            </motion.button>
          </div>
        </div>
        
        <div ref={phoneRef} className="relative">
          <motion.div 
            className="relative z-10 max-w-xs mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: isHoveringPhone ? -10 : 0,
            }}
            transition={{ 
              duration: 0.8,
              type: "spring", 
              stiffness: 300, 
              damping: 15 
            }}
            onHoverStart={() => setIsHoveringPhone(true)}
            onHoverEnd={() => setIsHoveringPhone(false)}
          >
            <motion.div 
              className="rounded-3xl overflow-hidden border-8 border-black relative bg-black shadow-2xl"
              initial={{ rotate: -5 }}
              animate={{ 
                rotate: isHoveringPhone ? 0 : [-2, 2, -2],
                y: isHoveringPhone ? 0 : [0, -5, 0]
              }}
              transition={{ 
                rotate: { duration: 6, repeat: Infinity, repeatType: "reverse" },
                y: { duration: 3, repeat: Infinity, repeatType: "reverse" } 
              }}
            >
              <div className="absolute top-0 w-1/3 h-6 bg-black left-1/3 rounded-b-xl z-10"></div>
              <div className="h-[600px] bg-gradient-to-br from-viber-pastel-pink via-viber-pastel-purple to-viber-pastel-blue overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
                  alt="Chat Preview" 
                  className="w-full h-full object-cover opacity-10"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-foreground">
                  <motion.div 
                    className="mb-8"
                    animate={{ 
                      rotateZ: [0, 10, 0, -10, 0],
                      scale: [1, 1.1, 1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <VibeMeter initialMood={moods[0]} />
                  </motion.div>
                  <motion.div
                    className="glass-card px-6 py-3 mb-4 flex items-center gap-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="h-5 w-5 text-viber-pink" />
                    <span className="text-lg font-bold">VIBER</span>
                  </motion.div>
                  <motion.p 
                    className="text-gray-700 text-sm px-4 py-2 rounded-full backdrop-blur-sm bg-white/30 border border-white/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Next-gen messaging
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Enhanced decorative elements with GSAP-powered parallax effect */}
          <motion.div
            className="absolute top-1/4 -left-10 w-20 h-20 bg-viber-pastel-green rounded-full opacity-20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -20, 0],
              y: [0, -15, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-10 w-32 h-32 bg-viber-pastel-pink rounded-full opacity-20 blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              y: [0, -30, 0],
              x: [0, 20, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "mirror" 
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-16 h-16 bg-viber-pastel-blue rounded-full opacity-20 blur-lg"
            animate={{
              scale: [1, 1.5, 1],
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity,
              repeatType: "mirror" 
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
