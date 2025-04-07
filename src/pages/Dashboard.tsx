
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import Sidebar from '../components/Sidebar';
import TrendsSidebar from '../components/TrendsSidebar';
import { chats as mockChats, saveToLocalStorage, loadFromLocalStorage } from '../lib/mockData';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [chats, setChats] = useState(mockChats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showMobileTrends, setShowMobileTrends] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedChats = loadFromLocalStorage('viber-chats', null);
    if (savedChats) {
      setChats(savedChats);
    }
    
    if (mockChats.length > 0) {
      setSelectedChatId(mockChats[0].id);
    }
  }, []);

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return { ...chat, unreadCount: 0 };
      }
      return chat;
    });
    
    setChats(updatedChats);
    saveToLocalStorage('viber-chats', updatedChats);
    
    // Close mobile sidebars when selecting chat
    setShowMobileSidebar(false);
    setShowMobileTrends(false);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-viber-gradient text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="mr-2 text-2xl"
            >
              💬
            </motion.div>
            <h1 className="text-2xl font-bold tracking-tight">VIBER</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-sm"
            >
              Home
            </button>
            <button 
              className="md:hidden px-3 py-1 rounded-full bg-white/20 hover:bg-white/30"
              onClick={() => setShowMobileSidebar(true)}
            >
              Profile
            </button>
            <button 
              className="md:hidden px-3 py-1 rounded-full bg-white/20 hover:bg-white/30"
              onClick={() => setShowMobileTrends(true)}
            >
              Trends
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Profile */}
        <div className="w-64 border-r bg-white hidden md:block">
          <Sidebar />
        </div>
        
        {/* Mobile Profile Sidebar */}
        {showMobileSidebar && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileSidebar(false)}
          >
            <motion.div 
              className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar onClose={() => setShowMobileSidebar(false)} />
            </motion.div>
          </motion.div>
        )}
        
        {/* Middle section */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat list */}
          <div className="w-64 border-r bg-white">
            <div className="p-3">
              <input 
                type="text" 
                placeholder="Search chats..." 
                className="viber-input w-full"
              />
            </div>
            <div className="h-[calc(100vh-8rem)]">
              <ChatList 
                chats={chats} 
                onSelectChat={handleSelectChat}
                selectedChatId={selectedChatId}
              />
            </div>
          </div>
          
          {/* Chat window */}
          <div className="flex-1 overflow-hidden">
            <ChatWindow 
              selectedChatId={selectedChatId} 
              chats={chats} 
              setChats={setChats}
            />
          </div>
        </div>
        
        {/* Right Sidebar - Trends */}
        <div className="w-64 border-l bg-white hidden md:block">
          <TrendsSidebar />
        </div>
        
        {/* Mobile Trends Sidebar */}
        {showMobileTrends && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileTrends(false)}
          >
            <motion.div 
              className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <TrendsSidebar onClose={() => setShowMobileTrends(false)} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
