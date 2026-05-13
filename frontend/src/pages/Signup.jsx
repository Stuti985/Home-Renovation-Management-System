import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import './auth.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      toast.success('Registration successful! Please check your email to verify your account.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message 
                  || err.response?.data?.errors?.[0]?.msg 
                  || (err.message === 'Network Error' ? 'Cannot connect to server' : err.message) 
                  || 'Registration failed';
      toast.error(msg);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-content">
        <div className="auth-form-wrapper">
          <Link to="/" className="auth-logo">Renovate<span className="gradient-text">Pro</span></Link>
          
          <div className="auth-header">
            <h2>Create an Account</h2>
            <p>Start tracking your renovation projects today.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

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
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <span className="input-hint">Must be at least 6 characters.</span>
            </div>

            <Button type="submit" fullWidth className="auth-submit-btn">
              <UserPlus size={20} /> Create Account
            </Button>

            <div className="auth-footer">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="auth-image-panel">
        <img src="/hero-renovation.png" alt="Renovation" className="auth-bg" />
        <div className="auth-overlay"></div>
        <div className="auth-testimonial">
          <p>"The budget tracking feature alone saved me thousands on my kitchen remodel."</p>
          <span>- Michael Chen, Homeowner</span>
        </div>
      </div>
    </div>
  );
}
