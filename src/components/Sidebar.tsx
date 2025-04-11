
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Brush, Moon, Sun, LogOut, Music, Zap, Heart, Sparkles } from 'lucide-react';
import VibeMeter from './VibeMeter';
import StatusBuilder from './StatusBuilder';
import { User, currentUser, saveToLocalStorage, loadFromLocalStorage } from '../lib/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const [user, setUser] = useState<User>(currentUser);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [selectedTheme, setSelectedTheme] = useState<string>("pastel");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [animationLevel, setAnimationLevel] = useState<number>(70);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  useEffect(() => {
    const savedUser = loadFromLocalStorage('viber-user', null);
    if (savedUser) {
      setUser(savedUser);
    }
    
    // Load preferences from local storage
    const savedTheme = localStorage.getItem('viber-theme');
    if (savedTheme) setSelectedTheme(savedTheme);
    
    const savedDarkMode = localStorage.getItem('viber-dark-mode');
    if (savedDarkMode) setIsDarkMode(savedDarkMode === 'true');
    
    const savedAnimationLevel = localStorage.getItem('viber-animation-level');
    if (savedAnimationLevel) setAnimationLevel(parseInt(savedAnimationLevel));
    
    const savedNotifications = localStorage.getItem('viber-notifications');
    if (savedNotifications) setNotificationsEnabled(savedNotifications === 'true');
    
    const savedSound = localStorage.getItem('viber-sound');
    if (savedSound) setSoundEnabled(savedSound === 'true');
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
  
  const saveThemePreference = (theme: string) => {
    setSelectedTheme(theme);
    localStorage.setItem('viber-theme', theme);
    
    // Apply theme classes to body
    document.body.classList.remove('theme-pastel', 'theme-neon', 'theme-sunset');
    document.body.classList.add(`theme-${theme}`);
  };
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('viber-dark-mode', newMode.toString());
    
    // Apply dark mode to document
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const updateAnimationLevel = (value: number[]) => {
    const level = value[0];
    setAnimationLevel(level);
    localStorage.setItem('viber-animation-level', level.toString());
  };
  
  const toggleNotifications = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem('viber-notifications', newValue.toString());
  };
  
  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem('viber-sound', newValue.toString());
  };

  return (
    <div className="h-full flex flex-col genz-sidebar">
      <div className="p-4 border-b border-white/30">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-viber-purple to-viber-pink bg-clip-text text-transparent">Your Space</h2>
          {onClose && (
            <button 
              onClick={onClose}
              className="md:hidden text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="profile" className="p-4 flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 mb-4 rounded-full bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="profile" onClick={() => setActiveTab("profile")} className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
            Profile
          </TabsTrigger>
          <TabsTrigger value="appearance" onClick={() => setActiveTab("appearance")} className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
            Vibe
          </TabsTrigger>
          <TabsTrigger value="settings" onClick={() => setActiveTab("settings")} className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6 flex-1">
          <div className="flex items-center">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-20 h-20 rounded-full border-4 border-white/50 shadow-lg"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg bg-gradient-to-r from-viber-purple to-viber-blue bg-clip-text text-transparent">{user.name}</h3>
              <p className="text-gray-500 text-sm flex items-center">
                <Zap size={14} className="mr-1 text-viber-yellow" /> Online
              </p>
            </div>
          </div>
          
          <div className="genz-section">
            <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
              <Heart size={16} className="mr-2 text-viber-pink" /> Your Vibe
            </h4>
            <VibeMeter initialMood={user.mood} onMoodChange={handleMoodChange} />
          </div>
          
          <div className="genz-section">
            <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
              <Sparkles size={16} className="mr-2 text-viber-yellow" /> Status
            </h4>
            <StatusBuilder initialStatus={user.status} onStatusChange={handleStatusChange} />
          </div>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6 flex-1">
          <div className="genz-section">
            <h4 className="text-sm font-medium text-gray-500 mb-4 flex items-center">
              <Brush size={16} className="mr-2 text-viber-green" /> Theme
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'pastel', name: 'Pastel', gradient: 'bg-viber-gradient-pastel' },
                { id: 'neon', name: 'Neon', gradient: 'bg-viber-gradient-neon' },
                { id: 'sunset', name: 'Sunset', gradient: 'bg-viber-gradient-sunset' }
              ].map((theme) => (
                <div key={theme.id} className="flex flex-col items-center gap-2">
                  <motion.div 
                    className={`h-12 w-full rounded-xl cursor-pointer ${theme.gradient} ${selectedTheme === theme.id ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => saveThemePreference(theme.id)}
                  />
                  <span className="text-xs">{theme.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="genz-section">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-500 flex items-center">
                {isDarkMode ? 
                  <Moon size={16} className="mr-2 text-viber-purple" /> : 
                  <Sun size={16} className="mr-2 text-viber-yellow" />
                }
                Dark Mode
              </h4>
              <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </div>
          
          <div className="genz-section">
            <h4 className="text-sm font-medium text-gray-500 mb-4 flex items-center">
              <Zap size={16} className="mr-2 text-viber-blue" /> Animation Level
            </h4>
            <Slider 
              defaultValue={[animationLevel]} 
              max={100} 
              step={10}
              onValueChange={updateAnimationLevel}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Subtle</span>
              <span>Full Vibe</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6 flex-1">
          <div className="genz-section">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-500 flex items-center">
                <Settings size={16} className="mr-2 text-viber-blue" /> Notifications
              </h4>
              <Switch checked={notificationsEnabled} onCheckedChange={toggleNotifications} />
            </div>
            
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-500 flex items-center">
                <Music size={16} className="mr-2 text-viber-pink" /> Sound Effects
              </h4>
              <Switch checked={soundEnabled} onCheckedChange={toggleSound} />
            </div>
          </div>
          
          <div className="genz-section">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Privacy</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="read-receipts" className="mr-2" defaultChecked />
                <Label htmlFor="read-receipts" className="text-sm">Read receipts</Label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="online-status" className="mr-2" defaultChecked />
                <Label htmlFor="online-status" className="text-sm">Show online status</Label>
              </div>
            </div>
          </div>
          
          <button className="w-full py-2.5 px-4 mt-auto rounded-full text-red-500 font-medium border border-red-200 hover:bg-red-50 transition-colors flex items-center justify-center">
            <LogOut size={16} className="mr-2" />
            Log Out
          </button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sidebar;
