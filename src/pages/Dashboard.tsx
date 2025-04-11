
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, LayoutGrid, Newspaper, Bell, Settings, PanelLeft } from 'lucide-react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import Sidebar from '../components/Sidebar';
import TrendsSidebar from '../components/TrendsSidebar';
import { chats as mockChats, saveToLocalStorage, loadFromLocalStorage } from '../lib/mockData';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const [chats, setChats] = useState(mockChats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showMobileTrends, setShowMobileTrends] = useState(false);
  const [activeTab, setActiveTab] = useState("messages");
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedChats = loadFromLocalStorage('viber-chats', null);
    if (savedChats) {
      setChats(savedChats);
    }
    
    if (mockChats.length > 0) {
      setSelectedChatId(mockChats[0].id);
    }
    
    // Welcome toast for Gen Z vibe
    toast({
      title: "✨ Welcome back!",
      description: "Your friends are waiting to vibe with you",
      duration: 3000,
    });
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

  const changeTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-viber-pastel-blue/30 to-viber-pastel-pink/30 backdrop-blur-sm">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-white/30 p-4 shadow-sm">
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
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-viber-purple to-viber-pink bg-clip-text text-transparent">VIBER</h1>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-full bg-white/80 hover:bg-white/90 transition-colors text-sm font-medium shadow-sm"
            >
              Home
            </button>
            <button 
              className="md:hidden p-2 rounded-full bg-white/80 hover:bg-white/90 transition-colors shadow-sm"
              onClick={() => setShowMobileSidebar(true)}
            >
              <Settings size={18} />
            </button>
            <button 
              className="md:hidden p-2 rounded-full bg-white/80 hover:bg-white/90 transition-colors shadow-sm"
              onClick={() => setShowMobileTrends(true)}
            >
              <Newspaper size={18} />
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Profile */}
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>
        
        {/* Mobile Profile Sidebar */}
        <AnimatePresence>
          {showMobileSidebar && (
            <motion.div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileSidebar(false)}
            >
              <motion.div 
                className="absolute right-0 top-0 h-full w-80 shadow-lg"
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
        </AnimatePresence>
        
        {/* Middle section */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile tabs */}
          <div className="md:hidden p-2 border-b border-white/20 bg-white/50">
            <Tabs defaultValue="messages" onValueChange={changeTab}>
              <TabsList className="grid grid-cols-4 w-full bg-white/70 rounded-full">
                <TabsTrigger value="messages" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
                  <MessageSquare size={18} />
                </TabsTrigger>
                <TabsTrigger value="explore" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
                  <LayoutGrid size={18} />
                </TabsTrigger>
                <TabsTrigger value="news" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Newspaper size={18} />
                </TabsTrigger>
                <TabsTrigger value="notifications" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Bell size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex-1 flex overflow-hidden">
            {/* Chat list */}
            <div className="w-64 bg-white/70 backdrop-blur-md border-r border-white/30">
              <div className="p-3">
                <input 
                  type="text" 
                  placeholder="Search vibes..." 
                  className="genz-input w-full"
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
        </div>
        
        {/* Right Sidebar - Trends */}
        <div className="w-64 border-l border-white/30 bg-white/70 backdrop-blur-md hidden md:block">
          <TrendsSidebar />
        </div>
        
        {/* Mobile Trends Sidebar */}
        <AnimatePresence>
          {showMobileTrends && (
            <motion.div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileTrends(false)}
            >
              <motion.div 
                className="absolute right-0 top-0 h-full w-80 shadow-lg"
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
        </AnimatePresence>
      </div>
      
      {/* Mobile Nav Bar */}
      <div className="md:hidden bg-white/80 backdrop-blur-md border-t border-white/30 py-2 px-4">
        <div className="flex justify-around">
          <button className={`p-2 rounded-full ${activeTab === 'messages' ? 'bg-primary text-white' : 'bg-white/80'}`} onClick={() => changeTab('messages')}>
            <MessageSquare size={22} />
          </button>
          <button className={`p-2 rounded-full ${activeTab === 'explore' ? 'bg-primary text-white' : 'bg-white/80'}`} onClick={() => changeTab('explore')}>
            <LayoutGrid size={22} />
          </button>
          <button 
            className="p-2 rounded-full bg-white/80"
            onClick={() => setShowMobileSidebar(true)}
          >
            <PanelLeft size={22} />
          </button>
          <button className={`p-2 rounded-full ${activeTab === 'notifications' ? 'bg-primary text-white' : 'bg-white/80'}`} onClick={() => changeTab('notifications')}>
            <Bell size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
