
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSummary } from '../lib/mockData';
import { MessageSquare, Sparkles, Send } from 'lucide-react';

interface FakeAIProps {
  chatId: string;
}

const FakeAI: React.FC<FakeAIProps> = ({ chatId }) => {
  const [summary, setSummary] = useState<{ vibe: string; topEmoji: string; keywords: string[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'summary' | 'demo'>('summary');
  const [demoMessages, setDemoMessages] = useState<{text: string, sender: 'user' | 'ai', timestamp: string}[]>([
    {
      text: "Hey VIBER, how's my convo going?",
      sender: 'user',
      timestamp: new Date(Date.now() - 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Simulate AI loading time
    setLoading(true);
    const timer = setTimeout(() => {
      setSummary(getSummary(chatId));
      setLoading(false);
      
      // Add initial AI response in demo
      if (demoMessages.length === 1) {
        simulateAIResponse("Hi there! I'm analyzing your conversation. The vibe seems pretty casual and friendly so far!");
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [chatId]);

  const simulateAIResponse = (text: string) => {
    setIsTyping(true);
    
    // Random typing delay between 1-3 seconds
    const typingDelay = Math.floor(Math.random() * 2000) + 1000;
    
    setTimeout(() => {
      setDemoMessages(prev => [...prev, {
        text,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, typingDelay);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    // Add user message
    const newMessage = {
      text: inputMessage,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setDemoMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    
    // Generate AI response based on user input
    let aiResponse = "";
    
    if (inputMessage.toLowerCase().includes('vibe')) {
      aiResponse = `The conversation has a ${summary?.vibe.toLowerCase() || 'friendly'} vibe! People seem to be enjoying the chat.`;
    } else if (inputMessage.toLowerCase().includes('emoji')) {
      aiResponse = `The top emoji in this chat is ${summary?.topEmoji || '✨'} - it reflects the overall mood!`;
    } else if (inputMessage.toLowerCase().includes('keyword') || inputMessage.toLowerCase().includes('topic')) {
      aiResponse = `I noticed these keywords: ${summary?.keywords.join(', ') || 'friends, meetup, weekend'}. These seem to be the main topics!`;
    } else if (inputMessage.toLowerCase().includes('help')) {
      aiResponse = "I can analyze conversation vibes, identify top emojis, and extract keywords. Try asking about the 'vibe' or 'keywords'!";
    } else {
      const responses = [
        "I'm keeping track of your chat patterns. Everything looks positive!",
        "I noticed this conversation has good energy. Keep it up!",
        "Based on my analysis, you and your friends seem to be connecting well.",
        "My algorithms detect a great conversational flow in this chat!",
        "I'm analyzing sentiment in real-time. The conversation feels engaging!"
      ];
      aiResponse = responses[Math.floor(Math.random() * responses.length)];
    }
    
    simulateAIResponse(aiResponse);
  };

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
      <div className="bg-gradient-to-r from-viber-purple/10 to-viber-blue/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm shadow-lg">
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
      className="bg-gradient-to-r from-viber-purple/10 to-viber-blue/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-viber-gradient flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <h3 className="font-bold bg-clip-text text-transparent bg-viber-gradient">VIBER AI</h3>
        </div>
        
        {/* Tab selector */}
        <div className="flex bg-white/20 rounded-full p-1">
          <button 
            className={`px-3 py-1 text-xs rounded-full transition-colors ${activeTab === 'summary' ? 'bg-viber-gradient text-white' : 'text-gray-700 hover:bg-white/20'}`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded-full transition-colors ${activeTab === 'demo' ? 'bg-viber-gradient text-white' : 'text-gray-700 hover:bg-white/20'}`}
            onClick={() => setActiveTab('demo')}
          >
            Demo
          </button>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'summary' && summary && (
          <motion.div 
            className="space-y-3"
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div variants={itemVariants} className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Convo Vibe</span>
              <span className="font-bold bg-clip-text text-transparent bg-viber-gradient">{summary.vibe}</span>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Top Emoji</span>
              <motion.span 
                className="text-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {summary.topEmoji}
              </motion.span>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <span className="text-sm text-gray-500 block mb-1">Keywords</span>
              <div className="flex flex-wrap gap-1">
                {summary.keywords.map((keyword, i) => (
                  <motion.span 
                    key={i} 
                    className="bg-gradient-to-r from-viber-purple/20 to-viber-blue/20 px-2 py-1 rounded-full text-xs"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.3)" }}
                  >
                    #{keyword}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {activeTab === 'demo' && (
          <motion.div 
            className="h-48"
            key="demo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-36 overflow-y-auto mb-2 pr-1 scrollbar-thin">
              {demoMessages.map((msg, index) => (
                <motion.div 
                  key={index}
                  className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-viber-gradient text-white ml-4 rounded-tr-none' 
                        : 'bg-white/40 border border-white/40 mr-4 rounded-tl-none'
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div className={`text-right text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-2">
                  <div className="bg-white/40 border border-white/40 px-3 py-2 rounded-2xl rounded-tl-none">
                    <motion.div
                      className="flex space-x-1"
                      animate={{
                        y: [0, -3, 0]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "loop",
                        times: [0, 0.5, 1],
                        staggerChildren: 0.1
                      }}
                    >
                      <motion.div className="w-1.5 h-1.5 bg-viber-purple/70 rounded-full" />
                      <motion.div className="w-1.5 h-1.5 bg-viber-purple/70 rounded-full" transition={{ delay: 0.1 }} />
                      <motion.div className="w-1.5 h-1.5 bg-viber-purple/70 rounded-full" transition={{ delay: 0.2 }} />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me about the conversation..."
                className="w-full py-2 pl-3 pr-10 bg-white/40 border border-white/40 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-viber-purple/40"
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1 p-1.5 bg-viber-gradient rounded-full text-white"
                disabled={!inputMessage.trim()}
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FakeAI;
