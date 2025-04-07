
import React, { useState, useEffect } from 'react';
import { moods } from '../lib/mockData';
import { motion } from 'framer-motion';

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

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-2">
        <motion.div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${currentMood.color}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {currentMood.emoji}
        </motion.div>
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full shadow-md p-1">
          <button 
            onClick={() => setIsChanging(prev => !prev)} 
            className="w-6 h-6 bg-viber-gradient rounded-full flex items-center justify-center text-white text-xs"
          >
            +
          </button>
        </div>
      </div>
      
      <motion.div
        className="mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={currentMood.label}
      >
        <span className="font-medium">{currentMood.label}</span>
      </motion.div>
      
      {isChanging && (
        <motion.div 
          className="mt-4 grid grid-cols-4 gap-3 bg-white p-3 rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          {moods.map((mood) => (
            <button
              key={mood.label}
              className={`w-10 h-10 rounded-full ${mood.color} flex items-center justify-center text-xl hover:scale-110 transition-transform`}
              onClick={() => handleMoodChange(mood)}
            >
              {mood.emoji}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default VibeMeter;
