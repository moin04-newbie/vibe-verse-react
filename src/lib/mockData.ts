
export interface User {
  id: string;
  name: string;
  avatar: string;
  status: string;
  lastSeen: string;
  mood: {
    emoji: string;
    label: string;
    color: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  unreadCount: number;
  lastActivity: string;
}

export interface Trend {
  id: string;
  title: string;
  description: string;
  count: number;
  emoji: string;
}

// Mock Moods
export const moods = [
  { emoji: "🍃", label: "Chill", color: "bg-emerald-400" },
  { emoji: "🔥", label: "Hype", color: "bg-orange-500" },
  { emoji: "😴", label: "Sleepy", color: "bg-indigo-400" },
  { emoji: "🥺", label: "Sad", color: "bg-blue-400" },
  { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
  { emoji: "💀", label: "Dead", color: "bg-gray-400" },
  { emoji: "💅", label: "Slay", color: "bg-pink-400" },
  { emoji: "🙏", label: "Blessed", color: "bg-purple-400" }
];

// Mock Users
export const users: User[] = [
  {
    id: "u1",
    name: "Alex Chen",
    avatar: "https://i.pravatar.cc/150?img=11",
    status: "💅・slaying as usual・✨",
    lastSeen: "Online",
    mood: moods[1]
  },
  {
    id: "u2",
    name: "Taylor Kim",
    avatar: "https://i.pravatar.cc/150?img=5",
    status: "🎮・gaming all night・🎮",
    lastSeen: "5m ago",
    mood: moods[0]
  },
  {
    id: "u3",
    name: "Jordan Smith",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "📚・finals week・😭",
    lastSeen: "2h ago",
    mood: moods[5]
  },
  {
    id: "u4",
    name: "Riley Johnson",
    avatar: "https://i.pravatar.cc/150?img=8",
    status: "🎵・new playlist・🎧",
    lastSeen: "1d ago",
    mood: moods[4]
  },
  {
    id: "u5",
    name: "Morgan White",
    avatar: "https://i.pravatar.cc/150?img=9",
    status: "💤・sleepy・😴",
    lastSeen: "2d ago",
    mood: moods[2]
  },
  {
    id: "u6",
    name: "Casey Brown",
    avatar: "https://i.pravatar.cc/150?img=2",
    status: "🌊・beach day・🏖️",
    lastSeen: "3d ago",
    mood: moods[7]
  }
];

// Mock Messages
const createMockMessages = (chatId: string, users: string[]): Message[] => {
  const messages: Message[] = [];
  const now = new Date();
  
  for (let i = 0; i < 10; i++) {
    const sender = users[i % 2];
    const hoursAgo = 9 - i;
    const messageDate = new Date(now);
    messageDate.setHours(messageDate.getHours() - hoursAgo);
    
    messages.push({
      id: `msg-${chatId}-${i}`,
      senderId: sender,
      content: getRandomMessage(i),
      timestamp: messageDate.toISOString(),
      isRead: i < 3 ? false : true
    });
  }
  
  return messages;
};

// Random message templates
const getRandomMessage = (index: number): string => {
  const messages = [
    "Hey! What's up?",
    "Not much, just chilling. You?",
    "Did you see that new movie that came out?",
    "Yeah, it was actually pretty good 💯",
    "We should hang out this weekend!",
    "For sure! When are you free?",
    "I'm free Saturday afternoon ✨",
    "Perfect! Let's go to that new cafe",
    "Sounds like a plan 🙌",
    "Can't wait! See you then 🔥"
  ];
  
  return messages[index % messages.length];
};

// Mock Chats
export const chats: Chat[] = users.slice(0, 5).map((user, index) => ({
  id: `chat-${index + 1}`,
  participants: ["u1", user.id],
  messages: createMockMessages(`chat-${index + 1}`, ["u1", user.id]),
  unreadCount: index === 0 ? 3 : index === 1 ? 1 : 0,
  lastActivity: new Date(new Date().setHours(new Date().getHours() - index)).toISOString()
}));

// Mock Trends
export const trends: Trend[] = [
  {
    id: "trend1",
    title: "Festival Season",
    description: "Everyone's talking about summer festivals!",
    count: 2453,
    emoji: "🎪"
  },
  {
    id: "trend2",
    title: "Viral TikTok",
    description: "This dance is taking over chats",
    count: 1872,
    emoji: "💃"
  },
  {
    id: "trend3",
    title: "New Album Drop",
    description: "Discussions about the latest music release",
    count: 1245,
    emoji: "🎵"
  },
  {
    id: "trend4",
    title: "Gaming Tournament",
    description: "The big esports event this weekend",
    count: 987,
    emoji: "🎮"
  }
];

// Mock AI Summaries
export const getSummary = (chatId: string) => ({
  vibe: `${Math.floor(Math.random() * 30) + 70}% ${["Fun", "Chill", "Excited", "Busy"][Math.floor(Math.random() * 4)]}`,
  topEmoji: ["💀", "😂", "🔥", "✨", "💯"][Math.floor(Math.random() * 5)],
  keywords: [
    ["memes", "plans", "weekend"],
    ["study", "coffee", "exams"],
    ["music", "concert", "vibes"],
    ["games", "stream", "ranked"]
  ][Math.floor(Math.random() * 4)]
});

// Current User (you)
export const currentUser: User = {
  id: "u1",
  name: "You",
  avatar: "https://i.pravatar.cc/150?img=11",
  status: "✨・vibing・✨",
  lastSeen: "Online",
  mood: moods[4]
};

// Helper for local storage
export const saveToLocalStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const loadFromLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return defaultValue;
};
