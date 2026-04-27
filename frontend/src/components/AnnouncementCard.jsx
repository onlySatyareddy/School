import React from 'react';
import { Megaphone, Clock } from 'lucide-react';

const AnnouncementCard = ({ announcement }) => {
  const getPriorityColor = (p) => {
    switch(p) {
      case 'high': return '#ff4d4d';
      case 'medium': return '#FFD700';
      default: return '#4DA6FF';
    }
  };

  return (
    <div className="glass-card" style={{ padding: '1.2rem', marginBottom: '1rem', borderLeft: `4px solid ${getPriorityColor(announcement.priority)}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.8rem' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>{announcement.title}</h4>
        <Megaphone size={18} color={getPriorityColor(announcement.priority)} />
      </div>
      <p style={{ color: '#B0BCCB', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
        {announcement.content}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontSize: '0.8rem' }}>
        <Clock size={14} />
        <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default AnnouncementCard;
