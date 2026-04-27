import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Play, X, Filter } from 'lucide-react';

const galleryItems = [
  { title: 'Quantum Physics Lab', type: 'image', category: 'Academics', color: '#4DA6FF', span: 2 },
  { title: 'Campus Night View', type: 'image', category: 'Campus', color: '#B388FF', span: 1 },
  { title: '3D Lab Demo Reel', type: 'video', category: 'Technology', color: '#FFD700', span: 1 },
  { title: 'Robotics Workshop', type: 'image', category: 'Technology', color: '#00E676', span: 1 },
  { title: 'Digital Library', type: 'image', category: 'Campus', color: '#FF5252', span: 2 },
  { title: 'Annual Sports Meet', type: 'image', category: 'Sports', color: '#40C4FF', span: 1 },
  { title: 'AI Curriculum Launch', type: 'video', category: 'Technology', color: '#B388FF', span: 1 },
  { title: 'Graduation Ceremony', type: 'image', category: 'Events', color: '#FFD700', span: 2 },
  { title: 'Science Olympiad', type: 'image', category: 'Academics', color: '#4DA6FF', span: 1 },
  { title: 'Campus Aerial View', type: 'image', category: 'Campus', color: '#00E676', span: 1 },
  { title: 'Cultural Fest 2025', type: 'video', category: 'Events', color: '#FF5252', span: 1 },
  { title: 'Basketball Finals', type: 'image', category: 'Sports', color: '#40C4FF', span: 1 },
];

const categories = ['All', 'Academics', 'Campus', 'Technology', 'Sports', 'Events'];

const inputStyle = {
  padding: '0.5rem 1.2rem',
  borderRadius: '50px',
  border: '1px solid var(--glass-border)',
  cursor: 'pointer',
  fontSize: '0.85rem',
  fontWeight: '600',
  transition: 'all 0.2s ease',
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', padding: '80px 5% 5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ color: 'var(--primary-color)', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.8rem', fontSize: '0.9rem' }}
        >
          Campus Gallery
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900' }}
        >
          Visual Journey
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ color: '#B0BCCB', fontSize: '1.1rem', marginTop: '1rem' }}
        >
          A glimpse into the life and infrastructure of Antigravity School.
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}
      >
        <Filter size={18} color="#B0BCCB" style={{ alignSelf: 'center' }} />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              ...inputStyle,
              background: activeCategory === cat ? 'var(--primary-color)' : 'var(--glass-bg)',
              color: activeCategory === cat ? 'white' : '#B0BCCB',
              boxShadow: activeCategory === cat ? '0 4px 15px rgba(77,166,255,0.3)' : 'none',
            }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Masonry Grid */}
      <div style={{
        columns: 'auto 280px',
        columnGap: '1.5rem',
      }}>
        <AnimatePresence>
          {filtered.map((item, i) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              onClick={() => setLightbox(item)}
              style={{
                breakInside: 'avoid',
                marginBottom: '1.5rem',
                height: item.span === 2 ? '340px' : '200px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '20px',
                cursor: 'pointer',
                background: `linear-gradient(135deg, ${item.color}33 0%, rgba(11,15,26,0.9) 100%)`,
                border: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              whileHover={{ scale: 1.02, boxShadow: `0 20px 50px ${item.color}44` }}
            >
              {/* Dot grid overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle, ${item.color}22 1px, transparent 1px)`,
                backgroundSize: '18px 18px',
                opacity: 0.4,
              }} />

              {/* Category badge */}
              <div style={{
                position: 'absolute', top: '1rem', left: '1rem',
                background: 'rgba(11,15,26,0.7)', backdropFilter: 'blur(10px)',
                padding: '0.3rem 0.8rem', borderRadius: '50px',
                fontSize: '0.7rem', fontWeight: '700', color: item.color,
                border: `1px solid ${item.color}44`,
              }}>
                {item.category}
              </div>

              <div style={{ textAlign: 'center', zIndex: 2, padding: '1rem' }}>
                <div style={{ marginBottom: '0.8rem' }}>
                  {item.type === 'video'
                    ? <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><Play size={22} fill="white" color="white" /></div>
                    : <Maximize2 size={24} color="white" style={{ opacity: 0.8 }} />
                  }
                </div>
                <h4 style={{ fontWeight: '700', fontSize: '1rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.75rem', color: '#B0BCCB', marginTop: '0.3rem' }}>
                  {item.type === 'video' ? '▶ Video' : '📷 Photo'}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 2000,
              background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: '800px',
                background: `linear-gradient(135deg, ${lightbox.color}22, rgba(11,15,26,0.95))`,
                border: `1px solid ${lightbox.color}44`,
                borderRadius: '24px',
                padding: '3rem',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <button
                onClick={() => setLightbox(null)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#B0BCCB' }}
              >
                <X size={24} />
              </button>

              <div style={{
                width: '100px', height: '100px', borderRadius: '50%',
                background: `radial-gradient(circle, ${lightbox.color}44, transparent)`,
                border: `2px solid ${lightbox.color}66`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 2rem',
              }}>
                {lightbox.type === 'video' ? <Play size={40} color="white" fill="white" /> : <Maximize2 size={36} color={lightbox.color} />}
              </div>

              <div style={{ display: 'inline-block', background: `${lightbox.color}22`, color: lightbox.color, padding: '0.3rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '1rem' }}>
                {lightbox.category}
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>{lightbox.title}</h2>
              <p style={{ color: '#B0BCCB', lineHeight: 1.6 }}>
                {lightbox.type === 'video'
                  ? 'This video showcases one of our signature campus programs. Full media library coming soon.'
                  : 'High-resolution image from our campus collection. Request full access through the Admission portal.'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
