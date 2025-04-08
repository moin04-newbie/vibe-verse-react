import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import VibeMeter from '../components/VibeMeter';
import { moods } from '../lib/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Index = () => {
  const navigate = useNavigate();
  const [isHoveringPhone, setIsHoveringPhone] = useState(false);
  
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const phoneRef = useRef(null);
  const featuresRef = useRef(null);
  const featureCardsRef = useRef([]);
  
  // Animation variants for staggered children animations (keep for framer-motion)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100 
      } 
    }
  };

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
    
    // Feature cards animation
    gsap.from(featureCardsRef.current, {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power3.out"
    });
    
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
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-50">
      {/* Header */}
      <header className="container mx-auto py-4 px-4 lg:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="mr-2 text-3xl"
            >
              💬
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-viber-gradient"
            >
              VIBER
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="viber-button"
            >
              Open App
            </motion.button>
          </motion.div>
        </div>
      </header>
      
      {/* Hero Section with GSAP Animations */}
      <section ref={heroRef} className="container mx-auto py-16 px-4 lg:px-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Chat with <span className="bg-clip-text text-transparent bg-viber-gradient">
                Vibes
              </span>, not just messages
            </h2>
            <p ref={subtitleRef} className="text-lg text-gray-600 mb-8">
              Express your mood, share your status, and get AI-powered conversation insights with the next-gen messaging app.
            </p>
            <div ref={ctaRef} className="flex space-x-4">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.5)" 
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="viber-button"
              >
                Get Started
              </motion.button>
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(139, 92, 246, 0.1)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full font-medium border-2 border-viber-purple text-viber-purple hover:bg-viber-purple/5 transition-colors"
              >
                Learn More
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
                className="rounded-3xl overflow-hidden border-8 border-black relative bg-black"
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
                <div className="h-[600px] bg-viber-gradient overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/300" 
                    alt="Chat Preview" 
                    className="w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
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
                    <motion.h3 
                      className="text-2xl font-bold mb-3"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      VIBER
                    </motion.h3>
                    <motion.p 
                      className="text-white/70 text-sm"
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
              className="absolute top-1/4 -left-10 w-20 h-20 bg-viber-green rounded-full opacity-20 blur-xl"
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
              className="absolute bottom-1/4 -right-10 w-32 h-32 bg-viber-pink rounded-full opacity-20 blur-xl"
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
              className="absolute top-1/2 right-1/4 w-16 h-16 bg-viber-blue rounded-full opacity-10 blur-lg"
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
      
      {/* Features Section with GSAP ScrollTrigger */}
      <section ref={featuresRef} className="container mx-auto py-16 px-4 lg:px-0">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Express yourself like never before
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Vibe Check",
              description: "Share your mood with animated emoji indicators that let friends know your state of mind.",
              icon: "🍃",
              color: "bg-emerald-400"
            },
            {
              title: "Status Builder",
              description: "Create custom statuses with our drag-and-drop editor and emoji keyboard.",
              icon: "✨",
              color: "bg-viber-purple"
            },
            {
              title: "AI Summaries",
              description: "Get intelligent insights about your conversations with our built-in AI assistant.",
              icon: "🤖",
              color: "bg-viber-blue"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="viber-card"
              ref={el => featureCardsRef.current[index] = el}
            >
              <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center text-white text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section with GSAP text reveal animation */}
      <section className="py-16 bg-viber-gradient cta-section">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 
              className="text-3xl font-bold mb-6 cta-text"
              style={{ 
                backgroundImage: 'linear-gradient(to right, white 0%, white 100%)',
                backgroundSize: '0%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Ready to experience a new way to chat?
            </h2>
            <p className="mb-8 text-white/80">
              Join the VIBER community and start expressing yourself in ways traditional messaging apps don't allow.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 rounded-full font-medium bg-white text-viber-purple shadow-lg hover:shadow-xl hover:scale-105 transition-all cta-button"
            >
              Open VIBER Now
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="container mx-auto py-8 px-4 lg:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-xl mr-2">💬</span>
            <h2 className="font-bold">VIBER</h2>
          </div>
          <p className="text-sm text-gray-500">© 2025 VIBER. All rights reserved. Frontend-only demo.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
