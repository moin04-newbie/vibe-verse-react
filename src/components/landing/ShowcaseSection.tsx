
import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from "lucide-react";

const ShowcaseSection = () => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-center mb-8 genz-gradient-text">See it in action</h3>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-xl border border-white/30"
        >
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
            alt="Person using VIBER" 
            className="w-full h-[400px] object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 pastel-card"
        >
          <h4 className="text-xl font-bold">Stay connected on the go</h4>
          <p>VIBER adapts to your lifestyle, whether you're working from a coffee shop, commuting, or relaxing at home. Share your context with friends and colleagues to set the right expectations for your responses.</p>
          <ul className="space-y-4 mt-6">
            <li className="flex items-center gap-3 bg-white/30 p-3 rounded-xl border border-white/20">
              <div className="w-8 h-8 rounded-full bg-viber-pastel-green flex items-center justify-center">
                <BadgeCheck className="h-5 w-5 text-white" />
              </div>
              <span>Quick mood updates</span>
            </li>
            <li className="flex items-center gap-3 bg-white/30 p-3 rounded-xl border border-white/20">
              <div className="w-8 h-8 rounded-full bg-viber-pastel-green flex items-center justify-center">
                <BadgeCheck className="h-5 w-5 text-white" />
              </div>
              <span>Location-aware status suggestions</span>
            </li>
            <li className="flex items-center gap-3 bg-white/30 p-3 rounded-xl border border-white/20">
              <div className="w-8 h-8 rounded-full bg-viber-pastel-green flex items-center justify-center">
                <BadgeCheck className="h-5 w-5 text-white" />
              </div>
              <span>Customize notification settings based on your vibe</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default ShowcaseSection;
