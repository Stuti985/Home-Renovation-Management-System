import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Button from './ui/Button';
import './PublicNavbar.css';

export default function PublicNavbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="public-navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Home size={28} className="brand-icon" />
          <span>Renovate<span className="gradient-text">Pro</span></span>
        </Link>
        
        <div className="navbar-links">
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#testimonials">Testimonials</a>
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <Link to="/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
