import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import VibeMeter from '../components/VibeMeter';
import { moods } from '../lib/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Card, CardContent } from "../components/ui/card";

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
  const testimonialsRef = useRef(null);

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
    
    // Testimonials animation
    gsap.from(testimonialsRef.current, {
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
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
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Vibe Check",
              description: "Share your mood with animated emoji indicators that let friends know your state of mind.",
              icon: "🍃",
              color: "bg-emerald-400",
              details: "The Vibe Check feature uses AI to analyze your messages and suggest mood indicators. Your friends can see your vibe in real-time, making conversations more authentic and empathetic."
            },
            {
              title: "Status Builder",
              description: "Create custom statuses with our drag-and-drop editor and emoji keyboard.",
              icon: "✨",
              color: "bg-viber-purple",
              details: "Combine text, emojis, and even animated GIFs to create unique status messages that truly express how you're feeling. Schedule status changes to automatically update based on your calendar."
            },
            {
              title: "AI Summaries",
              description: "Get intelligent insights about your conversations with our built-in AI assistant.",
              icon: "🤖",
              color: "bg-viber-blue",
              details: "Our AI assistant analyzes conversation patterns to highlight important topics, suggest follow-ups, and even recommend when to check in with friends who might need support."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="viber-card relative overflow-hidden"
              ref={el => featureCardsRef.current[index] = el}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center text-white text-2xl mb-4`}>
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

        {/* Testimonial Carousel */}
        <div className="mb-16" ref={testimonialsRef}>
          <h3 className="text-2xl font-bold text-center mb-8">What our users are saying</h3>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {[
                {
                  quote: "VIBER has transformed how I communicate with my friends. The mood indicators make it so much easier to understand the tone of messages!",
                  name: "Sarah K.",
                  title: "Marketing Director",
                  avatar: "https://i.pravatar.cc/100?img=1"
                },
                {
                  quote: "The Status Builder is incredibly creative. I love how I can express exactly what I'm feeling or doing in such a visual way.",
                  name: "Marcus T.",
                  title: "Graphic Designer",
                  avatar: "https://i.pravatar.cc/100?img=2"
                },
                {
                  quote: "The AI conversation summaries have been a game-changer for keeping track of important details in my work chats.",
                  name: "Priya M.",
                  title: "Project Manager",
                  avatar: "https://i.pravatar.cc/100?img=3"
                },
                {
                  quote: "I've never felt so understood in a chat app before. The vibe check feature helps my friends know when I need support without having to explicitly ask.",
                  name: "Jordan L.",
                  title: "Student",
                  avatar: "https://i.pravatar.cc/100?img=4"
                },
                {
                  quote: "As someone who works remotely, VIBER helps me stay connected with my team in a more meaningful way than regular messaging apps.",
                  name: "Alex R.",
                  title: "Software Developer",
                  avatar: "https://i.pravatar.cc/100?img=5"
                }
              ].map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col gap-4 p-6">
                        <div className="flex gap-4 items-center">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="rounded-full h-12 w-12 object-cover"
                          />
                          <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500">{testimonial.title}</p>
                          </div>
                        </div>
                        <blockquote className="text-sm text-gray-600 italic">"{testimonial.quote}"</blockquote>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-center mt-4">
              <CarouselPrevious className="static translate-y-0 -translate-x-4" />
              <CarouselNext className="static translate-y-0 translate-x-4" />
            </div>
          </Carousel>
        </div>

        {/* Use Cases with Images */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">See it in action</h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Person using VIBER" 
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-xl font-bold">Stay connected on the go</h4>
              <p>VIBER adapts to your lifestyle, whether you're working from a coffee shop, commuting, or relaxing at home. Share your context with friends and colleagues to set the right expectations for your responses.</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-viber-green flex items-center justify-center text-white mr-2">✓</div>
                  <span>Quick mood updates</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-viber-green flex items-center justify-center text-white mr-2">✓</div>
                  <span>Location-aware status suggestions</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-viber-green flex items-center justify-center text-white mr-2">✓</div>
                  <span>Customize notification settings based on your vibe</span>
                </li>
              </ul>
            </motion.div>
          </div>
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
