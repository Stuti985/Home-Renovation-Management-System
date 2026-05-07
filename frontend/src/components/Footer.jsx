import React from 'react';
import { Home, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--glass-border)',
      padding: '4rem 2rem 2rem 2rem',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        
        {/* Brand */}
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            <Home size={28} style={{ color: 'var(--accent-primary)' }} />
            <span>Renovate<span className="gradient-text">Pro</span></span>
          </Link>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            The ultimate platform to track expenses, manage contractors, and bring your dream home renovation to life.
          </p>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
            <a href="#" style={{ color: 'inherit' }}><Twitter size={20} /></a>
            <a href="#" style={{ color: 'inherit' }}><Github size={20} /></a>
            <a href="#" style={{ color: 'inherit' }}><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Product</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><a href="#features" style={{ color: 'var(--text-secondary)' }}>Features</a></li>
            <li><a href="#pricing" style={{ color: 'var(--text-secondary)' }}>Pricing</a></li>
            <li><a href="#showcase" style={{ color: 'var(--text-secondary)' }}>Showcase</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>About Us</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Careers</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Legal</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '3rem auto 0',
        paddingTop: '2rem',
        borderTop: '1px solid var(--glass-border)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.9rem'
      }}>
        &copy; {new Date().getFullYear()} RenovatePro. All rights reserved.
      </div>
    </footer>
  );
}
