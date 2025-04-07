
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import VibeMeter from '../components/VibeMeter';
import { moods } from '../lib/mockData';

const Index = () => {
  const navigate = useNavigate();
  const [isHoveringPhone, setIsHoveringPhone] = useState(false);
  
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
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-viber-gradient">VIBER</h1>
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="viber-button"
            >
              Open App
            </motion.button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="container mx-auto py-16 px-4 lg:px-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Chat with <span className="bg-clip-text text-transparent bg-viber-gradient">Vibes</span>, not just messages
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Express your mood, share your status, and get AI-powered conversation insights with the next-gen messaging app.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="viber-button"
              >
                Get Started
              </motion.button>
              <button className="px-6 py-3 rounded-full font-medium border-2 border-viber-purple text-viber-purple hover:bg-viber-purple/5 transition-colors">
                Learn More
              </button>
            </motion.div>
          </div>
          
          <div className="relative">
            <motion.div 
              className="relative z-10 max-w-xs mx-auto"
              initial={{ y: 20 }}
              animate={{ y: isHoveringPhone ? -10 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              onHoverStart={() => setIsHoveringPhone(true)}
              onHoverEnd={() => setIsHoveringPhone(false)}
            >
              <div className="rounded-3xl overflow-hidden border-8 border-black relative bg-black">
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
                    <h3 className="text-2xl font-bold mb-3">VIBER</h3>
                    <p className="text-white/70 text-sm">Next-gen messaging</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute top-1/4 -left-10 w-20 h-20 bg-viber-green rounded-full opacity-20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-10 w-32 h-32 bg-viber-pink rounded-full opacity-20 blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                y: [0, -30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="container mx-auto py-16 px-4 lg:px-0">
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
            <motion.div
              key={index}
              className="viber-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center text-white text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-viber-gradient">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to experience a new way to chat?
            </motion.h2>
            <motion.p 
              className="mb-8 text-white/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join the VIBER community and start expressing yourself in ways traditional messaging apps don't allow.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="px-8 py-4 rounded-full font-medium bg-white text-viber-purple shadow-lg hover:shadow-xl transition-all"
            >
              Open VIBER Now
            </motion.button>
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
