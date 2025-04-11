
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Sparkles, MessageSquareHeart } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const featuresRef = useRef(null);
  const featureCardsRef = useRef([]);
  
  // GSAP animations
  useEffect(() => {
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
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const features = [
    {
      title: "Vibe Check",
      description: "Share your mood with animated emoji indicators that let friends know your state of mind.",
      icon: <Palette className="h-6 w-6 text-white" />,
      color: "bg-viber-pastel-green",
      details: "The Vibe Check feature uses AI to analyze your messages and suggest mood indicators. Your friends can see your vibe in real-time, making conversations more authentic and empathetic."
    },
    {
      title: "Status Builder",
      description: "Create custom statuses with our drag-and-drop editor and emoji keyboard.",
      icon: <Sparkles className="h-6 w-6 text-white" />,
      color: "bg-viber-pastel-purple",
      details: "Combine text, emojis, and even animated GIFs to create unique status messages that truly express how you're feeling. Schedule status changes to automatically update based on your calendar."
    },
    {
      title: "AI Summaries",
      description: "Get intelligent insights about your conversations with our built-in AI assistant.",
      icon: <MessageSquareHeart className="h-6 w-6 text-white" />,
      color: "bg-viber-pastel-pink",
      details: "Our AI assistant analyzes conversation patterns to highlight important topics, suggest follow-ups, and even recommend when to check in with friends who might need support."
    }
  ];
  
  return (
    <section ref={featuresRef} className="container mx-auto py-16 px-4 lg:px-0">
      <motion.h2 
        className="text-3xl font-bold text-center mb-12 genz-gradient-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Express yourself like never before
      </motion.h2>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="genz-card overflow-hidden"
            ref={el => featureCardsRef.current[index] = el}
            whileHover={{ 
              y: -10, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mb-4`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="text-sm text-gray-500 border-t border-gray-100 pt-4 mt-2"
            >
              {feature.details}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
