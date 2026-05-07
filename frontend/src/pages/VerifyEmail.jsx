import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../api/axios';
import Button from '../components/ui/Button';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import './auth.css';

export default function VerifyEmail() {
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');
  const { token } = useParams();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await API.get(`/auth/verify-email/${token}`);
        setStatus('success');
        setMessage(res.data.msg);
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Invalid or expired verification token.');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }} className="fade-in">
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
        
        {status === 'loading' && (
          <>
            <Loader2 size={48} className="spin" style={{ color: 'var(--accent-primary)', margin: '0 auto 1.5rem' }} />
            <h2 style={{ marginBottom: '1rem' }}>Verifying Email...</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Please wait while we verify your email address.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 size={48} style={{ color: 'var(--success)', margin: '0 auto 1.5rem' }} />
            <h2 style={{ marginBottom: '1rem' }}>Email Verified!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{message}</p>
            <Link to="/login">
              <Button fullWidth>Continue to Login</Button>
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle size={48} style={{ color: 'var(--danger)', margin: '0 auto 1.5rem' }} />
            <h2 style={{ marginBottom: '1rem' }}>Verification Failed</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{message}</p>
            <Link to="/signup">
              <Button fullWidth variant="secondary">Back to Signup</Button>
            </Link>
          </>
        )}

      </div>
    </div>
  );
}
