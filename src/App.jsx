import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import WorksheetPage from './pages/WorksheetPage';
import LinksPage from './pages/LinksPage';
import { QRProvider } from './context/QRContext';

function App() {
  const [qrCodes, setQrCodes] = useState([]);

  // Load saved QR codes from localStorage
  useEffect(() => {
    const savedQRs = localStorage.getItem('qrios-codes');
    if (savedQRs) {
      setQrCodes(JSON.parse(savedQRs));
    }
  }, []);

  // Save QR codes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('qrios-codes', JSON.stringify(qrCodes));
  }, [qrCodes]);

  const addQRCode = (qrData) => {
    const newQR = {
      id: Date.now(),
      ...qrData,
      createdAt: new Date().toISOString(),
    };
    setQrCodes(prev => [newQR, ...prev]);
  };

  const deleteQRCode = (id) => {
    setQrCodes(prev => prev.filter(qr => qr.id !== id));
  };

  return (
    <QRProvider value={{ qrCodes, addQRCode, deleteQRCode }}>
      <Router>
        <div className="min-h-screen bg-dark-bg text-white font-sans">
          <Navigation />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pt-20"
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/worksheet" element={<WorksheetPage />} />
              <Route path="/links" element={<LinksPage />} />
            </Routes>
          </motion.div>
        </div>
      </Router>
    </QRProvider>
  );
}

export default App;