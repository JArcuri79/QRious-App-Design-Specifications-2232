import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LinksWorksheetPreview from '../components/LinksWorksheetPreview';
import WorksheetExport from '../components/WorksheetExport';
import PageHeader from '../components/PageHeader';

const LinksPage = () => {
  const [worksheetTitle, setWorksheetTitle] = useState('QR Code Worksheet');
  const [linksData, setLinksData] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [parsedQRData, setParsedQRData] = useState([]);

  const parseLinksData = (data) => {
    const lines = data.trim().split('\n');
    const qrData = [];
    
    lines.forEach((line, index) => {
      const parts = line.split('/');
      if (parts.length >= 2) {
        const title = parts[0].trim();
        const url = parts.slice(1).join('/').trim();
        
        if (title && url) {
          qrData.push({
            id: `link-${index}`,
            title,
            url,
            description: '',
          });
        }
      }
    });
    
    return qrData;
  };

  const handleGenerateWorksheet = () => {
    if (linksData.trim()) {
      const parsed = parseLinksData(linksData);
      setParsedQRData(parsed);
      setShowPreview(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-dark-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 pt-24">
        <PageHeader 
          title="Quick Links Worksheet"
          subtitle="Generate worksheets from batch text input"
        />

        {!showPreview ? (
          <div className="space-y-6">
            <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
              <div className="space-y-4">
                <div>
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

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Links Data
                  </label>
                  <p className="text-gray-400 text-sm mb-2">
                    Enter your titles and URLs in the format: Title1/url1 (one per line)
                  </p>
                  <textarea
                    value={linksData}
                    onChange={(e) => setLinksData(e.target.value)}
                    placeholder="Math Lesson 1/https://example.com/math1&#10;Science Quiz/https://example.com/science&#10;History Video/https://example.com/history"
                    rows="10"
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {linksData.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <button
                  onClick={handleGenerateWorksheet}
                  className="px-8 py-3 bg-blue-gradient text-white font-semibold rounded-lg shadow-electric hover:shadow-electric-strong transition-all duration-200 transform hover:scale-105"
                >
                  Generate Worksheet ({parseLinksData(linksData).length} QR codes)
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
                ← Back to Input
              </button>
              <WorksheetExport selectedQRData={parsedQRData} worksheetTitle={worksheetTitle} />
            </div>
            
            <LinksWorksheetPreview selectedQRData={parsedQRData} worksheetTitle={worksheetTitle} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LinksPage;