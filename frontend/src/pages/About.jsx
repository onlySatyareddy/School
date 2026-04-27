import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Eye, History, Award, Users, BookOpen, Globe, Zap } from 'lucide-react';

const teamMembers = [
  { name: 'Dr. Sarah Chen', role: 'Principal & Founder', color: '#4DA6FF' },
  { name: 'Prof. Marcus Osei', role: 'Head of AI Curriculum', color: '#B388FF' },
  { name: 'Ms. Priya Nair', role: 'Student Affairs Director', color: '#00E676' },
  { name: 'Mr. Ethan Brooks', role: 'Campus Tech Lead', color: '#FFD700' },
];

const stats = [
  { icon: <Users size={28} color="#4DA6FF" />, value: '5,000+', label: 'Students Enrolled' },
  { icon: <BookOpen size={28} color="#B388FF" />, value: '150+', label: 'Expert Faculty' },
  { icon: <Globe size={28} color="#00E676" />, value: '30+', label: 'Partner Universities' },
  { icon: <Zap size={28} color="#FFD700" />, value: '98%', label: 'Graduate Success Rate' },
];

const pillars = [
  { icon: <Target size={40} color="#4DA6FF" />, title: 'Our Mission', text: 'To provide a technology-integrated environment that fosters critical thinking and immersive learning experiences.' },
  { icon: <Eye size={40} color="#B388FF" />, title: 'Our Vision', text: 'To be the global benchmark for digital-first education, bridging the gap between imagination and reality.' },
  { icon: <History size={40} color="#00E676" />, title: 'Our History', text: 'Founded in 2024, we started with a vision to replace traditional textbooks with interactive 3D ecosystems.' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const About = () => {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '6rem 5% 4rem' }}>
        <motion.p {...fadeUp()} style={{ color: 'var(--primary-color)', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>
          About Antigravity
        </motion.p>
        <motion.h1 {...fadeUp(0.1)} className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: '900', lineHeight: 1.1 }}>
          Defining the Future of Learning
        </motion.h1>
        <motion.p {...fadeUp(0.2)} style={{ color: '#B0BCCB', fontSize: '1.2rem', maxWidth: '700px', margin: '1.5rem auto 2.5rem' }}>
          Antigravity School is not just an institution — it's a launchpad for the next generation of innovators, thinkers, and leaders.
        </motion.p>
        <motion.div {...fadeUp(0.3)} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/admission" className="btn-primary" style={{ textDecoration: 'none' }}>Apply Now</Link>
          <Link to="/campus-3d" className="btn-glass" style={{ textDecoration: 'none' }}>Explore Campus</Link>
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{ padding: '3rem 5%', background: 'rgba(77,166,255,0.04)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          {stats.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '0.8rem' }}>{s.icon}</div>
              <div className="gradient-text" style={{ fontSize: '2.2rem', fontWeight: '900' }}>{s.value}</div>
              <div style={{ color: '#B0BCCB', fontSize: '0.9rem' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission / Vision / History */}
      <section style={{ padding: '6rem 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {pillars.map((item, i) => (
            <motion.div key={i} {...fadeUp(i * 0.15)} className="glass-card" whileHover={{ y: -8 }}>
              <div style={{ marginBottom: '1.5rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>{item.title}</h3>
              <p style={{ color: '#B0BCCB', lineHeight: '1.7' }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '4rem 5% 6rem' }}>
        <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '800' }}>Meet Our Leaders</h2>
          <p style={{ color: '#B0BCCB', marginTop: '1rem' }}>The visionaries building the school of tomorrow.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {teamMembers.map((member, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} className="glass-card" whileHover={{ y: -8 }} style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, ${member.color}55, ${member.color}11)`,
                border: `2px solid ${member.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem', fontWeight: '700', color: member.color,
              }}>
                {member.name[0]}
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.4rem' }}>{member.name}</h4>
              <p style={{ color: '#B0BCCB', fontSize: '0.85rem' }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="glass-card" style={{ margin: '0 5% 6rem', padding: '4rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(77,166,255,0.08), rgba(179,136,255,0.08))' }}>
        <motion.h2 {...fadeUp()} style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Recognized Excellence</motion.h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          {['Top Digital School 2025', 'AI Innovation Award', 'Future Learning Hub Certified', 'Sustainable Campus Gold'].map((award, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award color="#FFD700" size={20} />
              <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{award}</span>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
