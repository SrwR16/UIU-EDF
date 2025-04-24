import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Events', href: '/events' },
  { name: 'Leadership', href: '/leadership' },
  { name: 'Showcase', href: '/showcase' },
  { name: 'Alumni', href: '/alumni' },
  { name: 'Notices', href: '/notices' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-orange-100 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold text-orange-600 tracking-tight">
            UEDF
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/membership"
              className="ml-4 px-4 py-2 bg-orange-600 text-white text-sm font-semibold rounded-md hover:bg-black transition-colors"
            >
              Join Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 hover:text-orange-600 p-2 rounded-md focus:outline-none"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-orange-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/membership"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center px-4 py-2 rounded-md text-base font-semibold bg-orange-600 text-white hover:bg-black transition-colors"
              >
                Join Now
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;