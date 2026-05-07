import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Mail, ArrowLeft } from 'lucide-react';
import './auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/forgot-password', { email });
      setSuccess(true);
      toast.success('Password reset link sent to your email!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-content">
        <div className="auth-form-wrapper">
          <Link to="/" className="auth-logo">Renovate<span className="gradient-text">Pro</span></Link>
          
          <div className="auth-header">
            <h2>Forgot Password?</h2>
            <p>Enter your email address and we'll send you a link to reset your password.</p>
          </div>

          {success ? (
            <Card style={{ textAlign: 'center', padding: '2rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)' }}>
              <h3 style={{ color: 'var(--success)', marginBottom: '1rem' }}>Check your email</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and spam folder.
              </p>
              <Link to="/login">
                <Button variant="secondary" fullWidth>Return to Login</Button>
              </Link>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Sending Link...' : 'Send Reset Link'}
              </Button>

              <div className="auth-footer" style={{ marginTop: '1.5rem' }}>
                <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                  <ArrowLeft size={16} /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="auth-image-panel">
        <img src="/hero-renovation.png" alt="Renovation" className="auth-bg" />
        <div className="auth-overlay"></div>
      </div>
    </div>
  );
}
