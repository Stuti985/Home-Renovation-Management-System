import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { User, Mail, Lock } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate update since backend auth logic would need to be updated to support password changes
    alert('Profile updated! (Simulation)');
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Profile Settings</h1>
        <p className="page-subtitle">Manage your account and preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <Card>
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ 
              width: 100, height: 100, borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '3rem', color: 'white', margin: '0 auto 1rem', fontWeight: 'bold'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h3>{user?.name}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{user?.role === 'admin' ? 'Administrator' : 'Homeowner'}</p>
          </div>
        </Card>

        <Card>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
              Personal Information
            </h3>
            
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrapper" style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper" style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', margin: '1rem 0 0.5rem' }}>
              Security
            </h3>

            <div className="input-group">
              <label>New Password</label>
              <div className="input-wrapper" style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password" name="newPassword" placeholder="Leave blank to keep current" value={formData.newPassword} onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
