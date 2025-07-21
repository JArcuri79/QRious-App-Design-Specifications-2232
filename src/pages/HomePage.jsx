import React from 'react';
import { motion } from 'framer-motion';
import QRGenerator from '../components/QRGenerator';
import QRList from '../components/QRList';
import PageHeader from '../components/PageHeader';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-dark-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 pt-24">
        <PageHeader 
          title="Generate & Manage QR Codes"
          subtitle="Create beautiful QR codes for your links"
        />

        <QRGenerator />
        <QRList />
      </div>
    </motion.div>
  );
};

export default HomePage;