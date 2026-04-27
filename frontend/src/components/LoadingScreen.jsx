import React from 'react';
import { useProgress } from '@react-three/drei';

const LoadingScreen = () => {
  const { progress } = useProgress();
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0B0F1A',
      zIndex: 2000
    }}>
      <div style={{ width: '300px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ 
          width: `${progress}%`, 
          height: '100%', 
          background: 'var(--primary-color)', 
          boxShadow: '0 0 15px var(--primary-color)',
          transition: 'width 0.3s ease'
        }} />
      </div>
      <p style={{ marginTop: '1rem', color: '#B0BCCB', fontSize: '0.8rem', letterSpacing: '2px' }}>LOADING CAMPUS {Math.round(progress)}%</p>
    </div>
  );
};

export default LoadingScreen;
