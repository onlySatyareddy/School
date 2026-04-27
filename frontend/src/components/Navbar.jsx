import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app/slices/authSlice';
import { User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setMenuOpen(false);
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--primary-color)' : '#B0BCCB',
    textDecoration: 'none',
    fontWeight: isActive ? '700' : '500',
    transition: 'color 0.2s ease',
    borderBottom: isActive ? '2px solid var(--primary-color)' : '2px solid transparent',
    paddingBottom: '2px',
  });

  const links = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/campus-3d', label: 'Campus' },
    { to: '/admission', label: 'Admission' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="glass-nav" style={{
      backdropFilter: scrolled ? 'blur(30px)' : 'blur(10px)',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <Link to="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '40px', height: '40px', background: 'var(--primary-color)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>A</div>
        <span style={{ fontWeight: '800', fontSize: '1.5rem', color: 'white' }}>ANTIGRAVITY</span>
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="navbar-desktop">
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} style={navLinkStyle}>{label}</NavLink>
        ))}

        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to={`/${user.role}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600' }}>
              <User size={20} />
              Dashboard
            </Link>
            <button onClick={handleLogout} className="btn-glass" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>Login</Link>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="btn-glass navbar-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: 'none', padding: '0.5rem', alignItems: 'center', justifyContent: 'center' }}
        id="navbar-hamburger-btn"
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: 'rgba(11, 15, 26, 0.98)',
          backdropFilter: 'blur(20px)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          zIndex: 998,
          borderBottom: '1px solid var(--glass-border)',
        }}>
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} style={navLinkStyle} onClick={() => setMenuOpen(false)}>{label}</NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <Link to={`/${user.role}`} style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600' }} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="btn-glass" style={{ width: '100%' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center' }} onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
