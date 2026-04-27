const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const Task = require('../models/Task');
const Expense = require('../models/Expense');

// create project
router.post('/', auth, async (req, res) => {
  try {
    const p = new Project({ ...req.body, owner: req.user.id });
    await p.save();
    res.status(201).json(p);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
});

// list projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
});

// get single project (populate tasks/expenses)
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('tasks')
      .populate('expenses');
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    if (project.owner.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
    res.json(project);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
});

// add task
router.post('/:id/tasks', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    if (project.owner.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });

    const task = new Task({ ...req.body, project: project._id });
    await task.save();
    project.tasks.push(task._id);
    await project.save();
    res.status(201).json(task);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
});

// update task (toggle completed)
router.put('/:id/tasks/:taskId', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    const project = await Project.findById(req.params.id);
    if (project.owner.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });

    task.completed = !!req.body.completed;
    await task.save();
    res.json(task);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
});

// add expense
router.post('/:id/expenses', auth, async (req, res) => {
  try {
    const { title, amount } = req.body;

    // 🔥 VALIDATION (IMPORTANT)
    if (!title || title.trim() === '') {
      return res.status(400).json({ msg: 'Expense title is required' });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ msg: 'Valid amount is required' });
    }

    const project = await Project.findById(req.params.id);

    // ❌ project not found
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // ❌ unauthorized
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    // ✅ create expense
    const expense = new Expense({
      title,
      amount,
      project: project._id
    });

    await expense.save();

    // ✅ link to project
    project.expenses.push(expense._id);
    await project.save();

    res.status(201).json(expense);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// 🔥 DELETE project (SECURE)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // ❌ not found
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // ❌ unauthorized user
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    // ✅ delete related data (IMPORTANT 🔥)
    await Task.deleteMany({ project: project._id });
    await Expense.deleteMany({ project: project._id });

    // ✅ delete project
    await project.deleteOne();

    res.json({ msg: 'Project deleted successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
