import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

export default function ProjectPage(){
  const { id } = useParams();

  const [project, setProject] = useState(null);

  const [taskTitle, setTaskTitle] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/projects/${id}`);
      setProject(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD TASK
  const addTask = async (e) => {
    e.preventDefault();

    if (!taskTitle.trim()) {
      alert('Task title required');
      return;
    }

    try {
      const res = await API.post(`/projects/${id}/tasks`, { title: taskTitle });

      setProject(prev => ({
        ...prev,
        tasks: [...(prev.tasks || []), res.data]
      }));

      setTaskTitle('');
    } catch (err) {
      alert('Task add failed');
    }
  };

  // ✅ TOGGLE TASK
  const toggleTask = async (taskId, completed) => {
    try {
      await API.put(`/projects/${id}/tasks/${taskId}`, {
        completed: !completed
      });
      loadProject();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ ADD EXPENSE
  const addExpense = async (e) => {
    e.preventDefault();

    if (!expenseTitle.trim() || !expenseAmount) {
      alert('All expense fields required');
      return;
    }

    try {
      const res = await API.post(`/projects/${id}/expenses`, {
        title: expenseTitle,
        amount: +expenseAmount
      });

      setProject(prev => ({
        ...prev,
        expenses: [...(prev.expenses || []), res.data]
      }));

      setExpenseTitle('');
      setExpenseAmount('');
    } catch (err) {
      alert('Expense add failed');
    }
  };

  // 🔄 LOADING UI
  if (loading) return <div>Loading project...</div>;

  // ❌ ERROR UI
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <h3>💰 Budget Estimate: ₹{project.budgetEstimate || 0}</h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
        marginTop: 20
      }}>

        {/* ✅ TASKS */}
        <div className="card">
          <h3>📋 Tasks</h3>

          <ul>
            {(project.tasks || []).map(t => (
              <li key={t._id}>
                <span style={{
                  textDecoration: t.completed ? 'line-through' : 'none'
                }}>
                  {t.title}
                </span>

                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => toggleTask(t._id, t.completed)}
                >
                  {t.completed ? 'Undo' : 'Done'}
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={addTask} style={{ marginTop: 10 }}>
            <input
              className="input"
              value={taskTitle}
              onChange={e => setTaskTitle(e.target.value)}
              placeholder="New task"
            />
            <button className="btn">Add Task</button>
          </form>
        </div>

        {/* ✅ EXPENSES */}
        <div className="card">
          <h3>💸 Expenses</h3>

          <ul>
            {(project.expenses || []).map(ex => (
              <li key={ex._id}>
                {ex.title} - ₹{ex.amount}
              </li>
            ))}
          </ul>

          <form onSubmit={addExpense} style={{ marginTop: 10 }}>
            <input
              className="input"
              value={expenseTitle}
              onChange={e => setExpenseTitle(e.target.value)}
              placeholder="Expense title"
            />

            <input
              className="input"
              value={expenseAmount}
              onChange={e => setExpenseAmount(e.target.value)}
              placeholder="Amount"
              type="number"
            />

            <button className="btn">Add Expense</button>
          </form>
        </div>

      </div>
    </div>
  );
}