import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-left mb-8"
    >
      <h1 className="text-4xl font-bold bg-blue-gradient bg-clip-text text-transparent mb-2">
        {title}
      </h1>
      <p className="text-gray-400 mb-6">{subtitle}</p>
    </motion.div>
  );
};

export default PageHeader;