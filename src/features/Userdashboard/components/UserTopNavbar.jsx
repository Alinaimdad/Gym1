
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiUser,
  FiSettings,
} from "react-icons/fi";

// (Same routes)
const ROUTES = [ /* same as before */ ];

const UserTopNavbar = () => {
  const [focused, setFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const notifications = [ /* same as before */ ];

  const filteredRoutes = useMemo(() => {
    const q = query.toLowerCase();
    return ROUTES.filter((r) => r.label.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const handler = (e) => {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const go = (to) => {
    setPaletteOpen(false);
    navigate(to);
  };

  const logout = () => {
    navigate("/");
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 right-0 z-40 h-16 bg-gradient-to-r from-red-600 to-black text-white flex items-center justify-between px-4 md:px-6 shadow"
      >
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05, duration: 0.2 }}
          className="flex items-center space-x-3"
        >
          <h2 className="text-xl font-bold tracking-wide whitespace-nowrap">
            Gym User Panel
          </h2>
        </motion.div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <motion.div
            initial={false}
            animate={{ width: focused ? 300 : 256 }}
            className="relative hidden md:block"
          >
            <button
              onClick={() => {
                setPaletteOpen(true);
                setQuery(searchInputRef.current?.value || "");
              }}
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-900 to-black text-white p-1.5 rounded-md hover:opacity-90"
            >
              <FiSearch />
            </button>

            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search (⌘/Ctrl + K)…"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPaletteOpen(true);
                  setQuery(e.target.value);
                }
              }}
              className={`pl-10 pr-3 py-2 rounded-md bg-white text-black w-full
                          border ${
                            focused
                              ? "border-gray-900 ring-2 ring-red-500/40"
                              : "border-gray-800"
                          }
                          transition-all duration-200 outline-none`}
            />
          </motion.div>

          {/* Mobile search icon */}
          <button
            className="md:hidden p-2 rounded hover:bg-white/10"
            onClick={() => setPaletteOpen(true)}
          >
            <FiSearch className="text-xl" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              className="relative p-2 rounded hover:bg-white/10"
              onClick={() => {
                setNotifOpen((p) => !p);
                setUserMenuOpen(false);
              }}
            >
              <FiBell className="text-xl" />
              {notifications.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-[10px] rounded-full px-1">
                  {notifications.length}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 mt-2 w-72 bg-white text-black rounded shadow-lg overflow-hidden"
                >
                  <div className="px-3 py-2 font-semibold text-sm bg-gray-100">
                    Notifications
                  </div>
                  <ul className="max-h-72 overflow-auto">
                    {notifications.map((n) => (
                      <li key={n.id} className="px-3 py-2 border-b text-sm">
                        <p className="font-medium">{n.text}</p>
                        <p className="text-xs text-gray-500">{n.time}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setUserMenuOpen((p) => !p);
                setNotifOpen(false);
              }}
              className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-md"
            >
              <span className="text-sm opacity-90 hidden sm:block">
                admin@gym.com
              </span>
              <FiChevronDown className="opacity-80" />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg overflow-hidden"
                >
                  <LinkItem to="/dashboard/profile" icon={<FiUser />}>
                    Profile
                  </LinkItem>
                  <LinkItem to="/dashboard/settings" icon={<FiSettings />}>
                    Settings
                  </LinkItem>

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-red-600 hover:bg-gray-100 text-sm"
                  >
                    <FiLogOut /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      {/* Command Palette */}
      {/* Same as before (no change) */}
    </>
  );
};

export default UserTopNavbar;

const LinkItem = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm"
  >
    {icon}
    {children}
  </Link>
);
