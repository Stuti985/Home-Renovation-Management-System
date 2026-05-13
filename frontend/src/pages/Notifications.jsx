import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Bell } from "lucide-react";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";
import toast from "react-hot-toast";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 className="page-title">Notifications</h1>
        <p className="page-subtitle">Stay updated on your projects and contractor responses</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}><Spinner /></div>
      ) : notifications.length === 0 ? (
        <EmptyState 
          icon={Bell} 
          title="All caught up!" 
          description="You don't have any new notifications at this time." 
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notifications.map((n) => (
            <div key={n._id} className="glass-panel" style={{ 
              padding: '1.5rem', 
              borderLeft: `4px solid ${n.read ? 'transparent' : 'var(--accent-primary)'}`,
              background: n.read ? 'var(--glass-bg)' : 'rgba(99, 102, 241, 0.05)'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{n.title}</h3>
              <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)' }}>{n.message}</p>
              <small style={{ color: 'var(--text-muted)' }}>
                {new Date(n.createdAt).toLocaleDateString()} at {new Date(n.createdAt).toLocaleTimeString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
