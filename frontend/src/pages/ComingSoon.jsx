import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HardHat, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export default function ComingSoon() {
  const location = useLocation();
  const pageName = location.state?.pageName || 'This';

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '2rem', textAlign: 'center' }}>
      <Helmet>
        <title>{pageName} | Coming Soon | RenovatePro</title>
      </Helmet>
      
      <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '2rem', borderRadius: '50%', marginBottom: '2rem' }}>
        <HardHat size={64} style={{ color: 'var(--accent-primary)' }} />
      </div>
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        <span className="gradient-text">{pageName}</span> is Under Construction
      </h1>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '3rem', lineHeight: '1.6' }}>
        We are working hard to build this page. Our team of expert developers are putting the final touches on it. Check back soon!
      </p>

      <Link to="/">
        <Button size="lg" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={20} /> Back to Home
        </Button>
      </Link>
    </div>
  );
}
