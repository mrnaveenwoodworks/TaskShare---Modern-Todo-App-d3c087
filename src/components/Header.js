import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="216" y1="128" x2="40" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="156" x2="100" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="68" y1="128" x2="128" y2="188" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="68" x2="188" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="156" y1="40" x2="216" y2="100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </div>
            
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              Task<span className="text-pink-300">Share</span>
            </Link>
            
            <span className="hidden md:inline-block px-2 py-1 text-xs bg-indigo-800 rounded-full">
              Beta
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="font-medium hover:text-pink-300 transition-colors">
              Dashboard
            </Link>
            <Link to="/shared" className="font-medium hover:text-pink-300 transition-colors">
              Shared Tasks
            </Link>
            <button className="font-medium hover:text-pink-300 transition-colors bg-transparent border-0 cursor-pointer text-white">
              About
            </button>
          </nav>
          
          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-50 transition-colors">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="21.49" y="82.75" width="213.02" height="90.51" rx="8" transform="translate(-53.02 128) rotate(-45)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="64" x2="160" y2="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="96" y1="96" x2="128" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="64" y1="128" x2="96" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><polyline points="24 180 68 164 108 180 148 164 188 180 232 164" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="24" y1="128" x2="232" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,172.73V184a32,32,0,0,1-32,32H80a32,32,0,0,1-32-32V171.27" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48.2,92a8,8,0,0,1-7.83-10.29C49.49,53.24,85.26,32,128,32s78.52,21.25,87.63,49.73A8,8,0,0,1,207.8,92Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link 
              to="/" 
              className="block py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/shared" 
              className="block py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shared Tasks
            </Link>
            <button 
              className="block w-full text-left py-2 px-4 rounded hover:bg-indigo-700 transition-colors text-white bg-transparent border-0 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </button>
            <div className="pt-2 border-t border-indigo-500">
              <button className="w-full bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;