import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award, ShieldCheck, Zap, Globe, ChevronRight } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const features = [
  { icon: <BookOpen size={36} color="#4DA6FF" />, title: '3D Learning Worlds', desc: 'Step inside interactive 3D environments. From quantum physics simulations to virtual history tours.' },
  { icon: <Zap size={36} color="#FFD700" />, title: 'AI-Powered Insights', desc: 'Predictive analytics surface learning gaps before they become problems. Every student, every day.' },
  { icon: <Users size={36} color="#B388FF" />, title: 'Smart Administration', desc: 'A unified command center for admins, teachers, and parents — all in real time.' },
  { icon: <ShieldCheck size={36} color="#00E676" />, title: 'Enterprise Security', desc: 'Role-based access control with JWT authentication and end-to-end data encryption.' },
  { icon: <Globe size={36} color="#4DA6FF" />, title: 'Global Campus Network', desc: 'Partner schools on 5 continents share resources and compete in inter-campus 3D challenges.' },
  { icon: <Award size={36} color="#FFD700" />, title: 'Award-Winning Design', desc: 'Named Top Digital School 2025 by EdTech World for our pioneering immersive architecture.' },
];

const stats = [
  { value: '5,000+', label: 'Students' },
  { value: '150+', label: 'Expert Teachers' },
  { value: '98%', label: 'Success Rate' },
  { value: '24/7', label: 'AI Support' },
];

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate(`/${user.role}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ paddingTop: '70px' }}>

      {/* ── Hero ── */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 5%',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(77,166,255,0.12) 0%, transparent 70%)',
      }}>
        <motion.p {...fadeUp()} style={{ color: 'var(--primary-color)', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Welcome to the Future of Education
        </motion.p>
        <motion.h1 {...fadeUp(0.1)} style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', fontWeight: '900', lineHeight: 1.05, maxWidth: '900px' }}>
          Next-Gen <span className="gradient-text">Education</span> Reimagined
        </motion.h1>
        <motion.p {...fadeUp(0.2)} style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: '#B0BCCB', maxWidth: '700px', margin: '1.5rem auto 2.5rem', lineHeight: 1.6 }}>
          Immersive 3D campuses. AI-driven insights. Role-based dashboards. Everything your school needs — in one premium ecosystem.
        </motion.p>
        <motion.div {...fadeUp(0.3)} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={handleGetStarted} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem', padding: '0.9rem 2.2rem' }}>
            Get Started <ArrowRight size={20} />
          </button>
          <Link to="/campus-3d" className="btn-glass" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem' }}>
            Explore Campus <ChevronRight size={20} />
          </Link>
        </motion.div>

        {/* Floating badge */}
        <motion.div
          {...fadeUp(0.5)}
          className="glass-card"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '3rem', padding: '0.7rem 1.5rem', borderRadius: '50px', fontSize: '0.85rem', border: '1px solid rgba(77,166,255,0.3)' }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00E676', boxShadow: '0 0 8px #00E676', animation: 'pulse 2s infinite' }} />
          <span style={{ color: '#B0BCCB' }}>Live system — <span style={{ color: 'white', fontWeight: '600' }}>5,248 students</span> active right now</span>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '4rem 5%', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '5rem' }}>
          {stats.map((stat, i) => (
            <motion.div key={i} {...inView(i * 0.1)} style={{ textAlign: 'center' }}>
              <div className="gradient-text" style={{ fontSize: '3rem', fontWeight: '900' }}>{stat.value}</div>
              <div style={{ color: '#B0BCCB', fontSize: '1rem', marginTop: '0.3rem' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '6rem 5%' }}>
        <motion.div {...inView()} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800' }}>Everything in One Platform</h2>
          <p style={{ color: '#B0BCCB', marginTop: '1rem', fontSize: '1.1rem' }}>Built for students, teachers, and administrators who demand more.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {features.map((feat, i) => (
            <motion.div
              key={i}
              {...inView(i * 0.08)}
              className="glass-card"
              whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}
              style={{ transition: 'all 0.3s ease' }}
            >
              <div style={{ marginBottom: '1.5rem' }}>{feat.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.8rem' }}>{feat.title}</h3>
              <p style={{ color: '#B0BCCB', lineHeight: '1.65', fontSize: '0.95rem' }}>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '0 5% 6rem' }}>
        <motion.div
          {...inView()}
          className="glass-card"
          style={{
            background: 'linear-gradient(135deg, rgba(77,166,255,0.15), rgba(179,136,255,0.15))',
            border: '1px solid rgba(77,166,255,0.25)',
            textAlign: 'center',
            padding: '5rem 2rem',
          }}
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '1rem' }}>
            Ready to <span className="gradient-text">Join the Campus?</span>
          </h2>
          <p style={{ color: '#B0BCCB', maxWidth: '500px', margin: '0 auto 2.5rem', fontSize: '1.05rem' }}>
            Applications are now open for the 2025–2026 academic year. Secure your seat today.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/admission" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1.05rem' }}>Apply Now</Link>
            <Link to="/about" className="btn-glass" style={{ textDecoration: 'none', fontSize: '1.05rem' }}>Learn More</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
