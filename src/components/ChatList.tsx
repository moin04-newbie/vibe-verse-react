
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Chat, User, users, loadFromLocalStorage } from '../lib/mockData';

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chatId: string) => void;
  selectedChatId: string | null;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, selectedChatId }) => {
  const [localChats, setLocalChats] = useState<Chat[]>(chats);
  
  useEffect(() => {
    const savedChats = loadFromLocalStorage('viber-chats', null);
    if (savedChats) {
      setLocalChats(savedChats);
    } else {
      setLocalChats(chats);
    }
  }, [chats]);

  const getOtherParticipant = (chat: Chat): User => {
    const otherParticipantId = chat.participants.find(id => id !== 'u1');
    return users.find(user => user.id === otherParticipantId) || users[0];
  };

  const formatLastMessage = (chat: Chat): string => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    if (!lastMessage) return 'No messages yet';
    return lastMessage.content.length > 25 
      ? `${lastMessage.content.substring(0, 25)}...` 
      : lastMessage.content;
  };

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 1) {
      return diffDays === 1 ? 'Yesterday' : `${diffDays}d ago`;
    }
    
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 px-3">Messages</h2>
      <div className="space-y-1">
        {localChats.map((chat) => {
          const otherUser = getOtherParticipant(chat);
          return (
            <motion.div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                selectedChatId === chat.id 
                  ? 'bg-viber-gradient text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <div className="relative">
                  <img 
                    src={otherUser.avatar} 
                    alt={otherUser.name} 
                    className="w-12 h-12 rounded-full"
                  />
                  <div 
                    className={`absolute bottom-0 right-0 w-4 h-4 ${
                      otherUser.lastSeen === 'Online' ? 'bg-green-500' : 'bg-gray-300'
                    } rounded-full border-2 border-white`}
                  ></div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className={`font-medium ${selectedChatId === chat.id ? 'text-white' : 'text-gray-900'}`}>
                      {otherUser.name}
                    </h3>
                    <span className={`text-xs ${selectedChatId === chat.id ? 'text-white/70' : 'text-gray-500'}`}>
                      {formatTime(chat.lastActivity)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className={`text-sm truncate ${selectedChatId === chat.id ? 'text-white/80' : 'text-gray-600'}`}>
                      {formatLastMessage(chat)}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-viber-pink text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
