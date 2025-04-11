
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquareHeart, ArrowRight, Moon } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="container mx-auto py-6 px-4 lg:px-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="mr-2 text-3xl"
          >
            <MessageSquareHeart className="h-8 w-8 text-viber-pink" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold genz-gradient-text"
          >
            VIBER
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex space-x-4 items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-viber-purple border border-viber-pastel-purple/30 hover:bg-viber-pastel-purple/10 transition-colors"
          >
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">Theme</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="genz-button flex items-center gap-2"
          >
            <span>Open App</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
