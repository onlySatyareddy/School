import React from 'react';
import { Calendar as CalendarIcon, Clock, BookOpen } from 'lucide-react';

const AcademicSchedule = () => {
  const schedule = [
    { day: 'Monday', time: '09:00 AM', subject: 'Advanced Mathematics', room: '3D Lab 1' },
    { day: 'Monday', time: '11:00 AM', subject: 'Physics of Motion', room: 'Science Hub' },
    { day: 'Tuesday', time: '10:00 AM', subject: 'Generative AI Basics', room: 'Neural Center' },
    { day: 'Wednesday', time: '02:00 PM', subject: 'History of Digital Art', room: 'Creative Studio' }
  ];

  return (
    <div className="glass-card">
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <CalendarIcon color="#4DA6FF" /> Weekly Schedule
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {schedule.map((item, i) => (
          <div key={i} className="glass-card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '45px', height: '45px', background: 'rgba(179, 136, 255, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={20} color="#B388FF" />
              </div>
              <div>
                <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{item.subject}</p>
                <p style={{ fontSize: '0.8rem', color: '#B0BCCB' }}>{item.room}</p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--primary-color)' }}>{item.day}</p>
              <p style={{ fontSize: '0.8rem', color: '#B0BCCB', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                <Clock size={12} /> {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-glass" style={{ width: '100%', marginTop: '1.5rem' }}>Sync with Calendar</button>
    </div>
  );
};

export default AcademicSchedule;
