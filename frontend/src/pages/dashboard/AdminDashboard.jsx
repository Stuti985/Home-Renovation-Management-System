import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { Users, Shield, ShieldCheck, XCircle, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [contractors, setContractors] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchReviews();
    fetchContractors();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) { toast.error("Failed to load users"); }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get("/admin/reviews");
      setReviews(res.data);
    } catch (err) { toast.error("Failed to load reviews"); }
  };

  const fetchContractors = async () => {
    try {
      const res = await API.get("/admin/contractors");
      setContractors(res.data);
    } catch (err) { toast.error("Failed to load contractors"); }
  };

  const promoteUser = async (id) => {
    if (!window.confirm("Promote this user to Admin?")) return;
    try {
      await API.put(`/admin/users/${id}/promote`);
      toast.success("User promoted to Admin");
      fetchUsers();
    } catch (err) { toast.error("Promotion failed"); }
  };

  const updateReviewStatus = async (id, status) => {
    try {
      await API.put(`/admin/reviews/${id}`, { status });
      toast.success(`Review ${status}`);
      fetchReviews();
    } catch (err) { toast.error("Failed to update review"); }
  };

  return (
    <div className="dashboard-page fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title" style={{ color: 'var(--danger)' }}>Admin Command Center</h1>
          <p className="page-subtitle">Manage platform users, contractors, and moderation</p>
        </div>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card className="stat-card" hoverable>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Users</p>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>{users.length}</h2>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--border-radius-md)', color: 'var(--accent-primary)' }}>
              <Users size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="stat-card" hoverable>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Reviews Pending</p>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>{reviews.filter(r => r.status === 'pending').length}</h2>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--border-radius-md)', color: 'var(--warning)' }}>
              <Shield size={24} />
            </div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* User Management */}
        <Card>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>User Management</h3>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span style={{ 
                        padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', 
                        background: u.role === 'admin' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                        color: u.role === 'admin' ? 'var(--danger)' : 'var(--accent-primary)'
                      }}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {u.role !== 'admin' && (
                        <Button size="sm" variant="secondary" onClick={() => promoteUser(u._id)}>Make Admin</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Review Moderation */}
        <Card>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Review Moderation</h3>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Contractor</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No reviews submitted yet.</td></tr>
                ) : reviews.map(r => (
                  <tr key={r._id}>
                    <td>{r.user?.name}</td>
                    <td>{r.contractor?.name}</td>
                    <td>{r.rating}/5</td>
                    <td>{r.comment}</td>
                    <td>
                      <span style={{ 
                        padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', 
                        background: r.status === 'approved' ? 'rgba(16, 185, 129, 0.1)' : r.status === 'rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: r.status === 'approved' ? 'var(--success)' : r.status === 'rejected' ? 'var(--danger)' : 'var(--warning)'
                      }}>
                        {r.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      {r.status === 'pending' && (
                        <>
                          <button onClick={() => updateReviewStatus(r._id, 'approved')} style={{ background: 'none', border: 'none', color: 'var(--success)', cursor: 'pointer' }}><CheckCircle2 size={20} /></button>
                          <button onClick={() => updateReviewStatus(r._id, 'rejected')} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><XCircle size={20} /></button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </div>
  );
}
