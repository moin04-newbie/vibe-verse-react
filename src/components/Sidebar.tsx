
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VibeMeter from './VibeMeter';
import StatusBuilder from './StatusBuilder';
import { User, currentUser, saveToLocalStorage, loadFromLocalStorage } from '../lib/mockData';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const [user, setUser] = useState<User>(currentUser);
  
  useEffect(() => {
    const savedUser = loadFromLocalStorage('viber-user', null);
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleStatusChange = (newStatus: string) => {
    const updatedUser = { ...user, status: newStatus };
    setUser(updatedUser);
    saveToLocalStorage('viber-user', updatedUser);
  };

  const handleMoodChange = (newMood: { emoji: string; label: string; color: string }) => {
    const updatedUser = { ...user, mood: newMood };
    setUser(updatedUser);
    saveToLocalStorage('viber-user', updatedUser);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Profile</h2>
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
      
      <div className="p-4 space-y-6 flex-1">
        <div className="flex items-center">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-16 h-16 rounded-full"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-4">
            <h3 className="font-bold text-lg">{user.name}</h3>
            <p className="text-gray-500 text-sm">Online</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Your Vibe</h4>
          <VibeMeter initialMood={user.mood} onMoodChange={handleMoodChange} />
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
          <StatusBuilder initialStatus={user.status} onStatusChange={handleStatusChange} />
        </div>
        
        <div className="mt-auto">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Theme</h4>
          <div className="grid grid-cols-3 gap-2">
            {['bg-viber-gradient', 'bg-viber-gradient-alt', 'bg-gradient-to-r from-viber-green to-viber-blue'].map((bg, i) => (
              <motion.div 
                key={i}
                className={`h-10 rounded-lg cursor-pointer ${bg}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
