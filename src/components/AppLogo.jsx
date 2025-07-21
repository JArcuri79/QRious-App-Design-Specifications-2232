import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiEye } = FiIcons;

const AppLogo = ({ className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-3 ${className}`}
    >
      <h2 className="text-2xl font-bold bg-blue-gradient bg-clip-text text-transparent">
        QRIOS
      </h2>
      <div className="w-10 h-10 bg-blue-gradient rounded-xl flex items-center justify-center">
        <SafeIcon icon={FiEye} className="w-6 h-6 text-white" />
      </div>
    </motion.div>
  );
};

export default AppLogo;