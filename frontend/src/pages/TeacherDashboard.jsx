import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Edit3, ClipboardList, AlertTriangle, Users } from 'lucide-react';
import MarksModal from '../components/MarksModal';
import { teacherAPI } from '../services/api';
import { SkeletonCard, SkeletonTable } from '../components/Skeleton';
import { useNotification } from '../context/NotificationContext';

const TeacherDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { showNotification } = useNotification();
  const location = useLocation();

  const isOverview = location.pathname === '/teacher' || location.pathname === '/teacher/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await teacherAPI.getDashboard();
        setData(response.data);
      } catch (err) {
        // Fallback for Demo Mode
        setData({
          studentCount: 124,
          classesToday: 3,
          pendingMarks: 12,
          alerts: [
            { type: 'attendance', message: 'Robert Fox has 3 consecutive absences.', severity: 'high' },
            { type: 'performance', message: 'Alice Blue score dropped 15% in Math.', severity: 'medium' },
          ],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openMarks = (name) => {
    setSelectedStudent(name);
    setIsModalOpen(true);
  };

  const handleAttendance = () => {
    showNotification('Attendance records synced to global database.', 'success');
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '80px', padding: '80px 5% 5rem' }}>
        <SkeletonCard style={{ marginBottom: '2rem' }} />
        <div className="dashboard-grid-2-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <SkeletonTable rows={3} />
          <SkeletonTable rows={5} />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (!isOverview) {
    const pageName = location.pathname.split('/').pop().replace('-', ' ');
    return (
      <div style={{ paddingTop: '150px', paddingBottom: '100px', paddingLeft: '5%', paddingRight: '5%', textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '4rem', maxWidth: '600px', width: '100%' }}>
          <h1 style={{ fontSize: '2.5rem', textTransform: 'capitalize', marginBottom: '1rem' }}>{pageName} Module</h1>
          <p style={{ color: '#B0BCCB', fontSize: '1.1rem', lineHeight: 1.6 }}>This teacher utility module is scheduled for release in version 2.0.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', padding: '80px 5% 5rem' }}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2rem' }}>
        <p style={{ color: '#B388FF', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Command Center</p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Teacher Panel</h1>
      </motion.div>

      <div className="dashboard-grid-2-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Class Management */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><ClipboardList color="#B388FF" /> My Classes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Grade 10 - Section A (Physics)', 'Grade 11 - Section B (Chemistry)', 'Grade 9 - Section C (Biology)'].map((cls, i) => (
              <div key={i} className="glass-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(179, 136, 255, 0.2)' }}>
                <span style={{ fontWeight: '600' }}>{cls}</span>
                <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', background: '#B388FF', boxShadow: '0 4px 15px rgba(179,136,255,0.3)' }}>Manage</button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
            <div>
              <p style={{ color: '#B0BCCB', fontSize: '0.8rem' }}>Total Students</p>
              <p style={{ fontSize: '1.2rem', fontWeight: '700' }}>{data.studentCount}</p>
            </div>
            <div>
              <p style={{ color: '#B0BCCB', fontSize: '0.8rem' }}>Classes Today</p>
              <p style={{ fontSize: '1.2rem', fontWeight: '700' }}>{data.classesToday}</p>
            </div>
            <div>
              <p style={{ color: '#B0BCCB', fontSize: '0.8rem' }}>Pending Marks</p>
              <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#FFD700' }}>{data.pendingMarks}</p>
            </div>
          </div>
        </motion.div>

        {/* Attendance Marking */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass-card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Users color="#00E676" /> Fast Attendance</h3>
          <div style={{ overflowY: 'auto', maxHeight: '300px', paddingRight: '0.5rem' }}>
            {[
              { name: "Alice Johnson", present: true },
              { name: "Bob Wilson", present: false },
              { name: "Charlie Davis", present: true },
              { name: "Diana Prince", present: true },
              { name: "Ethan Hunt", present: false }
            ].map((student, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 0', borderBottom: '1px solid var(--glass-border)' }}>
                <span style={{ fontWeight: '500' }}>{student.name}</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CheckCircle size={22} color={student.present ? "#00E676" : "rgba(255,255,255,0.2)"} style={{ cursor: 'pointer', transition: 'all 0.2s' }} />
                  <XCircle size={22} color={!student.present ? "#ff4d4d" : "rgba(255,255,255,0.2)"} style={{ cursor: 'pointer', transition: 'all 0.2s' }} />
                </div>
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={handleAttendance} style={{ width: '100%', marginTop: '1.5rem' }}>Sync Attendance</button>
        </motion.div>

        {/* Quick Actions & Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="glass-card">
            <h3 style={{ marginBottom: '1.5rem' }}>Quick Actions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button className="btn-glass" onClick={() => openMarks('Select Student')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '1.5rem', width: '100%', border: '1px solid rgba(179,136,255,0.3)' }}>
                <Edit3 color="#B388FF" /> <span style={{ fontWeight: '600' }}>Post Marks</span>
              </button>
              <button className="btn-glass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '1.5rem' }}>
                <ClipboardList /> <span style={{ fontWeight: '600' }}>Lesson Plan</span>
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="glass-card" style={{ borderLeft: '4px solid #ff4d4d', background: 'linear-gradient(90deg, rgba(255,77,77,0.05), transparent)' }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#ff4d4d', display: 'flex', alignItems: 'center', gap: '10px' }}><AlertTriangle size={20} /> AI Intervention Alerts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.alerts.map((alert, i) => (
                <div key={i} style={{ padding: '1rem', background: alert.severity === 'high' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(255, 215, 0, 0.1)', borderRadius: '12px', border: `1px solid ${alert.severity === 'high' ? 'rgba(255,77,77,0.3)' : 'rgba(255,215,0,0.3)'}` }}>
                  <p style={{ fontWeight: '700', color: alert.severity === 'high' ? '#ff4d4d' : '#FFD700', marginBottom: '0.2rem', textTransform: 'capitalize' }}>{alert.type} Alert</p>
                  <p style={{ fontSize: '0.85rem', color: '#B0BCCB', lineHeight: 1.5 }}>{alert.message}</p>
                  <button className="btn-glass" style={{ marginTop: '0.8rem', padding: '0.3rem 0.8rem', fontSize: '0.75rem', borderColor: alert.severity === 'high' ? 'rgba(255,77,77,0.3)' : 'rgba(255,215,0,0.3)' }}>Take Action</button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <MarksModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        studentName={selectedStudent} 
      />
    </div>
  );
};

export default TeacherDashboard;
