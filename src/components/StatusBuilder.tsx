
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';

interface StatusBuilderProps {
  initialStatus?: string;
  onStatusChange?: (status: string) => void;
}

const StatusBuilder: React.FC<StatusBuilderProps> = ({ 
  initialStatus = "✨・vibing・✨",
  onStatusChange 
}) => {
  const [status, setStatus] = useState(initialStatus);
  const [showPicker, setShowPicker] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const [statusText, setStatusText] = useState(initialStatus);
  
  const statusRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-100, 100], [-10, 10]);

  const handleDragEnd = () => {
    x.set(0);
    y.set(0);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusText(event.target.value);
  };

  const handleEmojiClick = (emojiObject: any) => {
    const newStatus = status.replace(/^[\p{Emoji}\u200D\u{1F3F4}\u{E0067}\u{E0062}]+/u, emojiObject.emoji);
    setStatus(newStatus);
    if (onStatusChange) onStatusChange(newStatus);
    setShowPicker(false);
  };

  const saveStatus = () => {
    setStatus(statusText);
    setEditingStatus(false);
    if (onStatusChange) onStatusChange(statusText);
  };

  return (
    <div className="relative">
      <motion.div
        ref={statusRef}
        style={{ x, y, rotate }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        whileTap={{ cursor: "grabbing" }}
        onDragEnd={handleDragEnd}
        className="bg-secondary px-4 py-2 rounded-full flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing"
        whileHover={{ scale: 1.02 }}
        onClick={() => !editingStatus && setEditingStatus(true)}
      >
        {editingStatus ? (
          <div className="flex items-center">
            <input
              type="text"
              value={statusText}
              onChange={handleStatusChange}
              className="bg-transparent border-none focus:outline-none text-center w-full"
              autoFocus
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                saveStatus();
              }} 
              className="ml-2 text-viber-purple hover:text-viber-blue transition-colors"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowPicker(prev => !prev);
              }}
              className="text-xl hover:scale-110 transition-transform"
            >
              {status.match(/^[\p{Emoji}\u200D\u{1F3F4}\u{E0067}\u{E0062}]+/u)?.[0] || "✨"}
            </button>
            <span>{status}</span>
          </div>
        )}
      </motion.div>

      {showPicker && (
        <motion.div 
          className="absolute z-10 mt-2"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={300}
            height={400}
          />
        </motion.div>
      )}
    </div>
  );
};

export default StatusBuilder;
