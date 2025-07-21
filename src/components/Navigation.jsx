import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import QRModal from './QRModal';
import AppLogo from './AppLogo';

const { FiQrCode } = FiIcons;

const Navigation = () => {
  const location = useLocation();
  const [showQRModal, setShowQRModal] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/worksheet', label: 'Worksheet' },
    { path: '/links', label: 'Links' },
  ];

  const appUrl = window.location.origin + window.location.pathname;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-700 z-50"
      >
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Navigation Items */}
              <div className="flex items-center gap-6">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                        isActive
                          ? 'text-electric-blue bg-electric-blue/10'
                          : 'text-gray-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Logo aligned with menu items */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQRModal(true)}
                className="transition-all duration-200"
              >
                <AppLogo />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Logo Section */}
          <div className="max-w-7xl mx-auto px-8 py-3 border-b border-slate-700">
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQRModal(true)}
                className="transition-all duration-200"
              >
                <AppLogo />
              </motion.button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="max-w-7xl mx-auto px-8 py-3">
            <div className="flex items-center justify-center">
              {/* Navigation Items */}
              <div className="flex items-center gap-6">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                        isActive
                          ? 'text-electric-blue bg-electric-blue/10'
                          : 'text-gray-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <QRModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        url={appUrl}
      />
    </>
  );
};

export default Navigation;