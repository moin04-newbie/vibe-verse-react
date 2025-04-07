
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSummary } from '../lib/mockData';

interface FakeAIProps {
  chatId: string;
}

const FakeAI: React.FC<FakeAIProps> = ({ chatId }) => {
  const [summary, setSummary] = useState<{ vibe: string; topEmoji: string; keywords: string[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI loading time
    setLoading(true);
    const timer = setTimeout(() => {
      setSummary(getSummary(chatId));
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [chatId]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-viber-purple/10 to-viber-blue/10 rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-5 h-5 rounded-full bg-viber-purple animate-pulse"></div>
          <h3 className="font-bold text-viber-purple">VIBER AI</h3>
        </div>
        <div className="h-20 flex items-center justify-center">
          <motion.div
            className="flex space-x-2"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <span className="w-2 h-2 bg-viber-purple rounded-full"></span>
            <span className="w-2 h-2 bg-viber-blue rounded-full"></span>
            <span className="w-2 h-2 bg-viber-pink rounded-full"></span>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-gradient-to-r from-viber-purple/10 to-viber-blue/10 rounded-xl p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-viber-purple"></div>
        <h3 className="font-bold text-viber-purple">VIBER AI</h3>
      </div>
      
      {summary && (
        <div className="space-y-3">
          <motion.div variants={itemVariants} className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Convo Vibe</span>
            <span className="font-bold">{summary.vibe}</span>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Top Emoji</span>
            <span className="text-2xl">{summary.topEmoji}</span>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <span className="text-sm text-gray-500 block mb-1">Keywords</span>
            <div className="flex flex-wrap gap-1">
              {summary.keywords.map((keyword, i) => (
                <span 
                  key={i} 
                  className="bg-viber-purple/20 px-2 py-1 rounded-full text-xs"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default FakeAI;
