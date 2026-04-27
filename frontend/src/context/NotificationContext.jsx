import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="glass-card"
              style={{ 
                padding: '1rem 1.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                minWidth: '300px',
                borderLeft: `4px solid ${n.type === 'success' ? '#00E676' : '#ff4d4d'}`
              }}
            >
              {n.type === 'success' ? <CheckCircle color="#00E676" /> : <AlertCircle color="#ff4d4d" />}
              <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{n.message}</span>
              <X 
                size={16} 
                style={{ marginLeft: 'auto', cursor: 'pointer', color: '#B0BCCB' }} 
                onClick={() => setNotifications((prev) => prev.filter((nt) => nt.id !== n.id))}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
