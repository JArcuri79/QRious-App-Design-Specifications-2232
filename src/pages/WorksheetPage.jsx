import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQR } from '../context/QRContext';
import QRSelector from '../components/QRSelector';
import WorksheetPreview from '../components/WorksheetPreview';
import WorksheetExport from '../components/WorksheetExport';
import PageHeader from '../components/PageHeader';

const WorksheetPage = () => {
  const { qrCodes } = useQR();
  const [selectedQRs, setSelectedQRs] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [worksheetTitle, setWorksheetTitle] = useState('QR Code Worksheet');

  const handleSelectionChange = (qrId, isSelected) => {
    if (isSelected) {
      setSelectedQRs(prev => [...prev, qrId]);
    } else {
      setSelectedQRs(prev => prev.filter(id => id !== qrId));
    }
  };

  const handleGenerateWorksheet = () => {
    if (selectedQRs.length > 0) {
      setShowPreview(true);
    }
  };

  const selectedQRData = qrCodes.filter(qr => selectedQRs.includes(qr.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-dark-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 pt-24">
        <PageHeader 
          title="Worksheet Builder"
          subtitle="Create printable QR code worksheets"
        />

        {!showPreview ? (
          <div className="space-y-6">
            <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Worksheet Title
              </label>
              <input
                type="text"
                value={worksheetTitle}
                onChange={(e) => setWorksheetTitle(e.target.value)}
                placeholder="Enter worksheet title"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
              />
            </div>

            <QRSelector
              qrCodes={qrCodes}
              selectedQRs={selectedQRs}
              onSelectionChange={handleSelectionChange}
            />
            
            {selectedQRs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <button
                  onClick={handleGenerateWorksheet}
                  className="px-8 py-3 bg-blue-gradient text-white font-semibold rounded-lg shadow-electric hover:shadow-electric-strong transition-all duration-200 transform hover:scale-105"
                >
                  Generate Worksheet ({selectedQRs.length} QR codes)
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                ← Back to Selection
              </button>
              <WorksheetExport selectedQRData={selectedQRData} worksheetTitle={worksheetTitle} />
            </div>
            
            <WorksheetPreview selectedQRData={selectedQRData} worksheetTitle={worksheetTitle} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WorksheetPage;