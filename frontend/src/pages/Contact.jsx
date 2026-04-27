import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle, Clock, Globe } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const inputStyle = {
  padding: '0.85rem 1rem',
  borderRadius: '12px',
  border: '1px solid var(--glass-border)',
  background: 'rgba(255,255,255,0.05)',
  color: 'white',
  outline: 'none',
  width: '100%',
  fontSize: '0.95rem',
  transition: 'border-color 0.2s ease',
};

const infoCards = [
  {
    icon: <MapPin size={26} color="#4DA6FF" />,
    bg: 'rgba(77,166,255,0.1)',
    title: 'Our Location',
    value: '123 Future Avenue, Innovation District, Tech City 99201',
  },
  {
    icon: <Phone size={26} color="#B388FF" />,
    bg: 'rgba(179,136,255,0.1)',
    title: 'Call Us',
    value: '+1 (555) 012-3456',
    sub: 'Mon–Fri, 8am–6pm',
  },
  {
    icon: <Mail size={26} color="#00E676" />,
    bg: 'rgba(0,230,118,0.1)',
    title: 'Email Support',
    value: 'info@antigravity.edu',
    sub: 'Reply within 24 hours',
  },
  {
    icon: <Clock size={26} color="#FFD700" />,
    bg: 'rgba(255,215,0,0.1)',
    title: 'Office Hours',
    value: 'Monday – Friday',
    sub: '8:00 AM to 6:00 PM IST',
  },
];

const Contact = () => {
  const { showNotification } = useNotification();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulate API
    setSubmitting(false);
    setSent(true);
    showNotification('Message sent! We\'ll get back to you soon.', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', padding: '80px 5% 5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ color: 'var(--primary-color)', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
          Get in Touch
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900' }}>
          We'd Love to Hear From You
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ color: '#B0BCCB', fontSize: '1.1rem', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
          Have questions about admissions, curriculum, or technology? Our team is here to guide you.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>

        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card">
          {sent ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                <CheckCircle size={70} color="#00E676" style={{ margin: '0 auto 1.5rem' }} />
              </motion.div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>Message Sent!</h3>
              <p style={{ color: '#B0BCCB', marginBottom: '2rem' }}>Our admissions team will respond within 24 hours.</p>
              <button className="btn-primary" onClick={() => setSent(false)}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <MessageSquare color="#4DA6FF" size={22} /> Send a Message
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {['name', 'email'].map(field => (
                  <div key={field}>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={field === 'name' ? 'Your Name' : 'Your Email'}
                      style={{ ...inputStyle, borderColor: errors[field] ? '#ff4d4d' : 'var(--glass-border)' }}
                      value={form[field]}
                      onChange={handleChange(field)}
                    />
                    {errors[field] && <p style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors[field]}</p>}
                  </div>
                ))}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  style={{ ...inputStyle, borderColor: errors.subject ? '#ff4d4d' : 'var(--glass-border)' }}
                  value={form.subject}
                  onChange={handleChange('subject')}
                />
                {errors.subject && <p style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.subject}</p>}
              </div>

              <div>
                <textarea
                  placeholder="Your message (min. 10 characters)"
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical', borderColor: errors.message ? '#ff4d4d' : 'var(--glass-border)' }}
                  value={form.message}
                  onChange={handleChange('message')}
                />
                {errors.message && <p style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={submitting}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? 'Sending...' : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          )}
        </motion.div>

        {/* Info Panel */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {infoCards.map((card, i) => (
            <motion.div key={i} className="glass-card" whileHover={{ x: 6 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', transition: 'all 0.2s ease' }}
            >
              <div style={{ padding: '0.9rem', background: card.bg, borderRadius: '14px', flexShrink: 0 }}>
                {card.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.3rem' }}>{card.title}</h4>
                <p style={{ color: '#B0BCCB', fontSize: '0.9rem' }}>{card.value}</p>
                {card.sub && <p style={{ color: '#6B7280', fontSize: '0.8rem', marginTop: '0.2rem' }}>{card.sub}</p>}
              </div>
            </motion.div>
          ))}

          {/* Social Links */}
          <div className="glass-card" style={{ textAlign: 'center', border: '1px dashed var(--glass-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
              <Globe size={16} color="#B0BCCB" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Follow Us</h4>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { name: 'Twitter', color: '#1DA1F2' },
                { name: 'LinkedIn', color: '#0A66C2' },
                { name: 'Instagram', color: '#E1306C' },
                { name: 'YouTube', color: '#FF0000' },
              ].map(s => (
                <span key={s.name} style={{ color: s.color, cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.target.style.opacity = '0.7'}
                  onMouseLeave={e => e.target.style.opacity = '1'}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
