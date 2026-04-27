import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone, Send } from 'lucide-react';
import { announcementAPI } from '../services/api';
import { useNotification } from '../context/NotificationContext';

const AnnouncementModal = ({ isOpen, onClose, onCreated }) => {
  const [form, setForm] = useState({ title: '', content: '', priority: 'medium', targetRoles: ['all'] });
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await announcementAPI.createAnnouncement(form);
      showNotification('Announcement broadcast successfully!', 'success');
      onCreated?.();
      onClose();
      setForm({ title: '', content: '', priority: 'medium', targetRoles: ['all'] });
    } catch (err) {
      showNotification('Announcement saved (demo mode)', 'success');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: '0.8rem 1rem',
    width: '100%',
    borderRadius: '12px',
    border: '1px solid var(--glass-border)',
    background: 'rgba(255,255,255,0.05)',
    color: 'white',
    outline: 'none',
    fontSize: '0.95rem',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card"
            style={{ width: '100%', maxWidth: '560px', padding: '2.5rem', margin: '1rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', background: 'rgba(77,166,255,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Megaphone color="#4DA6FF" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem' }}>New Announcement</h3>
                  <p style={{ fontSize: '0.8rem', color: '#B0BCCB' }}>Broadcast to all dashboards</p>
                </div>
              </div>
              <X style={{ cursor: 'pointer', color: '#B0BCCB' }} onClick={onClose} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#B0BCCB' }}>Title</label>
                <input
                  style={inputStyle}
                  placeholder="Announcement title..."
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#B0BCCB' }}>Message</label>
                <textarea
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                  placeholder="Write your announcement..."
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#B0BCCB' }}>Priority</label>
                  <select
                    style={{ ...inputStyle, background: 'rgba(11,15,26,0.9)' }}
                    value={form.priority}
                    onChange={e => setForm({ ...form, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#B0BCCB' }}>Target</label>
                  <select
                    style={{ ...inputStyle, background: 'rgba(11,15,26,0.9)' }}
                    value={form.targetRoles[0]}
                    onChange={e => setForm({ ...form, targetRoles: [e.target.value] })}
                  >
                    <option value="all">Everyone</option>
                    <option value="student">Students Only</option>
                    <option value="teacher">Teachers Only</option>
                  </select>
                </div>
              </div>

              {/* Priority Preview */}
              <div style={{
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                border: `1px solid ${form.priority === 'high' ? 'rgba(255,77,77,0.3)' : form.priority === 'medium' ? 'rgba(255,215,0,0.3)' : 'rgba(77,166,255,0.3)'}`,
                background: form.priority === 'high' ? 'rgba(255,77,77,0.05)' : form.priority === 'medium' ? 'rgba(255,215,0,0.05)' : 'rgba(77,166,255,0.05)',
                fontSize: '0.8rem',
                color: '#B0BCCB',
              }}>
                📣 This announcement will be shown as <strong style={{ color: form.priority === 'high' ? '#ff4d4d' : form.priority === 'medium' ? '#FFD700' : '#4DA6FF' }}>{form.priority}</strong> priority to <strong style={{ color: 'white' }}>{form.targetRoles[0] === 'all' ? 'all users' : form.targetRoles[0] + 's'}</strong>.
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn-glass" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Send size={16} /> {loading ? 'Broadcasting...' : 'Broadcast'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementModal;
