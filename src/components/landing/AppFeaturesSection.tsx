
import React from 'react';
import { motion } from 'framer-motion';
import { User, Palette, Shield, Settings } from "lucide-react";

const AppFeaturesSection = () => {
  const features = [
    {
      title: "Customizable Profile",
      description: "Set your vibe, custom avatar, and status message",
      icon: <User className="h-8 w-8 text-viber-pastel-pink" />,
    },
    {
      title: "Theme Editor",
      description: "Create your own color schemes and interface style",
      icon: <Palette className="h-8 w-8 text-viber-pastel-blue" />,
    },
    {
      title: "Privacy Controls",
      description: "Choose who sees your status and activity",
      icon: <Shield className="h-8 w-8 text-viber-pastel-purple" />,
    },
    {
      title: "App Settings",
      description: "Customize notifications and app behavior",
      icon: <Settings className="h-8 w-8 text-viber-pastel-green" />,
    }
  ];
  
  return (
    <div className="mt-16 mb-16">
      <h3 className="text-2xl font-bold text-center mb-12 genz-gradient-text">App Features</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="pastel-card flex flex-col items-center text-center p-8"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4 p-3 rounded-full bg-white/30 border border-white/30">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppFeaturesSection;
