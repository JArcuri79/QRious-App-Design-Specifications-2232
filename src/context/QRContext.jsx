import React, { createContext, useContext } from 'react';

const QRContext = createContext();

export const QRProvider = ({ children, value }) => {
  return (
    <QRContext.Provider value={value}>
      {children}
    </QRContext.Provider>
  );
};

export const useQR = () => {
  const context = useContext(QRContext);
  if (!context) {
    throw new Error('useQR must be used within a QRProvider');
  }
  return context;
};