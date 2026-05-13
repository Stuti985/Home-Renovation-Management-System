import React from 'react';
import { Home, Mail } from 'lucide-react';
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
            {/* Social links removed for compatibility */}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Product</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/coming-soon" state={{ pageName: 'Features' }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Features</Link></li>
            <li><Link to="/coming-soon" state={{ pageName: 'Pricing' }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Pricing</Link></li>
            <li><Link to="/coming-soon" state={{ pageName: 'Showcase' }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Showcase</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/coming-soon" state={{ pageName: 'About Us' }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About Us</Link></li>
            <li><Link to="/coming-soon" state={{ pageName: 'Careers' }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Careers</Link></li>
            <li><Link to="/coming-soon" state={{ pageName: 'Contact' }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Legal</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/coming-soon" state={{ pageName: 'Privacy Policy' }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</Link></li>
            <li><Link to="/coming-soon" state={{ pageName: 'Terms of Service' }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Terms of Service</Link></li>
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
