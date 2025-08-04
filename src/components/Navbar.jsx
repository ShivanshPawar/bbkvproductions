import React, { useState } from 'react';
import '../index.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] bg-black/60 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-full flex justify-between items-center backdrop-blur-md shadow-md">
        <span className="text-xs sm:text-sm font-bold tracking-wider">BBKV PRODUCTIONS</span>
        <button onClick={toggleMenu} className="text-white text-lg sm:text-xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 sm:top-20 left-0 w-full bg-black/90 backdrop-blur-lg z-40 transition-all duration-500">
          <ul className="flex flex-col items-center py-6 space-y-3 sm:space-y-4 text-white text-sm sm:text-base">
            <li><a href="#home" onClick={toggleMenu} className="hover:text-yellow-400 transition-colors">Home</a></li>
            <li><a href="#about" onClick={toggleMenu} className="hover:text-yellow-400 transition-colors">About</a></li>
            <li><a href="#shows" onClick={toggleMenu} className="hover:text-yellow-400 transition-colors">Shows</a></li>
            <li><a href="#tracklist" onClick={toggleMenu} className="hover:text-yellow-400 transition-colors">Music</a></li>
            <li><a href="#accolades" onClick={toggleMenu} className="hover:text-yellow-400 transition-colors">Accolades</a></li>
            <li><a href="#contact" onClick={toggleMenu} className="hover:text-yellow-400 transition-colors">Contact</a></li>
          </ul>
        </div>
      )}

      {/* DESKTOP NAVBAR */}
      <nav className="hidden md:flex fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[50%] bg-white/5 border border-white/20 backdrop-blur-md shadow-lg rounded-full px-6 py-3 justify-center items-center text-white fonty">
        <ul className=" flex gap-6 text-sm md:text-base font-medium">
          <li><a href="#home" className="hover:text-yellow-400 transition-all cursor-target">Home</a></li>
          <li><a href="#about" className="hover:text-yellow-400 transition-all cursor-target">About</a></li>
          <li><a href="#shows" className="hover:text-yellow-400 transition-all cursor-target">Shows</a></li>
          <li><a href="#tracklist" className="hover:text-yellow-400 transition-all cursor-target">Music</a></li>
          <li><a href="#accolades" className="hover:text-yellow-400 transition-all cursor-target">Accolades</a></li>
          <li><a href="#contact" className="hover:text-yellow-400 transition-all cursor-target">Contact</a></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
