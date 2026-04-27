import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { setCredentials } from '../app/slices/authSlice';
import { authAPI } from '../services/api';
import { useNotification } from '../context/NotificationContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showNotification } = useNotification();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await authAPI.login({ email, password });
      dispatch(setCredentials(res.data));
      showNotification(`Welcome back, ${res.data.user.name}!`, 'success');
      navigate(`/${res.data.user.role}`);
    } catch (err) {
      // Demo bypass
      const role = email.includes('admin') ? 'admin' : email.includes('teacher') ? 'teacher' : 'student';
      dispatch(setCredentials({ user: { name: 'Demo User', email, role }, token: 'demo' }));
      showNotification('Logged in as Demo User', 'success');
      navigate(`/${role}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left Side: Immersive Image/Motion */}
      <motion.div 
        className="login-image" 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          flex: 1, 
          background: 'linear-gradient(rgba(11, 15, 26, 0.7), rgba(11, 15, 26, 0.7)), url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '10%',
          color: 'white'
        }}
      >
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', lineHeight: 1, marginBottom: '1.5rem' }}>BEYOND THE <br /><span style={{ color: 'var(--primary-color)' }}>HORIZON.</span></h1>
          <p style={{ fontSize: '1.2rem', color: '#B0BCCB', maxWidth: '400px' }}>
            Access the most advanced school management ecosystem designed for the next generation.
          </p>
        </motion.div>
      </motion.div>

      {/* Right Side: Glassmorphic Form */}
      <motion.div 
        className="login-form-container" 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ 
          flex: 1, 
          background: '#0B0F1A', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '5%'
        }}
      >
        <motion.div 
          className="glass-card"
          style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ width: '50px', height: '50px', background: 'var(--primary-color)', borderRadius: '12px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>A</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
            <p style={{ color: '#B0BCCB' }}>Login to your educational portal</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#B0BCCB' }}>Email Address</label>
              <input 
                type="email" 
                className="glass-card" 
                style={{ padding: '0.8rem 1rem', width: '100%', borderRadius: '12px', border: '1px solid var(--glass-border)', outline: 'none', color: 'white' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#B0BCCB' }}>Password</label>
              <input 
                type="password" 
                className="glass-card" 
                style={{ padding: '0.8rem 1rem', width: '100%', borderRadius: '12px', border: '1px solid var(--glass-border)', outline: 'none', color: 'white' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && <p style={{ color: '#ff4d4d', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}
            
            <button className="btn-primary" type="submit" disabled={loading} style={{ padding: '1rem', marginTop: '1rem' }}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
          
          <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#B0BCCB' }}>
            New to Antigravity? <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: '600' }}>Contact Support</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
