import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Calendar } from "lucide-react";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";
import toast from "react-hot-toast";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 className="page-title">My Bookings</h1>
        <p className="page-subtitle">Manage your scheduled consultations and contractor visits</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}><Spinner /></div>
      ) : bookings.length === 0 ? (
        <EmptyState 
          icon={Calendar} 
          title="No upcoming bookings" 
          description="You don't have any appointments scheduled with contractors right now." 
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {bookings.map((b) => (
            <div key={b._id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{b.title || 'Consultation'}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                  {new Date(b.date).toLocaleDateString()} at {b.time}
                </p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                borderRadius: '1rem', 
                fontSize: '0.875rem', 
                background: b.status === 'confirmed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                color: b.status === 'confirmed' ? 'var(--success)' : 'var(--warning)'
              }}>
                {b.status || 'Pending'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
