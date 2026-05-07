import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      background: 'var(--bg-primary)'
    }}>
      <div style={{ marginBottom: '2rem', color: 'var(--accent-primary)' }}>
        <Home size={64} />
      </div>
      <h1 style={{ fontSize: '6rem', fontWeight: 800, margin: 0, lineHeight: 1 }} className="gradient-text">
        404
      </h1>
      <h2 style={{ fontSize: '2rem', marginTop: '1rem', marginBottom: '1rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '2rem' }}>
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/">
        <Button size="lg" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={18} />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
