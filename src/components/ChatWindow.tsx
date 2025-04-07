
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chat, User, users, Message, saveToLocalStorage, loadFromLocalStorage } from '../lib/mockData';
import FakeAI from './FakeAI';

interface ChatWindowProps {
  selectedChatId: string | null;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChatId, chats, setChats }) => {
  const [message, setMessage] = useState('');
  const [showAISummary, setShowAISummary] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChat = chats.find(chat => chat.id === selectedChatId);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat?.messages]);

  if (!selectedChat) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-400">Select a chat to start messaging</h3>
          <p className="text-gray-400 mt-2">Choose a conversation from the list</p>
        </div>
      </div>
    );
  }

  const getOtherParticipant = (): User => {
    const otherParticipantId = selectedChat.participants.find(id => id !== 'u1');
    return users.find(user => user.id === otherParticipantId) || users[0];
  };

  const otherUser = getOtherParticipant();

  const formatTime = (timestamp: string): string => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'u1',
      content: message,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastActivity: new Date().toISOString()
        };
      }
      return chat;
    });

    setChats(updatedChats);
    saveToLocalStorage('viber-chats', updatedChats);
    setMessage('');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat header */}
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative">
            <img 
              src={otherUser.avatar} 
              alt={otherUser.name} 
              className="w-10 h-10 rounded-full"
            />
            <div 
              className={`absolute bottom-0 right-0 w-3 h-3 ${
                otherUser.lastSeen === 'Online' ? 'bg-green-500' : 'bg-gray-300'
              } rounded-full border-2 border-white`}
            ></div>
          </div>
          <div className="ml-3">
            <h3 className="font-bold">{otherUser.name}</h3>
            <p className="text-xs text-gray-500">
              {otherUser.lastSeen === 'Online' ? 'Online' : `Last seen ${otherUser.lastSeen}`}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowAISummary(!showAISummary)}
            className={`p-2 rounded-full ${
              showAISummary ? 'bg-viber-gradient text-white' : 'bg-gray-100'
            }`}
          >
            AI
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {showAISummary && (
          <div className="mb-4">
            <FakeAI chatId={selectedChatId} />
          </div>
        )}
        
        {selectedChat.messages.map((msg) => {
          const isOwnMessage = msg.senderId === 'u1';
          return (
            <motion.div
              key={msg.id}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
                  isOwnMessage 
                    ? 'bg-viber-gradient text-white rounded-br-none' 
                    : 'bg-white border rounded-bl-none'
                }`}
              >
                <p>{msg.content}</p>
                <div className={`text-right mt-1 text-xs ${isOwnMessage ? 'text-white/70' : 'text-gray-500'}`}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="viber-input flex-1"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="viber-button px-4"
          >
            Send
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
