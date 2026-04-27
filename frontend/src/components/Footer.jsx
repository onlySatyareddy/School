import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: 'rgba(11, 15, 26, 0.95)', borderTop: '1px solid var(--glass-border)', padding: '5rem 5% 2rem', color: '#B0BCCB' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <div style={{ width: '30px', height: '30px', background: 'var(--primary-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>A</div>
            <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'white' }}>ANTIGRAVITY</span>
          </div>
          <p style={{ lineHeight: '1.6', marginBottom: '2rem' }}>
            Transforming education through immersive 3D technology and AI-driven insights. Built for the leaders of tomorrow.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Facebook size={20} style={{ cursor: 'pointer' }} />
            <Twitter size={20} style={{ cursor: 'pointer' }} />
            <Instagram size={20} style={{ cursor: 'pointer' }} />
            <Linkedin size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link></li>
            <li><Link to="/campus-3d" style={{ color: 'inherit', textDecoration: 'none' }}>3D Campus</Link></li>
            <li><Link to="/admission" style={{ color: 'inherit', textDecoration: 'none' }}>Admissions</Link></li>
            <li><Link to="/gallery" style={{ color: 'inherit', textDecoration: 'none' }}>Gallery</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Contact Us</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <li style={{ display: 'flex', gap: '10px' }}><MapPin size={18} color="var(--primary-color)" /> 123 Future Ave, Tech City</li>
            <li style={{ display: 'flex', gap: '10px' }}><Phone size={18} color="var(--primary-color)" /> +1 (555) 012-3456</li>
            <li style={{ display: 'flex', gap: '10px' }}><Mail size={18} color="var(--primary-color)" /> info@antigravity.edu</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Newsletter</h4>
          <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>Subscribe to stay updated with latest campus events.</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="email" placeholder="Email" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '0.6rem', borderRadius: '8px', color: 'white', outline: 'none', width: '100%' }} />
            <button className="btn-primary" style={{ padding: '0.6rem 1rem' }}>Join</button>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>
        © 2026 Antigravity School. All rights reserved. Built with ❤️ for the next generation.
      </div>
    </footer>
  );
};

export default Footer;
