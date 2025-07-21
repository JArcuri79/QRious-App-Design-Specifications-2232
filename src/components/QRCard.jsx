import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQR } from '../context/QRContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import html2canvas from 'html2canvas';

const { FiExternalLink, FiCopy, FiTrash2, FiCheck, FiDownload, FiImage } = FiIcons;

const QRCard = ({ qr }) => {
  const { deleteQRCode } = useQR();
  const [copied, setCopied] = useState(false);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr.url)}&size=600x600`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(qr.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleCopyImage = async () => {
    try {
      const element = document.getElementById(`qr-tile-${qr.id}`);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: 'transparent',
      });
      
      canvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          alert('QR code image copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy image to clipboard:', err);
        }
      });
    } catch (err) {
      console.error('Failed to copy image: ', err);
    }
  };

  const handleDownloadTile = async () => {
    try {
      const element = document.getElementById(`qr-tile-${qr.id}`);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: 'transparent',
      });
      
      const link = document.createElement('a');
      link.download = `qr-${qr.title.replace(/[^a-zA-Z0-9]/g, '-')}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (err) {
      console.error('Failed to download tile: ', err);
    }
  };

  const handleOpenLink = () => {
    window.open(qr.url, '_blank');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this QR code?')) {
      deleteQRCode(qr.id);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-dark-card rounded-2xl p-6 border border-dark-border shadow-lg"
    >
      {/* QR Tile */}
      <div
        id={`qr-tile-${qr.id}`}
        className="bg-blue-gradient p-4 rounded-xl mb-4 aspect-square flex flex-col items-center justify-center relative"
      >
        {/* White frame container for QR code */}
        <div className="bg-white p-6 rounded-lg border-4 border-white flex items-center justify-center w-full h-full max-w-[85%] max-h-[85%]">
          <img
            src={qrImageUrl}
            alt={`QR Code for ${qr.title}`}
            className="w-full h-full object-contain"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
        
        {/* Title positioned at the bottom - no overlay */}
        <div className="absolute bottom-2 left-2 right-2 px-3 py-2">
          <h3 className="text-black font-bold text-center text-sm leading-tight">
            {qr.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      {qr.description && (
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {qr.description}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-3 py-2 bg-blue-gradient text-white text-sm rounded-lg hover:shadow-electric transition-all"
        >
          <SafeIcon icon={copied ? FiCheck : FiCopy} className="w-4 h-4" />
          {copied ? 'Copied!' : 'Link'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyImage}
          className="flex items-center gap-2 px-3 py-2 bg-blue-gradient text-white text-sm rounded-lg hover:shadow-electric transition-all"
        >
          <SafeIcon icon={FiImage} className="w-4 h-4" />
          Copy
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadTile}
          className="flex items-center gap-2 px-3 py-2 bg-blue-gradient text-white text-sm rounded-lg hover:shadow-electric transition-all"
        >
          <SafeIcon icon={FiDownload} className="w-4 h-4" />
          Save
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenLink}
          className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600 transition-all"
        >
          <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
          Open
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-500 transition-all"
        >
          <SafeIcon icon={FiTrash2} className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QRCard;