import React from 'react';

const SkeletonBlock = ({ width = '100%', height = '1rem', borderRadius = '8px', style = {} }) => (
  <div style={{
    width,
    height,
    borderRadius,
    background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    ...style,
  }} />
);

export const SkeletonCard = () => (
  <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <SkeletonBlock height="1.5rem" width="60%" />
    <SkeletonBlock height="0.9rem" />
    <SkeletonBlock height="0.9rem" width="85%" />
    <SkeletonBlock height="0.9rem" width="70%" />
    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
      <SkeletonBlock height="2.5rem" borderRadius="10px" width="40%" />
      <SkeletonBlock height="2.5rem" borderRadius="10px" width="40%" />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 4 }) => (
  <div className="glass-card">
    <SkeletonBlock height="1.5rem" width="40%" style={{ marginBottom: '1.5rem' }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 0.5fr', gap: '1rem', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)' }}>
          <SkeletonBlock height="0.9rem" />
          <SkeletonBlock height="0.9rem" />
          <SkeletonBlock height="0.9rem" width="70%" />
          <SkeletonBlock height="1.8rem" borderRadius="8px" />
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonStat = () => (
  <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <SkeletonBlock width="50px" height="50px" borderRadius="12px" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <SkeletonBlock height="1.5rem" width="60%" />
      <SkeletonBlock height="0.8rem" width="80%" />
    </div>
  </div>
);

export default SkeletonBlock;
