import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck } = FiIcons;

const QRSelector = ({ qrCodes, selectedQRs, onSelectionChange }) => {
  if (qrCodes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 bg-dark-card rounded-2xl border border-dark-border"
      >
        <div className="text-gray-400 text-lg">
          No QR codes available. Create some QR codes first!
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-card rounded-2xl p-6 border border-dark-border"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Select QR Codes for Worksheet
      </h2>

      <div className="space-y-4">
        {qrCodes.map((qr, index) => {
          const isSelected = selectedQRs.includes(qr.id);
          const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr.url)}&size=100x100`;

          return (
            <motion.div
              key={qr.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-electric-blue bg-electric-blue/10 shadow-electric'
                  : 'border-dark-border hover:border-gray-500'
              }`}
              onClick={() => onSelectionChange(qr.id, !isSelected)}
            >
              <div className="flex-shrink-0">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? 'border-electric-blue bg-electric-blue'
                    : 'border-gray-400'
                }`}>
                  {isSelected && <SafeIcon icon={FiCheck} className="w-4 h-4 text-white" />}
                </div>
              </div>

              <div className="flex-shrink-0">
                <img
                  src={qrImageUrl}
                  alt={`QR Code for ${qr.title}`}
                  className="w-12 h-12 object-contain bg-white rounded-lg p-1"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">
                  {qr.title}
                </h3>
                {qr.description && (
                  <p className="text-gray-400 text-sm truncate">
                    {qr.description}
                  </p>
                )}
                <p className="text-gray-500 text-xs truncate">
                  {qr.url}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedQRs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-electric-blue/10 border border-electric-blue/30 rounded-lg"
        >
          <p className="text-electric-blue font-medium">
            {selectedQRs.length} QR code{selectedQRs.length !== 1 ? 's' : ''} selected
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QRSelector;