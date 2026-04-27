import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, CheckCircle } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Admission = () => {
  const [submitted, setSubmitted] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showNotification('Application submitted successfully!', 'success');
  };

  if (submitted) {
    return (
      <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card">
          <CheckCircle size={80} color="#00E676" style={{ marginBottom: '2rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Application Submitted!</h2>
          <p style={{ color: '#B0BCCB' }}>Our admissions team will contact you within 3-5 business days.</p>
          <button onClick={() => setSubmitted(false)} className="btn-primary" style={{ marginTop: '2rem' }}>Apply for Another Student</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', padding: '2rem 5%', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem' }}>Join the Future</h1>
        <p style={{ color: '#B0BCCB', fontSize: '1.2rem' }}>Enroll your child in the most advanced educational ecosystem.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
        {/* Info Column */}
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Admission Process</h2>
          {[
            { step: "1", title: "Online Application", desc: "Fill out the digital form with necessary student details." },
            { step: "2", title: "Document Verification", desc: "Upload academic records and identification documents." },
            { step: "3", title: "Entrance Assessment", desc: "Schedule a 3D immersive assessment for the student." },
            { step: "4", title: "Final Interview", desc: "A brief conversation with our academic directors." }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--primary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                {item.step}
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p style={{ color: '#B0BCCB' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Form Column */}
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-card">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}><FileText color="#4DA6FF" /> Student Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="text" placeholder="First Name" className="glass-card" style={{ padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(255,255,255,0.05)' }} required />
              <input type="text" placeholder="Last Name" className="glass-card" style={{ padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(255,255,255,0.05)' }} required />
            </div>
            <input type="email" placeholder="Email Address" className="glass-card" style={{ padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(255,255,255,0.05)' }} required />
            <select className="glass-card" style={{ padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(11, 15, 26, 0.9)' }} required>
              <option value="" disabled selected>Select Grade</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
            <textarea placeholder="Previous School Records / Notes" rows="4" className="glass-card" style={{ padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(255,255,255,0.05)' }}></textarea>
            
            <button className="btn-primary" type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              Submit Application <Send size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Admission;
