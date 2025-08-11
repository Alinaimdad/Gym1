import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import menu_icon from '../assets/menu_icon.svg';
import cross_icon from '../assets/cross_icon.svg';
import logo from '../assets/logo_dark.svg';
import { FaHome, FaInfoCircle, FaProjectDiagram, FaUsers } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section && location.pathname === '/') {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const navItems = [
    { id: 'Header', icon: <FaHome />, label: 'Home' },
    { id: 'About', icon: <FaInfoCircle />, label: 'About' },
    { id: 'Projects', icon: <FaProjectDiagram />, label: 'Projects' },
    { id: 'Testimonials', icon: <FaUsers />, label: 'Testimonials' },
  ];

  const isSignupPage = location.pathname === '/signup';
  const textColorClass = 'text-black'; // Always black text

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="flex items-center px-6 py-3 bg-white shadow-md md:px-20 lg:px-32">
          {/* Logo */}
          <img src={logo} alt="Gym Logo" className="w-20 h-auto" />

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className={`flex gap-7 font-bold ${textColorClass}`}>
              {navItems.map(({ id, icon, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`flex items-center gap-2 hover:bg-red-400 px-4 py-1 rounded transition ${textColorClass}`}
                  >
                    {icon} {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Signin Button */}
          {!isSignupPage && (
            <Link to="/signup">
              <button className="hidden md:flex bg-white px-6 py-2 rounded-full hover:bg-red-400 hover:text-white transition font-semibold text-black">
                Signin
              </button>
            </Link>
          )}

          {/* Hamburger */}
          <img
            src={menu_icon}
            alt="menu-icon"
            className="md:hidden w-7 cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </div>

      {/* Space for Fixed Navbar */}
      <div className="h-20"></div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center p-6">
          <img src={logo} alt="Gym Logo" className="w-20 h-auto" />
          <img
            src={cross_icon}
            className="w-6 cursor-pointer"
            alt="close"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>

        <ul className="flex flex-col items-center gap-4 mt-5 text-lg font-medium text-black">
          {navItems.map(({ id, icon, label }) => (
            <li key={id}>
              <button
                onClick={() => {
                  scrollToSection(id);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
              >
                {icon} {label}
              </button>
            </li>
          ))}
          {!isSignupPage && (
            <li>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="bg-red-400 text-white px-6 py-2 mt-4 rounded-full font-semibold"
              >
                Signin
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
