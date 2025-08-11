
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import menu_icon from '../assets/menu_icon.svg';
import cross_icon from '../assets/cross_icon.svg';
import logo from '../assets/logo_dark.svg';
import { FaHome, FaInfoCircle, FaProjectDiagram, FaUsers } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/signin' ||
    location.pathname === '/signup' ||
    location.pathname === '/forgot-password';

  const textColorClass = isAuthPage ? 'text-white' : 'text-black';

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

  return (
    <>
      {/* Top Nav */}
      <div className="fixed top-0 left-0 w-full z-10 px-4 md:px-20 lg:px-32 bg-transparent backdrop-blur-sm py-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between w-full font-bold">
          {/* Logo */}
          <img src={logo} alt="Gym Logo" className="w-20" />

          {/* Center Nav */}
          <div className="flex space-x-6 justify-center flex-1">
            {navItems.map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full hover:bg-red-400 transition font-semibold ${textColorClass}`}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          {/* Right (Signin only, no Signup) */}
          {!isAuthPage && (
            <Link to="/signin">
              <button className="bg-white px-6 py-2 rounded-full hover:bg-red-400 hover:text-white transition font-semibold text-black">
                Signin
              </button>
            </Link>
          )}
        </div>

        {/* Mobile header */}
        <div className="flex justify-between items-center md:hidden">
          <img src={logo} alt="Gym Logo" className="w-20" />
          <img
            src={menu_icon}
            alt="menu-icon"
            className="w-7 cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-300 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center p-6 bg-transparent backdrop-blur-sm">
          <img src={logo} alt="Gym Logo" className="w-20" />
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
                className="flex items-center gap-2 px-5 py-2 rounded-full hover:bg-red-400 transition font-semibold"
              >
                {icon} {label}
              </button>
            </li>
          ))}

          {!isAuthPage && (
            <li>
              <Link
                to="/signin"
                onClick={() => setIsMenuOpen(false)}
                className="bg-red-400 text-black px-6 py-2 mt-4 rounded-full font-semibold"
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

