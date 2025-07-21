import React from 'react';
import { motion } from 'framer-motion';
import { useQR } from '../context/QRContext';
import QRCard from './QRCard';

const QRList = () => {
  const { qrCodes } = useQR();

  if (qrCodes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-12"
      >
        <div className="text-gray-400 text-lg">
          No QR codes yet. Create your first one above!
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Saved QR Codes ({qrCodes.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qrCodes.map((qr, index) => (
          <motion.div
            key={qr.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <QRCard qr={qr} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QRList;