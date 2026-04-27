import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app/slices/authSlice';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Settings,
  Shield,
  GraduationCap,
  MessageSquare,
  ClipboardList,
  BarChart2,
  Megaphone,
  LogOut,
  Home,
} from 'lucide-react';

const roleLinks = {
  admin: [
    { label: 'Overview', path: '/admin', icon: <LayoutDashboard size={20} />, exact: true },
    { label: 'Students', path: '/admin/students', icon: <Users size={20} /> },
    { label: 'Teachers', path: '/admin/teachers', icon: <GraduationCap size={20} /> },
    { label: 'Classes', path: '/admin/classes', icon: <BookOpen size={20} /> },
    { label: 'Announcements', path: '/admin/announcements', icon: <Megaphone size={20} /> },
    { label: 'Reports', path: '/admin/reports', icon: <BarChart2 size={20} /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ],
  teacher: [
    { label: 'Overview', path: '/teacher', icon: <LayoutDashboard size={20} />, exact: true },
    { label: 'My Classes', path: '/teacher/classes', icon: <BookOpen size={20} /> },
    { label: 'Attendance', path: '/teacher/attendance', icon: <ClipboardList size={20} /> },
    { label: 'Marks', path: '/teacher/marks', icon: <BarChart2 size={20} /> },
    { label: 'Schedule', path: '/teacher/schedule', icon: <Calendar size={20} /> },
    { label: 'Messages', path: '/teacher/messages', icon: <MessageSquare size={20} /> },
  ],
  student: [
    { label: 'My Progress', path: '/student', icon: <LayoutDashboard size={20} />, exact: true },
    { label: 'Courses', path: '/student/courses', icon: <BookOpen size={20} /> },
    { label: 'Schedule', path: '/student/schedule', icon: <Calendar size={20} /> },
    { label: 'Messages', path: '/student/messages', icon: <MessageSquare size={20} /> },
  ],
};

const roleColors = {
  admin: '#ff4d4d',
  teacher: '#B388FF',
  student: '#4DA6FF',
};

const DashboardSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = user?.role || 'student';
  const links = roleLinks[role] || roleLinks.student;
  const accentColor = roleColors[role];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const linkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0.75rem 1rem',
    textDecoration: 'none',
    color: isActive ? 'white' : '#B0BCCB',
    background: isActive ? `${accentColor}22` : 'transparent',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
    borderLeft: isActive ? `3px solid ${accentColor}` : '3px solid transparent',
    fontWeight: isActive ? '600' : '400',
  });

  return (
    <div className="dashboard-sidebar-inner" style={{
      width: '260px',
      height: '100vh',
      background: 'rgba(11, 15, 26, 0.85)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--glass-border)',
      padding: '1.5rem 0.8rem',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
      overflowY: 'auto',
    }}>
      {/* Brand */}
      <div style={{ padding: '0.5rem 0.8rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: accentColor, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: 'white', fontSize: '1.1rem' }}>A</div>
          <span style={{ fontWeight: '800', fontSize: '1rem', color: 'white', letterSpacing: '1px' }}>ANTIGRAVITY</span>
        </div>
      </div>

      {/* User Badge */}
      <div className="glass-card" style={{ padding: '0.9rem 1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', borderLeft: `3px solid ${accentColor}` }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${accentColor}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: accentColor, fontSize: '1rem', flexShrink: 0 }}>
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ fontWeight: '700', fontSize: '0.85rem', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'User'}</p>
          <p style={{ fontSize: '0.72rem', color: accentColor, fontWeight: '600', textTransform: 'capitalize' }}>{role}</p>
        </div>
      </div>

      {/* Role Label */}
      <p style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '2px', color: '#6B7280', textTransform: 'uppercase', padding: '0 0.8rem', marginBottom: '0.5rem' }}>
        Navigation
      </p>

      {/* Nav Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.exact}
            style={({ isActive }) => linkStyle(isActive)}
          >
            {link.icon}
            <span style={{ fontSize: '0.9rem' }}>{link.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Bottom Actions */}
      <div style={{ padding: '1rem 0', borderTop: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <NavLink to="/home" style={() => linkStyle(false)}>
          <Home size={20} />
          <span style={{ fontSize: '0.9rem' }}>Public Site</span>
        </NavLink>
        <button
          onClick={handleLogout}
          style={{ ...linkStyle(false), background: 'rgba(255,77,77,0.05)', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', color: '#ff4d4d', borderLeft: '3px solid transparent' }}
        >
          <LogOut size={20} />
          <span style={{ fontSize: '0.9rem' }}>Logout</span>
        </button>

        <div className="glass-card" style={{ padding: '0.7rem 1rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', marginTop: '0.5rem' }}>
          <Shield size={14} color="#00E676" />
          <span style={{ color: '#B0BCCB' }}>System Secure</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
