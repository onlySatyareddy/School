import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import { announcementAPI, studentAPI } from '../services/api';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { AlertTriangle, TrendingUp, Calendar, Book, Megaphone, Award } from 'lucide-react';
import AnnouncementCard from '../components/AnnouncementCard';
import AcademicSchedule from '../components/AcademicSchedule';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const StudentDashboard = () => {
  const location = useLocation();
  const [announcements, setAnnouncements] = useState([]);
  const [insights, setInsights] = useState([]);

  const isOverview = location.pathname === '/student' || location.pathname === '/student/';

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [annRes, insRes] = await Promise.all([
          announcementAPI.getAnnouncements(),
          studentAPI.getInsights()
        ]);
        setAnnouncements(annRes.data);
        setInsights(insRes.data);
      } catch (err) {
        // Fallback
        setAnnouncements([{ title: "Welcome!", content: "Welcome to your 3D portal.", priority: "low", createdAt: new Date() }]);
        setInsights([{ type: 'attendance', message: "Your attendance is 70%. Try to improve it.", severity: 'high' }]);
      }
    };
    fetchDashboard();
  }, []);

  const attendanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Attendance %',
      data: [95, 92, 88, 70, 75],
      borderColor: '#4DA6FF',
      backgroundColor: 'rgba(77, 166, 255, 0.2)',
      fill: true,
      tension: 0.4
    }]
  };

  const performanceData = {
    labels: ['Math', 'Science', 'English', 'History', 'CS'],
    datasets: [{
      label: 'Marks',
      data: [85, 92, 78, 88, 95],
      backgroundColor: '#4DA6FF',
      borderRadius: 8
    }]
  };

  if (!isOverview) {
    const pageName = location.pathname.split('/').pop().replace('-', ' ');
    return (
      <div style={{ paddingTop: '150px', paddingBottom: '100px', paddingLeft: '5%', paddingRight: '5%', textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '4rem', maxWidth: '600px', width: '100%' }}>
          <h1 style={{ fontSize: '2.5rem', textTransform: 'capitalize', marginBottom: '1rem' }}>{pageName} Module</h1>
          <p style={{ color: '#B0BCCB', fontSize: '1.1rem', lineHeight: 1.6 }}>This student portal module is currently under development and will be released in the next update.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', padding: '2rem 5%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Student Portal</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={20} color="#4DA6FF" />
            <span>Academic Year: 2026-27</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid-2-1" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* AI Insights Bar */}
          {insights.map((insight, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="glass-card" 
              style={{ 
                background: insight.severity === 'high' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(255, 215, 0, 0.1)', 
                border: insight.severity === 'high' ? '1px solid rgba(255, 77, 77, 0.2)' : '1px solid rgba(255, 215, 0, 0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem',
                marginBottom: '1rem'
              }}
            >
              <AlertTriangle color={insight.severity === 'high' ? '#ff4d4d' : '#FFD700'} size={30} />
              <div>
                <h4 style={{ color: insight.severity === 'high' ? '#ff4d4d' : '#FFD700' }}>AI Insight: {insight.type.toUpperCase()}</h4>
                <p style={{ color: '#B0BCCB', fontSize: '0.9rem' }}>{insight.message}</p>
              </div>
            </motion.div>
          ))}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {/* Attendance Chart */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '1.5rem' }}>Attendance Trends</h3>
              <Line data={attendanceData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>

            {/* Performance Chart */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '1.5rem' }}>Subject Performance</h3>
              <Bar data={performanceData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </div>

        {/* Sidebar Announcements & Schedule */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <AcademicSchedule />
          
          <div className="glass-card" style={{ height: 'fit-content' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Megaphone color="#4DA6FF" /> Campus News</h3>
            <div style={{ overflowY: 'auto', maxHeight: '350px', paddingRight: '0.5rem' }}>
              {announcements.map((news, i) => (
                <AnnouncementCard key={i} announcement={news} />
              ))}
            </div>
            <button className="btn-glass" style={{ width: '100%', marginTop: '1rem' }}>View All Updates</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {[
          { label: "GPA", value: "3.8", icon: <TrendingUp color="#4DA6FF" /> },
          { label: "Completed Units", value: "24/30", icon: <Book color="#4DA6FF" /> },
          { label: "Rank", value: "#5", icon: <Award color="#4DA6FF" /> }
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>{stat.icon}</div>
            <p style={{ color: '#B0BCCB', marginBottom: '0.5rem' }}>{stat.label}</p>
            <h2 style={{ fontSize: '2rem' }}>{stat.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
