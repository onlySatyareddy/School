import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, User } from 'lucide-react';

const MarksModal = ({ isOpen, onClose, studentName }) => {
  const [marks, setMarks] = useState({ math: '', science: '', english: '' });

  const handleSave = () => {
    // Logic to save marks
    alert(`Marks saved for ${studentName}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)' }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card"
            style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', background: 'rgba(77, 166, 255, 0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User color="#4DA6FF" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem' }}>Post Marks</h3>
                  <p style={{ fontSize: '0.8rem', color: '#B0BCCB' }}>{studentName}</p>
                </div>
              </div>
              <X style={{ cursor: 'pointer', color: '#B0BCCB' }} onClick={onClose} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {['Math', 'Science', 'English'].map((sub) => (
                <div key={sub}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#B0BCCB' }}>{sub} Score</label>
                  <input 
                    type="number" 
                    className="glass-card" 
                    placeholder="Enter score"
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(255,255,255,0.05)' }}
                    value={marks[sub.toLowerCase()]}
                    onChange={(e) => setMarks({...marks, [sub.toLowerCase()]: e.target.value})}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
              <button className="btn-glass" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
              <button className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} onClick={handleSave}>
                <Save size={18} /> Save Marks
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MarksModal;
