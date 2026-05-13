import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { Mail, Lock, LogIn } from 'lucide-react';
import './auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back!');
      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin);
    } catch (err) {
      const msg = err.response?.data?.message 
                  || err.response?.data?.errors?.[0]?.msg 
                  || (err.message === 'Network Error' ? 'Cannot connect to server' : err.message) 
                  || 'Login failed';
      toast.error(msg);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-content">
        <div className="auth-form-wrapper">
          <Link to="/" className="auth-logo">Renovate<span className="gradient-text">Pro</span></Link>
          
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Enter your details to access your dashboard.</p>
          </div>

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

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', fontWeight: 500 }}>
                  Forgot Password?
                </Link>
              </div>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" fullWidth className="auth-submit-btn">
              <LogIn size={20} /> Sign In
            </Button>

            <div className="auth-footer">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="auth-image-panel">
        <img src="/hero-renovation.png" alt="Renovation" className="auth-bg" />
        <div className="auth-overlay"></div>
        <div className="auth-testimonial">
          <p>"RenovatePro completely transformed how I manage my investment properties. Absolutely essential tool."</p>
          <span>- Sarah Jenkins, Property Investor</span>
        </div>
      </div>
    </div>
  );
}
