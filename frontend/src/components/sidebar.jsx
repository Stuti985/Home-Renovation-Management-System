import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, FolderOpen, PieChart, Settings, LogOut, Sun, Moon, Users, Shield, Calendar, Bell, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './Sidebar.css';

export default function Sidebar() {
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <Home size={28} className="brand-icon" />
        <h2>Renovate<span className="gradient-text">Pro</span></h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <PieChart size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        {!isAdmin && (
          <>
            <NavLink to="/projects" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <FolderOpen size={20} />
              <span>My Projects</span>
            </NavLink>
            <NavLink to="/gallery" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <FolderOpen size={20} />
              <span>Transformation Gallery</span>
            </NavLink>
            <NavLink to="/bookings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Calendar size={20} />
              <span>Bookings</span>
            </NavLink>
            <NavLink to="/notifications" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Bell size={20} />
              <span>Notifications</span>
            </NavLink>
            <NavLink to="/contractors" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Search size={20} />
              <span>Find Contractors</span>
            </NavLink>
          </>
        )}

        {isAdmin && (
          <>
            <div style={{ padding: '1rem 1rem 0.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Admin Controls
            </div>
            <NavLink to="/admin/users" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Users size={20} />
              <span>User Management</span>
            </NavLink>
            <NavLink to="/admin/reviews" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Shield size={20} />
              <span>Review Moderation</span>
            </NavLink>
          </>
        )}

        <div style={{ padding: '1rem 1rem 0.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Account
        </div>
        <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Profile Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">{user?.name?.charAt(0).toUpperCase() || 'U'}</div>
          <div className="user-info">
            <p className="user-name">{user?.name || 'User'}</p>
            <p className="user-role">{isAdmin ? 'Administrator' : 'Homeowner'}</p>
          </div>
        </div>
        
        <div className="sidebar-actions">
          <button className="theme-toggle-btn sidebar-icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="logout-btn sidebar-icon-btn" onClick={handleLogout}>
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}
