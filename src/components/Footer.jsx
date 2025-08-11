
import React, { useState } from 'react';
import logo from '../assets/logo_dark.svg';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa6';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = () => {
    if (email.trim() === '') {
      setMessage('Please enter a valid email.');
    } else {
      setMessage('Thanks for subscribing!');
      setEmail('');
    }

    // Auto hide message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <footer className="bg-[#0f0f0f] pt-10 px-4 md:px-20 lg:px-32 w-full overflow-hidden" id="Footer">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-10">

        {/* Left Section: Logo & Socials */}
        <div className="md:w-1/3">
          <img src={logo} alt="Gym Logo" className="w-24 h-auto mb-4" />
          <p className="text-gray-400 max-w-[220px]">
            Your fitness companion. Train, transform, and thrive with us.
          </p>
          <div className="flex gap-4 mt-4 text-white text-xl">
            <a href="#" className="hover:text-red-600"><FaInstagram /></a>
            <a href="#" className="hover:text-red-600"><FaFacebookF /></a>
            <a href="#" className="hover:text-red-600"><FaTiktok /></a>
          </div>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="md:w-1/3">
          <h3 className="text-white text-lg font-bold mb-4">Company</h3>
          <ul className="flex flex-col gap-2 text-gray-400">
            <li><a href="#Header" className="hover:text-white">Home</a></li>
            <li><a href="#About" className="hover:text-white">About Us</a></li>
            <li><a href="#Contact" className="hover:text-white">Contact Us</a></li>
            <li><a href="#Privacy" className="hover:text-white">Privacy</a></li>
          </ul>
        </div>

        {/* Right Section: Newsletter */}
        <div className="md:w-1/3">
          <h3 className="text-white text-lg font-bold mb-4">Subscribe to our newsletter</h3>
          <p className="text-gray-400 mb-4 max-w-[280px]">
            The latest news, articles, and resources — sent to your inbox weekly.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-12 px-4 rounded bg-[#1a1a1a] text-gray-300 border border-gray-600 focus:outline-none w-full"
            />
            <button
              onClick={handleSubscribe}
              className="h-12 px-6 text-base rounded bg-red-600 hover:bg-red-700 text-white transition-transform hover:scale-105"
            >
              Subscribe
            </button>
          </div>

          {/* ✅ Success or Error Message */}
          {message && (
            <p className={`mt-3 text-sm font-medium ${message === 'Thanks for subscribing!' ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-gray-400 py-4 font-semibold text-center mt-10 border-t border-gray-700">
        © 2025 Gym Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
