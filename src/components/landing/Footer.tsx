
import React from 'react';
import { MessageSquareHeart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="container mx-auto py-8 px-4 lg:px-0">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-xl mr-2">
            <MessageSquareHeart className="h-6 w-6 text-viber-pink" />
          </span>
          <h2 className="font-bold genz-gradient-text">VIBER</h2>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-gray-500 hover:text-viber-purple transition-colors">Privacy</a>
          <a href="#" className="text-sm text-gray-500 hover:text-viber-purple transition-colors">Terms</a>
          <a href="#" className="text-sm text-gray-500 hover:text-viber-purple transition-colors">Help</a>
        </div>
        <p className="text-sm text-gray-500 mt-4 md:mt-0">© 2025 VIBER. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
