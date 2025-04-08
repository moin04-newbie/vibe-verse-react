
import React, { useState, useEffect } from 'react';
import { moods } from '../lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface VibeMeterProps {
  initialMood?: {
    emoji: string;
    label: string;
    color: string;
  };
  onMoodChange?: (mood: { emoji: string; label: string; color: string }) => void;
}

const VibeMeter: React.FC<VibeMeterProps> = ({ initialMood, onMoodChange }) => {
  const [currentMood, setCurrentMood] = useState(initialMood || moods[0]);
  const [isChanging, setIsChanging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (initialMood) {
      setCurrentMood(initialMood);
    }
  }, [initialMood]);

  const handleMoodChange = (mood: { emoji: string; label: string; color: string }) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentMood(mood);
      if (onMoodChange) onMoodChange(mood);
      setIsChanging(false);
    }, 300);
  };

  const emojiVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        scale: { duration: 0.3 },
        rotate: { duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
      }
    },
    tap: {
      scale: 0.9,
      transition: { duration: 0.1 }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-2">
        <motion.div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${currentMood.color} shadow-lg`}
          variants={emojiVariants}
          initial="idle"
          animate={isHovering ? "hover" : "idle"}
          whileTap="tap"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            key={currentMood.emoji}
            transition={{ duration: 0.3 }}
          >
            {currentMood.emoji}
          </motion.span>
        </motion.div>
        <motion.div 
          className="absolute -bottom-1 -right-1 bg-white rounded-full shadow-md p-1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.button 
            onClick={() => setIsChanging(prev => !prev)} 
            className="w-6 h-6 bg-viber-gradient rounded-full flex items-center justify-center text-white text-xs"
            whileHover={{ 
              backgroundColor: "#8B5CF6", 
              boxShadow: "0 0 8px rgba(139, 92, 246, 0.6)" 
            }}
          >
            {isChanging ? "×" : "+"}
          </motion.button>
        </motion.div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          className="mt-1 text-center"
          key={currentMood.label}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-medium">{currentMood.label}</span>
        </motion.div>
      </AnimatePresence>
      
      <AnimatePresence>
        {isChanging && (
          <motion.div 
            className="mt-4 grid grid-cols-4 gap-3 bg-white p-3 rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {moods.map((mood) => (
              <motion.button
                key={mood.label}
                className={`w-10 h-10 rounded-full ${mood.color} flex items-center justify-center text-xl shadow-md`}
                onClick={() => handleMoodChange(mood)}
                whileHover={{ 
                  scale: 1.15, 
                  boxShadow: "0 0 12px rgba(0, 0, 0, 0.2)" 
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {mood.emoji}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VibeMeter;
