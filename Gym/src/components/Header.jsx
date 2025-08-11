// import React from 'react';
import header_img from "../assets/header_img.png";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center w-full overflow-hidden"
      style={{ backgroundImage: `url(${header_img})` }}
      id="Header"
    >
      <div className="text-white text-center px-8">
        <h2 className="text-4xl font-bold mb-6">
          Explore Homes that Fit Your Dream
        </h2>
        <div className="space-x-4 mb-6">
          <Link
            to="/projects"
            className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-red-400 transition"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="px-6 py-2 border border-white text-black rounded-full font-semibold hover:bg-red-400 hover:text-blue-300 transition"
          >
            Contact Us
          </Link>
        </div>
        <Link
          to="/journey"
          className="inline-block mt-4 px-8 py-3 bg-gradient-to-r from-red-600 to-black text-white rounded-full font-bold text-lg animate-bounce hover:scale-105 transition-transform duration-300"
        >
          Start Your Fitness Journey
        </Link>
      </div>
    </div>
  );
};

export default Header;
