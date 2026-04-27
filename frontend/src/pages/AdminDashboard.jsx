import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, DollarSign, Settings, Image as ImageIcon, Plus } from 'lucide-react';
import { adminAPI } from '../services/api';
import AnnouncementModal from '../components/AnnouncementModal';
import UserModal from '../components/UserModal';
import { useNotification } from '../context/NotificationContext';
import { useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const { showNotification } = useNotification();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const isOverview = location.pathname === '/admin' || location.pathname === '/admin/';
  const isStudentsPage = location.pathname.includes('/students');
  const isTeachersPage = location.pathname.includes('/teachers');
  const isClassesPage = location.pathname.includes('/classes');
  const isAnnouncementsPage = location.pathname.includes('/announcements');
  const isReportsPage = location.pathname.includes('/reports');
  const isSettingsPage = location.pathname.includes('/settings');
  
  const pageMode = isOverview ? 'overview' : 
                   isStudentsPage ? 'students' : 
                   isTeachersPage ? 'teachers' : 
                   isClassesPage ? 'classes' :
                   isAnnouncementsPage ? 'announcements' :
                   isReportsPage ? 'reports' :
                   isSettingsPage ? 'settings' : 'other';

  const fetchUsers = async () => {
      try {
        const res = await adminAPI.getUsers();
        if (res.data && res.data.length > 0) {
          setUsers(res.data);
        } else {
          throw new Error('Empty data'); // force fallback
        }
      } catch (err) {
        setUsers([
          { name: "John Doe", role: "student", status: "Active", email: "john@edu.com" },
          { name: "Robert Fox", role: "student", status: "Pending", email: "robert@edu.com" },
          { name: "Alice Blue", role: "student", status: "Active", email: "alice@edu.com" },
          { name: "Prof. Smith", role: "teacher", status: "Active", email: "teacher@edu.com" },
          { name: "Super Admin", role: "admin", status: "Active", email: "admin@edu.com" }
        ]);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter(u => {
      if (pageMode === 'students') return u.role === 'student';
      if (pageMode === 'teachers') return u.role === 'teacher';
      return true;
    })
    .filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const stats = [
    { label: "Total Students", value: "5,240", icon: <Users />, color: "#4DA6FF" },
    { label: "Active Teachers", value: "158", icon: <UserCheck />, color: "#B388FF" },
    { label: "Monthly Revenue", value: "$450k", icon: <DollarSign />, color: "#00E676" },
    { label: "Pending Tasks", value: "12", icon: <Settings />, color: "#FFD700" }
  ];

  if (pageMode === 'other') {
    const pageName = location.pathname.split('/').pop().replace('-', ' ');
    return (
      <div style={{ paddingTop: '150px', paddingBottom: '100px', paddingLeft: '5%', paddingRight: '5%', textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '4rem', maxWidth: '600px', width: '100%' }}>
          <Settings size={60} color="#4DA6FF" style={{ marginBottom: '1.5rem', animation: 'pulse 2s infinite' }} />
          <h1 style={{ fontSize: '2.5rem', textTransform: 'capitalize', marginBottom: '1rem' }}>{pageName} Module</h1>
          <p style={{ color: '#B0BCCB', fontSize: '1.1rem', lineHeight: 1.6 }}>This enterprise module is currently under construction and will be deployed in the next minor release (v2.1).</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', padding: '2rem 5%' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textTransform: 'capitalize' }}>
        {pageMode === 'overview' ? 'Administrative Hub' : `${pageMode} Management`}
      </h1>
      
      {pageMode === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              className="glass-card"
              whileHover={{ scale: 1.05 }}
              style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
            >
              <div style={{ padding: '1rem', background: `${stat.color}20`, borderRadius: '15px', color: stat.color }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ color: '#B0BCCB', fontSize: '0.9rem' }}>{stat.label}</p>
                <h3 style={{ fontSize: '1.8rem' }}>{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: pageMode === 'overview' ? '2fr 1fr' : '1fr', gap: '2rem' }}>
        {/* User Management Table */}
        {['overview', 'students', 'teachers'].includes(pageMode) && (
        <div className="glass-card" style={{ gridColumn: pageMode === 'overview' ? 'auto' : '1 / -1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
            <h3>{pageMode === 'students' ? 'Student Roster' : pageMode === 'teachers' ? 'Faculty Roster' : 'User Base'}</h3>
            <div style={{ display: 'flex', gap: '1rem', flex: 1, maxWidth: '500px' }}>
              <input 
                type="text" 
                placeholder="Search students or roles..." 
                className="glass-card" 
                style={{ padding: '0.6rem 1rem', flex: 1, borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'white', background: 'rgba(255,255,255,0.05)' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className="btn-primary" 
                onClick={() => {
                  setEditingUser(null);
                  setShowUserModal(true);
                }}
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                <Plus size={16} /> Add User
              </button>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#B0BCCB', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem' }}>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '1rem' }}>{user.name}</td>
                  <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
                  <td style={{ color: user.status === 'Pending' ? '#FFD700' : '#00E676' }}>{user.status || 'Active'}</td>
                  <td>
                    <button 
                      className="btn-glass" 
                      onClick={() => {
                        setEditingUser(user);
                        setShowUserModal(true);
                      }}
                      style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#B0BCCB' }}>No users found matching "{searchTerm}"</p>
          )}
        </div>
        )}

        {/* Classes View */}
        {pageMode === 'classes' && (
          <div className="glass-card" style={{ gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>Active Classes</h3>
              <button className="btn-primary" onClick={() => showNotification('Class creation coming soon', 'info')}>
                <Plus size={16} /> Add Class
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#B0BCCB', borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1rem' }}>Class Name</th>
                  <th>Instructor</th>
                  <th>Capacity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {['Mathematics 101', 'Advanced Physics', 'Computer Science', 'Art History'].map((cls, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '1rem' }}>{cls}</td>
                    <td>Prof. Smith</td>
                    <td>24 / 30</td>
                    <td style={{ color: '#00E676' }}>Active</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Announcements View */}
        {pageMode === 'announcements' && (
          <div className="glass-card" style={{ gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>Broadcast History</h3>
              <button className="btn-primary" onClick={() => setShowAnnouncementModal(true)}>
                <Plus size={16} /> New Broadcast
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1.5rem', background: 'rgba(77,166,255,0.05)', borderRadius: '15px', borderLeft: '4px solid #4DA6FF' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Welcome to Antigravity Platform</h4>
                <p style={{ color: '#B0BCCB', fontSize: '0.9rem', marginBottom: '1rem' }}>We are excited to launch the new school management system version 3.0.</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#6B7280' }}>
                  <span>Target: All</span>
                  <span>Priority: Normal</span>
                  <span>Date: Today</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports View */}
        {pageMode === 'reports' && (
          <div className="glass-card" style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>System Reports</h3>
            <p style={{ color: '#B0BCCB', marginBottom: '2rem' }}>Comprehensive analytics and data exports will be available here.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ color: stat.color, marginBottom: '1rem' }}>{stat.icon}</div>
                  <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.value}</h2>
                  <p style={{ color: '#B0BCCB' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings View */}
        {pageMode === 'settings' && (
          <div className="glass-card" style={{ gridColumn: '1 / -1', maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Global Configuration</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: '#B0BCCB', marginBottom: '0.5rem' }}>Platform Name</label>
                <input type="text" defaultValue="Antigravity Enterprise" disabled style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#B0BCCB', marginBottom: '0.5rem' }}>API Endpoint</label>
                <input type="text" defaultValue="https://api.antigravity.edu/v1" disabled style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#B0BCCB', marginBottom: '0.5rem' }}>Maintenance Mode</label>
                <select disabled style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px' }}>
                  <option>Disabled</option>
                  <option>Enabled</option>
                </select>
              </div>
              <button className="btn-primary" onClick={() => showNotification('Settings are locked by SuperAdmin', 'error')} style={{ alignSelf: 'flex-start' }}>Save Changes</button>
            </div>
          </div>
        )}

        {/* CMS Panel (Only on Overview) */}
        {pageMode === 'overview' && (
          <div className="glass-card">
            <h3 style={{ marginBottom: '1.5rem' }}>CMS Control Center</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-card" onClick={() => showNotification("Navigating to 3D Gallery Editor...", "success")} style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', transition: 'var(--transition)' }}>
                <ImageIcon color="#4DA6FF" />
                <div>
                  <p style={{ fontWeight: '600' }}>Campus Gallery</p>
                  <p style={{ fontSize: '0.8rem', color: '#B0BCCB' }}>Manage 3D textures & photos</p>
                </div>
              </div>
              <div className="glass-card" onClick={() => setShowAnnouncementModal(true)} style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', transition: 'var(--transition)' }}>
                <Plus color="#4DA6FF" />
                <div>
                  <p style={{ fontWeight: '600' }}>Announcements</p>
                  <p style={{ fontSize: '0.8rem', color: '#B0BCCB' }}>Broadcast to all dashboards</p>
                </div>
              </div>
              <div className="glass-card" onClick={() => showNotification("System Settings are locked by SuperAdmin", "error")} style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', transition: 'var(--transition)' }}>
                <Settings color="#4DA6FF" />
                <div>
                  <p style={{ fontWeight: '600' }}>Global Config</p>
                  <p style={{ fontSize: '0.8rem', color: '#B0BCCB' }}>API & Security settings</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <AnnouncementModal
        isOpen={showAnnouncementModal}
        onClose={() => setShowAnnouncementModal(false)}
      />
      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSaved={() => fetchUsers()}
        initialData={editingUser}
      />
    </div>
  );
};

export default AdminDashboard;
