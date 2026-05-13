import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";
import { Plus, FolderOpen, Briefcase, TrendingUp, Bell, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Modal from "../../components/ui/Modal";
import EmptyState from "../../components/ui/EmptyState";

export default function UserDashboard() {
  const [projects, setProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchNotifications();
    fetchBookings();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch projects");
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      const res = await API.post("/projects", { title, description });
      setProjects((prev) => [res.data, ...prev]);
      setTitle("");
      setDescription("");
      setIsModalOpen(false);
      toast.success("Project created!");
    } catch (err) {
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const activeProjectsCount = projects.filter(p => p.status !== 'completed').length;
  
  // Prepare data for budget vs actual chart
  const budgetData = projects.map(p => {
    const totalExpenses = (p.expenses || []).reduce((sum, exp) => sum + exp.amount, 0);
    return {
      name: p.title.substring(0, 10) + '...',
      budget: p.budgetEstimate || 0,
      actual: totalExpenses
    };
  }).filter(d => d.budget > 0 || d.actual > 0);

  return (
    <div className="dashboard-page fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Dashboard</h1>
          <p className="page-subtitle">Track your renovations, budget, and bookings</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> New Project
        </Button>
      </div>

      {/* Stats Row */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card className="stat-card" hoverable>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Projects</p>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>{projects.length}</h2>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--border-radius-md)', color: 'var(--accent-primary)' }}>
              <Briefcase size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="stat-card" hoverable>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Active Projects</p>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>{activeProjectsCount}</h2>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--border-radius-md)', color: 'var(--success)' }}>
              <TrendingUp size={24} />
            </div>
          </div>
        </Card>

        <Card className="stat-card" hoverable>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Upcoming Bookings</p>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>{bookings.filter(b => b.status === 'confirmed').length}</h2>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: 'var(--border-radius-md)', color: 'var(--accent-secondary)' }}>
              <CalendarIcon size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Grid: Charts & Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <Card>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Budget vs Actual Spend</h3>
          <div style={{ height: '300px', width: '100%' }}>
            {budgetData.length === 0 ? (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                No budget data available yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={budgetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--warning)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--warning)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                  <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="budget" name="Estimated Budget" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorBudget)" />
                  <Area type="monotone" dataKey="actual" name="Actual Spend" stroke="var(--warning)" fillOpacity={1} fill="url(#colorActual)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        {/* Notifications Panel */}
        <Card style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={20} color="var(--accent-primary)" /> Notifications
            </h3>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {notifications.length === 0 ? (
              <p className="empty">No new notifications.</p>
            ) : (
              notifications.slice(0, 5).map(n => (
                <div key={n._id} style={{ padding: '1rem', background: n.read ? 'transparent' : 'rgba(99, 102, 241, 0.05)', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-md)', borderLeft: `3px solid ${n.read ? 'var(--text-muted)' : 'var(--accent-primary)'}` }}>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{n.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{n.message}</p>
                </div>
              ))
            )}
          </div>
          <Link to="/notifications" style={{ textAlign: 'center', display: 'block', marginTop: '1rem', color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600 }}>
            View All Notifications
          </Link>
        </Card>
      </div>

      {/* Projects Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Recent Projects</h3>
          <Link to="/projects" style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600 }}>View All</Link>
        </div>

        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {projects.length === 0 ? (
            <div style={{ gridColumn: '1 / -1' }}>
              <EmptyState 
                icon={FolderOpen}
                title="No projects found"
                description="Create your first project to get started tracking your renovation!"
              />
            </div>
          ) : (
            projects.slice(0, 3).map((p) => {
              const totalTasks = p.tasks?.length || 0;
              const completedTasks = p.tasks?.filter(t => t.completed).length || 0;
              const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

              return (
                <Card key={p._id} hoverable style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{p.title}</h3>
                      <span style={{ 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '1rem', 
                        fontSize: '0.75rem', 
                        fontWeight: 600,
                        background: p.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                        color: p.status === 'completed' ? 'var(--success)' : 'var(--accent-primary)'
                      }}>
                        {p.status || 'planning'}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {p.description || "No description provided."}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'var(--glass-border)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: 'var(--success)', transition: 'width 0.5s ease' }}></div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                    <Link to={`/projects/${p._id}`} style={{ flex: 1 }}>
                      <Button variant="secondary" fullWidth>Manage Project</Button>
                    </Link>
                  </div>
                </Card>
              )
            })
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Project">
        <form onSubmit={createProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Kitchen Remodel"
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the project"
              rows={3}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)', resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Project"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
