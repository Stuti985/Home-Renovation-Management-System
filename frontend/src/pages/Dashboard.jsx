import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserDashboard from './dashboard/UserDashboard';
import AdminDashboard from './dashboard/AdminDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}
