import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      background: 'radial-gradient(ellipse at 50% 50%, rgba(77,166,255,0.08) 0%, transparent 70%)'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        <div className="gradient-text" style={{ fontSize: '10rem', fontWeight: '900', lineHeight: 1, letterSpacing: '-0.05em' }}>
          404
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
          Page Not Found
        </h2>
        <p style={{ color: '#B0BCCB', fontSize: '1.1rem', maxWidth: '450px', margin: '0 auto 2.5rem' }}>
          The page you're looking for has drifted beyond the campus boundary. Let's get you back on track.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/home" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Home size={18} /> Go Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
