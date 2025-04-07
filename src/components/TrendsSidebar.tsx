
import React from 'react';
import { motion } from 'framer-motion';
import { trends } from '../lib/mockData';

interface TrendsSidebarProps {
  onClose?: () => void;
}

const TrendsSidebar: React.FC<TrendsSidebarProps> = ({ onClose }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Trending</h2>
          {onClose && (
            <button 
              onClick={onClose}
              className="md:hidden text-gray-500"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {trends.map((trend) => (
          <motion.div
            key={trend.id}
            className="viber-card"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{trend.emoji}</span>
                <h3 className="font-bold">{trend.title}</h3>
              </div>
              <span className="text-sm bg-viber-purple/10 text-viber-purple px-2 py-1 rounded-full">
                {trend.count.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">{trend.description}</p>
          </motion.div>
        ))}
        
        <div className="mt-6">
          <h3 className="font-bold mb-3">Your Friends' Vibes</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/150?img=5" alt="Friend" className="w-8 h-8 rounded-full mr-2" />
                <span>Taylor</span>
              </div>
              <div className="flex items-center">
                <span className="text-viber-orange mr-1">🔥</span>
                <span className="text-sm">Hype</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/150?img=3" alt="Friend" className="w-8 h-8 rounded-full mr-2" />
                <span>Jordan</span>
              </div>
              <div className="flex items-center">
                <span className="text-emerald-400 mr-1">🍃</span>
                <span className="text-sm">Chill</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/150?img=8" alt="Friend" className="w-8 h-8 rounded-full mr-2" />
                <span>Riley</span>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">😊</span>
                <span className="text-sm">Happy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsSidebar;
