import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, DollarSign, Clock, MapPin, HardHat, CheckCircle2, AlertCircle, ArrowLeft, Plus, Circle, Printer, Bot } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import './ProjectPage.css';

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newExpenseDesc, setNewExpenseDesc] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/projects/${id}`);
      setProject(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch project details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      await API.post(`/projects/${id}/tasks`, { title: newTaskTitle });
      setNewTaskTitle('');
      toast.success('Task added successfully');
      fetchProject();
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  const handleToggleTask = async (taskId, currentStatus) => {
    try {
      await API.put(`/projects/${id}/tasks/${taskId}`, { completed: !currentStatus });
      fetchProject();
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!newExpenseDesc.trim() || !newExpenseAmount) return;
    try {
      await API.post(`/projects/${id}/expenses`, { 
        description: newExpenseDesc, 
        amount: Number(newExpenseAmount) 
      });
      setNewExpenseDesc('');
      setNewExpenseAmount('');
      toast.success('Expense added successfully');
      fetchProject();
    } catch (err) {
      toast.error('Failed to add expense');
    }
  };

  if (loading) {
    return (
      <div className="project-page-loader">
        <div className="spinner"></div>
        <p>Loading Project Details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-error glass-panel">
        <AlertCircle size={48} className="error-icon" />
        <h2>Project Not Found</h2>
        <p>{error}</p>
        <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
      </div>
    );
  }

  const spent = project.expenses?.reduce((acc, curr) => acc + curr.amount, 0) || 0;
  const budget = project.budgetEstimate || 0;
  
  const totalTasks = project.tasks?.length || 0;
  const completedTasks = project.tasks?.filter(t => t.completed).length || 0;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Safely check contractor array (if it's populated from bookings or direct ref)
  const leadContractor = project.bookings && project.bookings.length > 0 
    ? project.bookings[0].contractor 
    : null;

  // AI Insights Logic
  const getAIInsight = () => {
    if (budget === 0) return "Add a budget estimate to receive AI financial insights.";
    const spentPercent = (spent / budget) * 100;
    
    if (spentPercent > 100) {
      return `CRITICAL: Project is over budget by $${(spent - budget).toLocaleString()}. Immediate review recommended.`;
    }
    if (spentPercent > progress + 25) {
      return `WARNING: Budget consumption (${Math.round(spentPercent)}%) is significantly outpacing task progress (${progress}%). Risk of budget overrun.`;
    }
    if (progress === 100 && spentPercent <= 100) {
      return `SUCCESS: Project completed perfectly! You saved $${(budget - spent).toLocaleString()} under budget.`;
    }
    if (progress === 0 && spent === 0) {
      return "Project initialized. Add tasks and log expenses to track performance.";
    }
    return "Project health is optimal. Budget and timeline are tracking according to expectations.";
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="project-page-container fade-in">
      <header className="project-header print-hide">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <Button variant="outline" onClick={handleExportPDF} size="sm" style={{ float: 'right', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Printer size={16} /> Export Report
        </Button>
        <div className="project-header-content" style={{ clear: 'both', paddingTop: '1rem' }}>
          <div>
            <h1 className="project-title gradient-text">{project.title}</h1>
            <p className="project-location"><MapPin size={16} /> {project.location || 'Location Not Set'}</p>
          </div>
          <div className="status-badge" data-status={project.status?.toLowerCase().replace(' ', '-') || 'planning'}>
            {project.status || 'Planning'}
          </div>
        </div>
      </header>

      <div className="project-grid">
        <div className="project-main-column">
          <section className="glass-panel project-card">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)' }}>
              <Bot size={24} /> AI Project Insights
            </h2>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)', fontFamily: 'monospace', lineHeight: '1.6' }}>
              <span className="typewriter-text">{getAIInsight()}</span>
            </div>
          </section>

          <section className="glass-panel project-card">
            <h2>Overview</h2>
            <p className="project-desc">{project.description || 'No description provided.'}</p>
            
            <div className="progress-section">
              <div className="progress-header">
                <span>Overall Progress ({completedTasks}/{totalTasks} Tasks)</span>
                <span className="progress-percent">{progress}%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </section>

          <section className="glass-panel project-card">
            <h2>Tasks Checklist</h2>
            
            <form onSubmit={handleAddTask} className="add-task-form">
              <input 
                type="text" 
                placeholder="Add a new task..." 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="task-input"
              />
              <Button type="submit" size="sm"><Plus size={16} /> Add</Button>
            </form>

            <div className="task-list">
              {project.tasks?.length === 0 && <p className="text-muted">No tasks added yet.</p>}
              {project.tasks?.map(task => (
                <div 
                  key={task._id} 
                  className={`task-item ${task.completed ? 'completed' : ''}`}
                  onClick={() => handleToggleTask(task._id, task.completed)}
                  style={{ cursor: 'pointer' }}
                >
                  {task.completed ? <CheckCircle2 size={24} className="icon-success" /> : <Circle size={24} className="text-muted" />}
                  <span className="task-title">{task.title}</span>
                </div>
              ))}
            </div>
          </section>
          
          <section className="glass-panel project-card">
            <h2>Expenses Log</h2>
            
            <form onSubmit={handleAddExpense} className="add-expense-form">
              <input 
                type="text" 
                placeholder="Expense description (e.g. Paint, Lumber)" 
                value={newExpenseDesc}
                onChange={(e) => setNewExpenseDesc(e.target.value)}
                className="task-input flex-2"
              />
              <input 
                type="number" 
                placeholder="Amount ($)" 
                value={newExpenseAmount}
                onChange={(e) => setNewExpenseAmount(e.target.value)}
                className="task-input flex-1"
                min="0"
                step="0.01"
              />
              <Button type="submit" size="sm"><Plus size={16} /> Add</Button>
            </form>

            <div className="expense-list">
              {project.expenses?.length === 0 && <p className="text-muted">No expenses recorded.</p>}
              {project.expenses?.map(exp => (
                <div key={exp._id} className="expense-item">
                  <div className="expense-info">
                    <span className="expense-desc">{exp.description}</span>
                    <span className="expense-date">{new Date(exp.date).toLocaleDateString()}</span>
                  </div>
                  <span className="expense-amt">${exp.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="project-side-column">
          <section className="glass-panel project-card stats-card">
            <h2>Financials</h2>
            <div className="stat-row">
              <div className="stat-icon-box bg-indigo"><DollarSign size={24} /></div>
              <div className="stat-details">
                <span className="stat-label">Total Budget</span>
                <span className="stat-value">${budget.toLocaleString()}</span>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-icon-box bg-rose"><DollarSign size={24} /></div>
              <div className="stat-details">
                <span className="stat-label">Amount Spent</span>
                <span className={`stat-value ${spent > budget ? 'text-danger' : ''}`}>
                  ${spent.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </span>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-icon-box bg-emerald"><DollarSign size={24} /></div>
              <div className="stat-details">
                <span className="stat-label">Remaining</span>
                <span className="stat-value">${(budget - spent).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
            </div>
          </section>

          <section className="glass-panel project-card stats-card">
            <h2>Timeline</h2>
            <div className="stat-row">
              <div className="stat-icon-box bg-emerald"><Calendar size={24} /></div>
              <div className="stat-details">
                <span className="stat-label">Created On</span>
                <span className="stat-value">{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {project.endDate && (
              <div className="stat-row">
                <div className="stat-icon-box bg-amber"><Clock size={24} /></div>
                <div className="stat-details">
                  <span className="stat-label">Estimated Completion</span>
                  <span className="stat-value">{new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </section>

          {leadContractor && (
            <section className="glass-panel project-card stats-card">
              <h2>Lead Contractor</h2>
              <div className="stat-row">
                <div className="stat-icon-box bg-blue"><HardHat size={24} /></div>
                <div className="stat-details">
                  <span className="stat-label">{leadContractor.name}</span>
                  <span className="stat-value">{leadContractor.service}</span>
                  <span className="stat-sub">⭐ {leadContractor.rating || 'N/A'} Rating</span>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
